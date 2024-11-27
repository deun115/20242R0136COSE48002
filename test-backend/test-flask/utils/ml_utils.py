import torch
from torch import nn
import torch.nn.functional as F
from torchvision import transforms, models
from PIL import Image
import mlflow
import numpy as np
import cv2

import io
from io import BytesIO

from opencv_utils import *
from torchvision.transforms import Compose, Resize, CenterCrop, ToTensor, Normalize


def predict_regression_sensory_eval(s3_conn, s3_image_object, meat_id, seqno):    
    # 설정
    image_resize = 256  # 이미지 리사이즈 크기
    input_size = 224    # 입력 이미지 크기
    mean = [0.4834, 0.3656, 0.3474]  # 데이터셋의 mean
    std = [0.2097, 0.2518, 0.2559]   # 데이터셋의 std

    # 전처리 파이프라인 정의
    transform = transforms.Compose([
        transforms.Resize(image_resize),
        transforms.CenterCrop(input_size),
        transforms.ToTensor(),
        transforms.Normalize(mean=mean, std=std),
    ])
    model_name = "regression"
    model = load_model(model_name)
    
    device = torch.device("cpu")
    model = model.to(device)

    model.eval()

    # 이미지 불러오기 및 전처리
    try:
        s3_bucket = os.getenv("S3_BUCKET_NAME")
        s3 = boto3.client(
                service_name="s3",
                region_name=os.getenv("S3_REGION_NAME"),
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            )
        object_key = s3_image_object

        response = s3.get_object(Bucket=s3_bucket, Key=object_key)
        img = Image.open(io.BytesIO(response['Body'].read())).convert("RGB")
    except Exception as e:
        raise Exception({"msg": f"Fail to create Image Object From S3. {str(e)}"})
    
    image_tensor = transform(img).unsqueeze(0).to(device)  # 배치 차원 추가

    # 예측 수행
    with torch.no_grad():
        output = model(image_tensor)

    # 예측 결과 출력
    predict_result = {}
    predict_data = output.squeeze().tolist()
    
    predict_result["marbling"] = predict_data[0]
    predict_result["color"] = predict_data[0]
    predict_result["texture"] = predict_data[0]
    predict_result["surfaceMoisture"] = predict_data[0]
    predict_result["overall"] = predict_data[0]
    
    return predict_result


def predict_classification_grade(s3_conn, s3_image_object, meat_id, seqno):
    # 설정
    image_resize = 256  # 이미지 리사이즈 크기
    input_size = 224    # 입력 이미지 크기
    mean = [0.4694, 0.3536, 0.3339] # 데이터셋의 mean과 std 
    std = [0.2051, 0.2459, 0.2498]

    grade_to_label = {0: '1++', 1: '1+', 2: '1', 3: '2', 4: '3'}

    # 전처리 파이프라인 정의
    transform = transforms.Compose([
        transforms.Resize(image_resize),
        transforms.CenterCrop(input_size),
        transforms.ToTensor(),
        transforms.Normalize(mean=mean, std=std),
    ])

    model_name = "classification"
    model = load_model(model_name)
    
    device = torch.device("cpu")
    model = model.to(device)

    model.eval()

    # 이미지 불러오기 및 전처리
    try:
        s3_bucket = os.getenv("S3_BUCKET_NAME")
        s3 = boto3.client(
                service_name="s3",
                region_name=os.getenv("S3_REGION_NAME"),
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            )
        object_key = s3_image_object

        response = s3.get_object(Bucket=s3_bucket, Key=object_key)
        img = Image.open(io.BytesIO(response['Body'].read())).convert("RGB")
    except Exception as e:
        raise Exception({"msg": f"Fail to create Image Object From S3. {str(e)}"})
    
    image_tensor = transform(img).unsqueeze(0).to(device)  # 배치 차원 추가

    # 예측 수행
    with torch.no_grad():
        output = model(image_tensor)

    # 예측 결과 처리
    _, predicted_class = torch.max(output, 1)
    predicted_index = predicted_class.item()
    # predicted_grade = grade_to_label[predicted_index]
    grade_data = {}
    grade_data["xai_gradeNum"] = predicted_index
    
    return grade_data


