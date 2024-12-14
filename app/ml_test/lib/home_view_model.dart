import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';
import 'package:onnxruntime/onnxruntime.dart';

class HomeViewModel with ChangeNotifier {
  BuildContext context;
  HomeViewModel({required this.context}) {
    _initialize();
  }

  XFile? file; // 이미지 파ㄹ

  Stopwatch stopwatch = Stopwatch(); // latency 측정을 위한 타이머
  int elapsedTime = 0;
  int modelLoadtime = 0;

  List<double> predictions = [0, 0, 0, 0, 0]; // 예측 결과

  late OrtSession session; // 모델 세션

  void _initialize() async {
    await loadModel();
  }

  /// 모델 로드 함수
  Future<void> loadModel() async {
    stopwatch.start();
    OrtEnv.instance.init();

    final sessionOptions = OrtSessionOptions();
    const assetFileName = 'assets/mobilenet.onnx';
    final rawAssetFile = await rootBundle.load(assetFileName);
    final bytes = rawAssetFile.buffer.asUint8List();
    session = OrtSession.fromBuffer(bytes, sessionOptions);

    stopwatch.stop();
    modelLoadtime = stopwatch.elapsed.inMilliseconds;
    debugPrint('Done loading model');

    stopwatch.reset();
    notifyListeners();
  }

  /// 갤러리에서 이미지 불러오기
  Future<void> pickImage() async {
    final img = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (img != null) file = img;
    notifyListeners();
  }

  // 함수: XFile 이미지 전처리
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

    // 이미지 리사이즈시 비율 맞추기 위한 계산
    int newWidth, newHeight;
    final double aspectRatio = decodedImage.width / decodedImage.height;

    if (decodedImage.width < decodedImage.height) {
      newWidth = resize;
      newHeight = (resize / aspectRatio).round();
    } else {
      newHeight = resize;
      newWidth = (resize * aspectRatio).round();
    }

    // 이미지 리사이즈
    final img.Image resizedImage =
        img.copyResize(decodedImage, width: newWidth, height: newHeight);

    // 중앙 픽셀 크롭
    int xOffset = (resizedImage.width - cropSize) ~/ 2;
    int yOffset = (resizedImage.height - cropSize) ~/ 2;
    img.Image croppedImage = img.copyCrop(
      resizedImage,
      x: xOffset,
      y: yOffset,
      width: cropSize,
      height: cropSize,
    );

    // Normalization
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

  // 모델 예측
  void classification() async {
    if (file != null) {
      stopwatch.start();

      // 이미지 전처리
      final inputData = await preprocessImage();

      // ONNX Runtime 입력 생성
      final shape = [1, 3, 224, 224];
      final inputOrt =
          OrtValueTensor.createTensorWithDataList(inputData, shape);

      final inputs = {'input': inputOrt};
      final runOptions = OrtRunOptions();

      // 모델 실행
      final outputs = await session.runAsync(runOptions, inputs);

      stopwatch.stop();
      elapsedTime = stopwatch.elapsed.inMilliseconds;

      stopwatch.reset();

      // 자원 해제
      inputOrt.release();
      runOptions.release();

      // 결과 처리
      if (outputs != null && outputs.isNotEmpty) {
        final outputTensor = outputs[0];
        final outputData = outputTensor?.value as List<List<double>>;

        predictions = outputData[0];
        notifyListeners();

        debugPrint('Done predicting');
      }

      outputs?.forEach((element) {
        element?.release();
      });

      // session.release();
    } else {
      debugPrint('Choose image first');
    }
  }

  /// 모델 해제
  void releaseModel() {
    session.release();
    debugPrint('Model released');
  }
}

// 이미지 전처리 pytorch

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
