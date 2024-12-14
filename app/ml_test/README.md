# MobileNet 플러터 적용 실험

사용 모델 : MobileNet medium  
모델 내보내기 형식 : onnx

### 이미지 전처리 과정

모델 입력 전 이미지 전처리 과정을 거쳐야 합니다.  
파이썬에서 실행할때는 다음과 같은 전처리 과정을 거치게 됩니다.

```
val_transform = transforms.Compose([
    transforms.Resize(image_resize),
    transforms.CenterCrop(input_size),
    transforms.ToTensor(),
    transforms.Normalize(mean=mean, std=std),
])
```

PyTorch 기반 모델은 채널 우선 순서(C, H, W)를 사용하지만, 플러터의 이미지 데이터는 높이 우선 순서(H, W, C)로 계산이 됩니다.  
따라서 플러터에서는 조금 다른 전처리 과정을 거치게 됩니다.  
`HomeViewModel`의 `preprocessImage()` 함수가 이에 맞게 이미지 전처리하는 과정을 진행합니다.