# 어텐션 포워드 래퍼
def my_forward_wrapper(attn_obj):
    def my_forward(x):
        B, N, C = x.shape
        qkv = attn_obj.qkv(x).reshape(B, N, 3, attn_obj.num_heads, C // attn_obj.num_heads).permute(2, 0, 3, 1, 4)
        q, k, v = qkv.unbind(0)

        attn = (q @ k.transpose(-2, -1)) * attn_obj.scale
        attn = attn.softmax(dim=-1)
        attn = attn_obj.attn_drop(attn)
        attn_obj.attn = attn  # 어텐션 저장
        attn_obj.attn_map = attn
        attn_obj.cls_attn_map = attn[:, :, 0, 1:]

        x = (attn @ v).transpose(1, 2).reshape(B, N, C)
        x = attn_obj.proj(x)
        x = attn_obj.proj_drop(x)
        return x
    return my_forward


# 이미지 전처리 함수
def preprocess_image(image):
    mean=[0.4834, 0.3656, 0.3474] # 데이터셋의 mean과 std
    std=[0.2097, 0.2518, 0.2559]
    
    transform = Compose([
        Resize(256),
        CenterCrop(224),
        ToTensor(),
    ])
    return transform(image).unsqueeze(0)


# 어텐션 맵을 가져오는 함수
def get_all_attention_maps(model, device, image, xai_type):
    input_tensor = preprocess_image(image).to(device)
    attention_maps = []
    cls_weights = []
    
    def hook_fn(module, input, output):
        if isinstance(output, tuple):
            attn = output[1]
        else:
            attn = module.attn
        attention_maps.append(attn.mean(dim=1).squeeze(0))
        cls_weights.append(attn[:, :, 0, 1:].mean(dim=1).view(14, 14))  # CLS 가중치 평균 계산

    hooks = []
    # 모델에 어텐션 래퍼 적용
    if xai_type == "grade-xai":
        for block in model.blocks:
            block.attn.forward = my_forward_wrapper(block.attn)
        
        for block in model.blocks:
            hooks.append(block.attn.register_forward_hook(hook_fn))
    else:
        for block in model.base_model.blocks:
            block.attn.forward = my_forward_wrapper(block.attn)
        
        for block in model.base_model.blocks:
            hooks.append(block.attn.register_forward_hook(hook_fn))
        
    with torch.no_grad():
        output = model(input_tensor)
    
    for hook in hooks:
        hook.remove()
    
    return input_tensor, attention_maps, cls_weights


# 이미지 표시 함수
def show_img2(img1, img2, alpha=0.8, ax=None):
    if isinstance(img1, torch.Tensor):
        img1 = img1.squeeze().cpu().numpy()
    if isinstance(img2, torch.Tensor):
        img2 = img2.squeeze().cpu().numpy()
    if ax is None:
        fig, ax = plt.subplots(figsize=(10, 10))
    ax.imshow(img1)
    ax.imshow(img2, alpha=alpha, cmap='viridis')
    ax.axis('off')
    
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    
    # 결과를 ndarray로 변환
    fig.canvas.draw()  # Figure를 그립니다.
    img_array = np.frombuffer(fig.canvas.tostring_rgb(), dtype=np.uint8)  # RGB 데이터를 가져옵니다.
    img_array = img_array.reshape(fig.canvas.get_width_height()[::-1] + (3,))  # 배열의 형태를 맞춥니다.
    
    plt.close(fig)
    
    return img_array


# 모든 어텐션 레이어 시각화
def visualize_all_attention_layers(s3_conn, image, s3_bucket_name, meat_id, seqno, xai_type):
    # model 호출
    if xai_type == 'sensory-xai':
        model_name = "regression"
    else:
        model_name = "classification"

    model = load_model(model_name)
    device = torch.device("cpu")
    model = model.to(device)
    
    # attention map 생성
    input_tensor, attention_maps, cls_weights = get_all_attention_maps(model, device, image, xai_type)
    
    img_resized = F.interpolate(input_tensor, (224, 224), mode='bilinear').squeeze(0).permute(1, 2, 0)
    img_resized = np.clip(img_resized.cpu().numpy(), 0, 1)

    cls_weight = cls_weights[-1]
    cls_resized = F.interpolate(cls_weight.unsqueeze(0).unsqueeze(0), input_tensor.shape[2:], mode='bicubic').squeeze()
    cls_resized = cls_resized.cpu().numpy()
    cls_resized = (cls_resized - cls_resized.min()) / (cls_resized.max() - cls_resized.min())

    # 시각화
    plt.figure(figsize=(10, 10))
    img_array = show_img2(img_resized, cls_resized)

    xai_image = ndarray_to_image(s3_conn, img_array, f'xai_images/{xai_type}-{meat_id}-{seqno}.png')
    
    return xai_image


# xai 이미지 생성 함수
def create_xai_image(s3_conn, image, bucket_name, meat_id, seqno):
    xai_result = {}
    image = Image.open(io.BytesIO(image)).convert("RGB")
    
    # xai 관능 이미지 생성
    xai_object = visualize_all_attention_layers(s3_conn, image, bucket_name, meat_id, seqno, "sensory-xai")
    xai_result["xai_imagePath"] = xai_object
    
    # xai 등급 이미지 생성
    xai_grade_object = visualize_all_attention_layers(s3_conn, image, bucket_name, meat_id, seqno, "grade-xai")
    xai_result["xai_gradeNum_imagePath"] = xai_grade_object
    
    return xai_result