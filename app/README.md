# Deepaging 앱

![logo](https://github.com/user-attachments/assets/dd386089-3aa5-42de-852c-88f1e8b78039)

## 목차

- [프로젝트 소개](#프로젝트_소개)
- [기능 소개](#기능_소개)
- [화면 구성](#화면_구성)
- [참여자](#참여자)
- [환경 설정](#환경_설정)

## 프로젝트 소개

<img src="https://github.com/user-attachments/assets/02ee4b02-4b0f-400a-8091-41756434a96e" width="400">


육류 맛 예측 인공지능 위한 데이터 수집에 사용되는 어플리케이션입니다.  
육류 이력 번호 조회, 사진 촬영, 관능평가 및 실험 데이터 등록, 조회, 수정이 가능합니다.

안드로이드에서만 가능합니다.

## 기능 소개

### 육류 등록

육류 이력 번호 조회 : 축산물품질평가원에서 제공하는 육류의 이력번호를 조회하여 육류에 대한 기본적인 정보를 확인할 수 있습니다.  
육류 사진 촬영 : 육류를 일정한 위치에서 촬영할 수 있도록 가이드를 제공합니다.  
관능평가 데이터 입력 : 마블링, 육색, 조직감, 육즙, 기호도에 대한 데이터를 입력할 수 있습니다.  
위 데이터들을 모두 입력하면 데이터베이스에 등록이 가능합니다.

### 육류 데이터 조회

데이터베이스에 등록된 육류 데이터를 조회할 수 있습니다.  
기간, 축종, 승인 여부 등에 따라 필터가 적용된 데이터만 조회가 가능합니다.

### 육류 데이터 관리

일반 사용자가 등록한 육류에 대해서 관리자는 승인 또는 거절이 가능합니다.  
관리자가 데이터를 거절하면 사용자는 다시 데이터를 수정해서 제출할 수 있습니다.

관리자가 승인한 육류 데이터는 딥에이징 회차 관리 및 실험 데이터, 가열육 데이터를 입력할 수 있습니다.  
원육(신선육, 가열육)과 처리육(신선육, 가열육)에 대해서 데이터 추가 입력이 가능합니다.

육류에 대해 딥에이징 실험을 진행할 시 딥에이징 회차에 대한 정보를 추가할 수 있습니다.

### 기타 기능

육류 등록을 마치면 생성된 관리 번호에 대해 QR 코드를 생성 및 프린트 할 수 있습니다.  
프린터의 경우 모바일 기기의 시스템 설정에서 블루투스로 Bixolon SPP-L3000 프린터에 연결한 후 사용할 수 있습니다.
육류 데이터 조회 시 QR 코드 인식을 통해서 관리 번호를 바로 입력할 수 있습니다.

DS60 기기를 사용하는 경우 기기의 바코드 리더 기능을 사용해 이력 번호를 바로 조회할 수 있습니다.

## 화면 구성

|                                                 로그인                                                  |                                                회원가입                                                 |                                                   홈                                                    |                                               마이 페이지                                               |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/0721e5b8-4aad-4e03-a9f6-afdf3d685099" width="200"> | <img src="https://github.com/user-attachments/assets/32e73817-0019-457e-b475-a6b3fd64f0e0" width="200"> | <img src="https://github.com/user-attachments/assets/8f7d3694-4a76-42b4-9432-5b35c41adb8c" width="200"> | <img src="https://github.com/user-attachments/assets/477edc85-73a5-4aaa-8c46-99b97be00fcc" width="200"> |

<table>
  <tr>
    <th colspan="4" style="text-align: center;">육류 등록</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/761e300a-052f-4b29-aa60-d0d82b51940a" width=200></td>
		<td><img src="https://github.com/user-attachments/assets/f74e202a-f07b-470f-8ecd-41236e91005d" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/171a6e4c-6e3b-4700-af78-a5c4dd7ae1e4" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/d15809f3-4c43-4ad3-90c0-3e6d77208f9b" width=200></td>
  </tr>
</table>



|                                                 데이터 관리 (일반)                                                  |                                                 데이터 조회                                                  |                                                 데이터 관리 (연구자/관리자)                                                  |                                                데이터 관리 (데이터 승인)                                                 |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/0eb06c5f-a321-42f0-8526-05f2adced6f3" width="200"> | <img src="https://github.com/user-attachments/assets/0baf82fa-e0cd-4cdf-b8ea-8d72babfb36a" width="200"> | <img src="https://github.com/user-attachments/assets/ec749d0c-a043-4caa-a3c8-e77b1cb36001" width="200"> | <img src="https://github.com/user-attachments/assets/d56c7e9c-be34-4dbc-8b36-0423a12d4ff9" width="200">

<table>
  <tr>
    <th colspan="4" style="text-align: center;">데이터 입력</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6ab10035-c209-4dad-a84e-c29e6f50ee1f" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/310474cc-431e-45a7-98eb-9f57553a20c7" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/decc749d-3d09-4585-acc8-d7b6280614bf" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/337aff89-83cb-4322-afdf-2def9f87e419" width=200></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="4" style="text-align: center;">데이터 입력</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/bd3abef7-278a-4526-86ae-e1b81c712c62" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/37b8b46a-b62d-4980-9690-b54d1985ed7e" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/19640456-6e71-45bb-b898-db5664961618" width=200></td>
    <td><img src="https://github.com/user-attachments/assets/9024bbdb-d3e5-4cd5-abc6-cb86038547db" width=200></td>
  </tr>
</table>

## 참여자

|                             원하진 (Won Hajin)                              |                            최다영 (Choi Dayoung)                             |                             김태관 (Kim Taekwan)                              |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/8970523?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/80742780?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/147288887?v=4" width="200"> |
|               [GitHub: @wonhj12](https://github.com/wonhj12)                |              [GitHub: @dayoung20](https://github.com/dayoung20)              |                [GitHub: @TTKKWAN](https://github.com/TTKKWAN)                 |
|                         고려대학교 컴퓨터학과 3학년                         |                        고려대학교 데이터과학과 3학년                         |                          고려대학교 컴퓨터학과 2학년                          |

## 환경 설정

### 프로젝트 다운로드

1. [플러터 설치 가이드](https://docs.flutter.dev/get-started/install)를 참고해서 플러터를 설치해 주세요.
2. [Android Studio](https://developer.android.com/studio?hl=ko)를 통해 에뮬레이터를 실행하거나 실제 모바일 기기를 컴퓨터에 연결해서 실행이 가능합니다.
3. `git clone`을 통해 레포지토리를 클론하거나, 직접 프로젝트를 다운로드 받아주세요.

### 프로젝트 디버깅

1. Android Studio 또는 VS Code 등의 IDE를 통해 프로젝트를 열어주세요.
2. `/app/structure` 경로로 이동합니다.
3. `flutter pub get`을 통해 필요한 패키지를 설치합니다.
4. `.env`와 `google-services.json`을 올바른 위치에 추가해 주세요.
5. `flutter run`을 통해 디버깅을 시작합니다.

### 프로젝트 빌드

1. Android Studio 또는 VS Code 등의 IDE를 통해 프로젝트를 열어주세요.
2. `/app/structure` 경로로 이동합니다.
3. `flutter pub get`을 통해 필요한 패키지를 설치합니다.
4. `.env`와 `google-services.json`을 올바른 위치에 추가해 주세요.
5. `flutter build apk --release --target-platform=android-arm64`를 입력하면 빌드 파일이 생성됩니다.
