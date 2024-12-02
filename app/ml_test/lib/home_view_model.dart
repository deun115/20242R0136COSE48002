import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';
import 'package:onnxruntime/onnxruntime.dart';

class HomeViewModel with ChangeNotifier {
  BuildContext context;
  HomeViewModel({required this.context});

  XFile? file;

  Future<void> pickImage() async {
    final img = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (img != null) file = img;
    notifyListeners();
  }

  // 함수: XFile 이미지 처리
  Future<Float32List> preprocessImage() async {
    // 1. 이미지 로드
    final bytes = await File(file!.path).readAsBytes();
    var decodedImage = img.decodeImage(Uint8List.fromList(bytes));

    if (decodedImage == null) {
      throw Exception("이미지를 디코딩하지 못했습니다.");
    }

    // 2. 이미지 크기 조정 및 CenterCrop
    int newWidth, newHeight;
    final double aspectRatio = decodedImage.width / decodedImage.height;

    // 더 짧은 쪽을 targetSize로 맞추기
    if (decodedImage.width < decodedImage.height) {
      newWidth = 256;
      newHeight = (256 / aspectRatio).round();
    } else {
      newHeight = 256;
      newWidth = (256 * aspectRatio).round();
    }

    // 비율을 유지하며 리사이즈
    final img.Image resizedImage =
        img.copyResize(decodedImage, width: newWidth, height: newHeight);

    const cropSize = 224;
    final croppedImage = img.copyCrop(
      resizedImage,
      x: (resizedImage.width - cropSize) ~/ 2,
      y: (resizedImage.height - cropSize) ~/ 2,
      width: cropSize,
      height: cropSize,
    );

    // 3. Tensor 변환
    final mean = [0.4834, 0.3656, 0.3474];
    final std = [0.2097, 0.2518, 0.2559];

    // Float32List로 변환
    final tensor = Float32List(croppedImage.width * croppedImage.height * 3);

    for (int y = 0; y < croppedImage.height; y++) {
      for (int x = 0; x < croppedImage.width; x++) {
        final pixel = croppedImage.getPixelSafe(x, y);
        final r = pixel.r.toDouble();
        final g = pixel.g.toDouble();
        final b = pixel.b.toDouble();

        final index = (y * croppedImage.width + x) * 3;
        tensor[index] = ((r / 255.0) - mean[0]) / std[0];
        tensor[index + 1] = ((g / 255.0) - mean[1]) / std[1];
        tensor[index + 2] = ((b / 255.0) - mean[2]) / std[2];
      }
    }

    return tensor;
  }

