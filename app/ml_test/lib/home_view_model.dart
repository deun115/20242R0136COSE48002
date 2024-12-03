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
    const int resize = 256;
    const int cropSize = 224;
    const mean = [0.4834, 0.3656, 0.3474];
    const std = [0.2097, 0.2518, 0.2559];

    Uint8List imageData = await file!.readAsBytes();

    img.Image? decodedImage = img.decodeImage(imageData);
    if (decodedImage == null) {
      throw Exception("이미지를 디코딩할 수 없습니다.");
    }

    int newWidth, newHeight;
    final double aspectRatio = decodedImage.width / decodedImage.height;

    if (decodedImage.width < decodedImage.height) {
      newWidth = resize;
      newHeight = (resize / aspectRatio).round();
    } else {
      newHeight = resize;
      newWidth = (resize * aspectRatio).round();
    }

    final img.Image resizedImage =
        img.copyResize(decodedImage, width: newWidth, height: newHeight);

    int xOffset = (resizedImage.width - cropSize) ~/ 2;
    int yOffset = (resizedImage.height - cropSize) ~/ 2;
    img.Image croppedImage = img.copyCrop(
      resizedImage,
      x: xOffset,
      y: yOffset,
      width: cropSize,
      height: cropSize,
    );

    List<int> rawPixels = croppedImage.getBytes(order: img.ChannelOrder.rgb);
    Float32List tensor = Float32List(cropSize * cropSize * 3);

    for (int i = 0; i < rawPixels.length; i += 3) {
      int pixelIndex = i ~/ 3;
      tensor[pixelIndex * 3] = ((rawPixels[i] / 255.0) - mean[0]) / std[0]; // R
      tensor[pixelIndex * 3 + 1] =
          ((rawPixels[i + 1] / 255.0) - mean[1]) / std[1]; // G
      tensor[pixelIndex * 3 + 2] =
          ((rawPixels[i + 2] / 255.0) - mean[2]) / std[2]; // B
    }

    Float32List rearrangedTensor = Float32List(cropSize * cropSize * 3);
    int hw = cropSize * cropSize;

    for (int h = 0; h < cropSize; h++) {
      for (int w = 0; w < cropSize; w++) {
        int pixelIndex = h * cropSize + w;
        rearrangedTensor[0 * hw + pixelIndex] = tensor[pixelIndex * 3];
        rearrangedTensor[1 * hw + pixelIndex] = tensor[pixelIndex * 3 + 1];
        rearrangedTensor[2 * hw + pixelIndex] = tensor[pixelIndex * 3 + 2];
      }
    }

    return rearrangedTensor;
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

      // print(inputOrt.value);

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

      session.release();
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

// 7 10 7 4 7
// 8 6 6 5 8
// 9 8 6 4 9
// 8 6 7 4 8
// 3 6 7 4 3 

// [3.6071507930755615, 9.333674430847168, 6.774637699127197, 5.032243251800537, 4.494431495666504]
// [5.255207061767578, 8.121795654296875, 5.39682674407959, 4.193216800689697, 5.803882122039795]
// [7.154209613800049, 7.507527828216553, 5.111659049987793, 4.869064807891846, 6.844488143920898]
// [4.132011413574219, 9.010075569152832, 6.3419270515441895, 5.202378273010254, 4.89251184463501]
// [2.446580171585083, 7.696757793426514, 5.872425556182861, 4.514078617095947, 3.559058427810669]