  void classification() async {
    if (file != null) {
      // Initialize the ONNX runtime environment
      OrtEnv.instance.init();

      final sessionOptions = OrtSessionOptions();
      const assetFileName = 'assets/mobilenet.onnx';
      final rawAssetFile = await rootBundle.load(assetFileName);
      final bytes = rawAssetFile.buffer.asUint8List();
      final session = OrtSession.fromBuffer(bytes, sessionOptions);

      debugPrint('Done loading model');

      // 이미지 전처리
      final inputData = await preprocessImage();

      // // ONNX Runtime 입력 생성
      final shape = [1, 3, 224, 224];
      final inputOrt =
          OrtValueTensor.createTensorWithDataList(inputData, shape);

      print(inputOrt.value);

      final inputs = {'input': inputOrt};
      final runOptions = OrtRunOptions();

      // 모델 실행
      final outputs = await session.runAsync(runOptions, inputs);

      // 자원 해제
      inputOrt.release();
      runOptions.release();

      // 결과 처리
      if (outputs != null && outputs.isNotEmpty) {
        final outputTensor = outputs[0];
        final outputData = outputTensor?.value as List<List<double>>;

        debugPrint('Prediction Output:');
        for (int i = 0; i < outputData.length; i++) {
          debugPrint('Class $i: ${outputData[i]}');
        }
      }

      outputs?.forEach((element) {
        element?.release();
      });

      // ---------------------------------

      // if (file != null) {
      //   // Initialize the ONNX runtime environment
      //   OrtEnv.instance.init();

      //   final sessionOptions = OrtSessionOptions();
      //   const assetFileName = 'assets/mobilenet.onnx';
      //   // const assetFileName = 'assets/vit.onnx';
      //   final rawAssetFile = await rootBundle.load(assetFileName);
      //   final bytes = rawAssetFile.buffer.asUint8List();
      //   final session = OrtSession.fromBuffer(bytes, sessionOptions);

      //   debugPrint('Done loading model');

      //   // Load the image
      //   img.Image image = img.decodeImage(await File(file!.path).readAsBytes())!;

      //   // Step 1: Resize image
      //   int imageResize = 256;
      //   image = img.copyResize(image, width: imageResize, height: imageResize);

      //   // Step 2: CenterCrop
      //   int inputSize = 224;
      //   int xOffset = (image.width - inputSize) ~/ 2;
      //   int yOffset = (image.height - inputSize) ~/ 2;
      //   image = img.copyCrop(
      //     image,
      //     x: xOffset,
      //     y: yOffset,
      //     width: inputSize,
      //     height: inputSize,
      //   );

      //   // Step 3: Normalize and convert to tensor
      //   Float32List inputData = Float32List(3 * inputSize * inputSize);
      //   final mean = [0.4834, 0.3656, 0.3474];
      //   final std = [0.2097, 0.2518, 0.2559];

      //   int index = 0;
      //   for (int y = 0; y < inputSize; y++) {
      //     for (int x = 0; x < inputSize; x++) {
      //       final pixel = image.getPixel(x, y);
      //       final r = (pixel.r / 255.0 - mean[0]) / std[0];
      //       final g = (pixel.g / 255.0 - mean[1]) / std[1];
      //       final b = (pixel.b / 255.0 - mean[2]) / std[2];

      //       // final r = (((pixel.r - 128) / 128) / 255 - mean[0]) / std[0];
      //       // final g = (((pixel.g - 128) / 128) / 255 - mean[1]) / std[1];
      //       // final b = (((pixel.b - 128) / 128) / 255 - mean[2]) / std[2];

      //       inputData[index++] = r;
      //       inputData[index++] = g;
      //       inputData[index++] = b;
      //     }
      //   }

      //   // Normalize and prepare the input data for the model
      //   // for (int y = 0; y < 224; y++) {
      //   //   for (int x = 0; x < 224; x++) {
      //   //     final pixel = image.getPixel(x, y);
      //   //     final r = pixel.r;
      //   //     final g = pixel.g;
      //   //     final b = pixel.b;

      //   //     inputData[index++] = (r - 128) / 128;
      //   //     inputData[index++] = (g - 128) / 128;
      //   //     inputData[index++] = (b - 128) / 128;
      //   //   }
      //   // }

      //   // Define the shape for the input tensor (batch size of 1, with 224x224x3 channels)
      //   final shape = [1, 3, inputSize, inputSize];
      //   final inputOrt =
      //       OrtValueTensor.createTensorWithDataList(inputData, shape);

      //   final inputs = {'input': inputOrt};
      //   final runOptions = OrtRunOptions();
      //   final outputs = await session.runAsync(runOptions, inputs);

      //   // Release the resources
      //   inputOrt.release();
      //   runOptions.release();

      //   if (outputs != null && outputs.isNotEmpty) {
      //     // Assuming the output is a tensor with predictions
      //     final outputTensor = outputs[0];
      //     // print(outputTensor);

      //     // Get the raw data from the output tensor
      //     final outputData = outputTensor?.value as List<List<double>>;

      //     // Print the prediction values (example for a classification model)
      //     debugPrint('Prediction Output:');
      //     for (int i = 0; i < outputData.length; i++) {
      //       debugPrint('Class $i: ${outputData[i]}');
      //     }
      //   }

      //   outputs?.forEach((element) {
      //     element?.release();
      //   });
    } else {
      debugPrint('Choose image first');
    }
  }
}

// val_transform = transforms.Compose([
//     transforms.Resize(image_resize),
//     transforms.CenterCrop(input_size),
//     transforms.ToTensor(),
//     transforms.Normalize(mean=mean, std=std),
// ])

// image_resize = 256
// input_size = 224
// mean=[0.4834, 0.3656, 0.3474]
// std=[0.2097, 0.2518, 0.2559]

// [6.016770362854004, 7.406239032745361, 5.5851664543151855, 3.8689634799957275, 5.781614303588867]
// [4.766715049743652, 5.717421054840088, 4.6111884117126465, 3.131713628768921, 4.795190334320068]
// [6.701905250549316, 7.5202956199646, 6.109416961669922, 4.099411964416504, 6.291280269622803]
// [6.157087326049805, 7.138370513916016, 5.433093070983887, 3.8470969200134277, 5.873227596282959]
// [8.939645767211914, 10.141361236572266, 7.331591606140137, 6.040329933166504, 8.067405700683594]

// 7 10 7 4 7
// 8 6 6 5 8
// 9 8 6 4 9
// 8 6 7 4 8
// 3 6 7 4 3 

