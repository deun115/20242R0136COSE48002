# Deepaging 앱

![logo](https://github.com/user-attachments/assets/dd386089-3aa5-42de-852c-88f1e8b78039)

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [기능 소개](#기능-소개)
- [화면 구성](#화면-구성)
- [참여자](#참여자)
- [환경 설정](#환경-설정)
- [프로젝트 구성](#프로젝트-구성)

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

|                                           데이터 관리 (일반)                                            |                                               데이터 조회                                               |                                       데이터 관리 (연구자/관리자)                                       |                                        데이터 관리 (데이터 승인)                                        |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/0eb06c5f-a321-42f0-8526-05f2adced6f3" width="200"> | <img src="https://github.com/user-attachments/assets/0baf82fa-e0cd-4cdf-b8ea-8d72babfb36a" width="200"> | <img src="https://github.com/user-attachments/assets/ec749d0c-a043-4caa-a3c8-e77b1cb36001" width="200"> | <img src="https://github.com/user-attachments/assets/d56c7e9c-be34-4dbc-8b36-0423a12d4ff9" width="200"> |

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

## 프로젝트 구성

```
app
├─ README.md // 프로젝트 목적, 방법 설명
├─ bixolon_printer // 프린터 패키지
├─ ml_test // 앱에 ml 탑재가 가능한지 테스트 프로젝트
└─ structure // app 프로젝트
  ├─ android // 안드로이드 빌드 파일
  ├─ ios // ios 빌드 파일 (지금은 ios 빌드 불가)
  ├─ assets // 앱에서 사용된 asset을 모아둔 파일
  │  ├─ fonts // 폰트 (pretendard)
  │  └─ images // 아이콘 등 이미지 파일
  ├─ lib
  │  ├─ components // 앱의 컴포넌트 정의 (UI 구성 요소)
  │  │  ├─ cam_shutter.dart // 카메라 셔터 위젯
  │  │  ├─ camera_guide.dart // 카메라 가이드 선 위젯
  │  │  ├─ custom_app_bar.dart // appbar 커스텀 위젯
  │  │  ├─ custom_dialog.dart  // dialog 커스텀 위젯
  │  │  ├─ custom_divider.dart // 구분선 커스텀 위젯
  │  │  ├─ custom_drop_down.dart  // dropdown 커스텀 위젯 (육류 분류)
  │  │  ├─ custom_icon_button.dart  // icon이 포함된 button 위젯
  │  │  ├─ custom_pop_up.dart // popup_button 커스텀 위젯
  │  │  ├─ custom_scroll.dart // 스크롤 바 커스텀 위젯
  │  │  ├─ custom_table_bar.dart // 데이터 관리 페이지의 table_bar 구성
  │  │  ├─ custom_table_calendar.dart // 필터 기능의 날짜 설정을 담당
  │  │  ├─ custom_text_button.dart // 텍스트로 구성된 커스텀 버튼
  │  │  ├─ data_field.dart // 실험 데이터 입력 필드
  │  │  ├─ data_title.dart // 실험 데이터 입력 필드명
  │  │  ├─ date_container.dart // 선택된 날짜 조회 위젯 (필터)
  │  │  ├─ deep_aging_card.dart // // 딥에이징 데이터 카드 표현
  │  │  ├─ filter_box.dart // 필터 상자 위젯
  │  │  ├─ filter_row.dart // 필터 row 위젯
  │  │  ├─ get_qr.dart // QR 커스텀 위젯
  │  │  ├─ home_card.dart // 홈 화면 메뉴 위젯
  │  │  ├─ image_card.dart // 촬영한 이미지 표시 위젯
  │  │  ├─ inner_box.dart // 이력번호 입력 페이지의 table 구성
  │  │  ├─ list_card.dart // 데이터 관리 페이지의 목록 구성에 사용
  │  │  ├─ list_card_data_manage.dart // 데이터 관리 페이지의 목록 구성에 사용
  │  │  ├─ loading_screen.dart // 로딩 화면
  │  │  ├─ main_button.dart // 커스텀 버튼 (‘확인’ 버튼을 구성)
  │  │  ├─ main_input_field.dart // 커스텀 텍스트 필드 (유저 관리에 주로 사용)
  │  │  ├─ main_text_field.dart  // 커스텀 텍스트 필드 (데이터 입력에 주소 사용)
  │  │  ├─ part_eval.dart  // 관능평가 관리 커스텀 위젯
  │  │  ├─ round_button.dart // 커스텀 버튼 (이력 번호 페이지에서만 사용)
  │  │  └─ step_card.dart // 데이터 관리 페이지의 육류 정보를 구성
  │  ├─ config
  │  │  ├─ labels.dart // 레이블 값을 저장해둔 파일
  │  │  ├─ palette.dart  // 위젯의 색 값, 텍스트 폰트 정의
  │  │  ├─ usefuls.dart // 시간 및 날짜 변경 기능 정의
  │  │  └─ user_router.dart  // 페이지 경로 정의
  │  ├─ dataSource
  │  │  ├─ local_data_source.dart  // 임시 저장 관리 api 기능 정의
  │  │  └─ remote_data_source.dart  // 서버 데이터 관리 api 기능 정의
  │  ├─ model
  │  │  ├─ meat_model.dart // 육류에 대한 정보를 담는 모델
  │  │  └─ user_model.dart // 유저에 대한 정보를 담는 모델
  │  ├─ screen // 앱의 페이지 정의
  │  │  ├─ data_management // 데이터 관리
  │  │  │  ├─ normal  // 일반 유저
  │  │  │  │  ├─ data_management_normal_screen.dart // 데이터 관리 페이지 (일반)
  │  │  │  │  ├─ edit_meat_data_screen.dart // 데이터 개별 페이지 (수정 가능)
  │  │  │  │  └─ not_editable // 데이터 개별 페이지 (수정 불가능)
  │  │  │  │     ├─ meat_image_not_editable_screen.dart // 육류 이미지 조회 페이지
  │  │  │  │     ├─ meat_info_not_editable_screen.dart // 육류 기본정보 조회 페이지
  │  │  │  │     └─ sensory_eval_not_editable_sceen.dart // 육류 관능평가 조회 페이지
  │  │  │  └─ researcher // 연구자
  │  │  │     ├─ add_deep_aging_data_screen.dart // 딥에이징 추가 페이지
  │  │  │     ├─ data_add_processed_meat_screen.dart // 처리육 관리 페이지
  │  │  │     ├─ data_add_raw_meat_screen.dart // 원육 관리 페이지
  │  │  │     ├─ data_add_screen.dart  // 데이터 개별 페이지
  │  │  │     ├─ data_management_add_additional_info_tab_screen.dart // 데이터 관리 페이지 (탭)
  │  │  │     ├─ data_management_approve_data_tab_screen.dart // 데이터 승인 페이지
  │  │  │     ├─ data_management_researcher_tab_screen.dart  // 데이터 관리 페이지 (연구자)
  │  │  │     ├─ insertion_heated_sensory_screen.dart // 가열육 관능평가 페이지
  │  │  │     ├─ insertion_heated_sensory_tenderness_screen.dart // 가열육 연도 추가 입력 페이지
  │  │  │     ├─ insertion_lab_data_screen.dart // 실험 데이터 입력 페이지
  │  │  │     ├─ insertion_tongue_data_screen.dart  // 맛 데이터 입력 페이지
  │  │  │     └─ printer_screen.dart // QR 프린트 페이지
  │  │  ├─ meat_registration  // 육류 등록
  │  │  │  ├─ camera_screen.dart // 카메라 페이지
  │  │  │  ├─ creation_management_num_screen.dart // 육류 등록 성공 페이지
  │  │  │  ├─ creation_management_num_loading_screen.dart // 육류 등록 로딩 페이지
  │  │  │  ├─ creation_management_num_fail_screen.dart // 육류 등록 실패 페이지
  │  │  │  ├─ insertion_meat_image_screen.dart  // 육류 이미지 등록 페이지
  │  │  │  ├─ insertion_meat_info_screen.dart  // 육류 분류 페이지
  │  │  │  ├─ insertion_sensory_eval_screen.dart // 관능평가 페이지
  │  │  │  ├─ insertion_trace_num_screen.dart //  // 이력 번호 입력 페이지
  │  │  │  └─ meat_registration_screen.dart // 육류 등록 페이지
  │  │  ├─ my_page // 마이페이지
  │  │  │  ├─ change_password_screen.dart // 비밀번호 변경 페이지
  │  │  │  ├─ delete_user_screen.dart // 회원 탈퇴 페이지
  │  │  │  ├─ my_page_screen.dart // 마이 페이지
  │  │  │  └─ user_detail_screen.dart  // 유저 상세 정보 페이지
  │  │  ├─ sign_in // 로그인
  │  │  │  ├─ complete_reset_screen.dart // 비밀번호 찾기 완료 페이지
  │  │  │  ├─ password_reset_screen.dart // 비밀번호 찾기 페이지
  │  │  │  └─ sign_in_screen.dart // 로그인 페이지
  │  │  ├─ sign_up // 회원가입
  │  │  │  ├─ complete_sign_up_screen.dart  // 회원가입 완료 페이지
  │  │  │  ├─ insertion_user_detail_screen.dart // 유저 상세정보 등록 페이지
  │  │  │  └─ insertion_user_info_screen.dart // 유저 정보 등록 페이지
  │  │  └─ home_screen.dart // 앱의 메인 화면
  │  ├─ viewModel  // 앱의 기능 정의
  │  │  ├─ data_management // 데이터 관리
  │  │  │  ├─ normal  // 일반 유저
  │  │  │  │  ├─ data_management_normal_view_model.dart // 데이터 관리 (일반)
  │  │  │  │  ├─ edit_meat_data_view_model.dart // 데이터 수정
  │  │  │  │  └─ not_editable // 조회 페이지
  │  │  │  │     ├─ insertion_meat_image_not_editable_view_model.dart // 육류 이미지 조회 기능 정의
  │  │  │  │     ├─ insertion_meat_info_not_editable_view_model.dart // 육류 기본정보 조회 기능 정의
  │  │  │  │     ├─ insertion_trace_num_not_editable_view_model.dart // 육류 이력정보 조회 기능 정의
  │  │  │  │     └─ sensory_eval_not_editable_view_model.dart // 육류 관능평가 조회 기능 정의
  │  │  │  └─ researcher  // 연구자
  │  │  │     ├─ add_deep_aging_data_view_model.dart // 딥에이징 관련 기능 정의
  │  │  │     ├─ data_add_processed_meat_view_model.dart  // 처리육 관리 기능 정의
  │  │  │     ├─ data_add_raw_meat_view_model.dart  // 원육 관리 기능 정의
  │  │  │     ├─ data_add_view_model.dart // 데이터 등록 기능 정의
  │  │  │     ├─ data_management_add_additional_info_tab_view_model.dart // 추가 정보 입력 기능 정의
  │  │  │     ├─ data_management_approve_data_tab_view_model.dart // 데이터 승인 기능 정의
  │  │  │     ├─ data_management_researcher_tab_view_model.dart // 데이터 관리 (연구자)
  │  │  │     ├─ insertion_heated_sensory_tenderness_view_model.dart // 가열육 연도 추가 입력 기능 정의
  │  │  │     ├─ insertion_heated_sensory_view_model.dart // 가열육 관능평가 기능 정의
  │  │  │     ├─ insertion_lab_data_view_model.dart // 실험 데이터 입력 기능 정의
  │  │  │     ├─ insertion_tongue_data_view_model.dart // 맛 데이터 입력 기능 정의
  │  │  │     └─ printer_view_model.dart // 프린터 기능 정의
  │  │  ├─ meat_registration  // 육류 등록
  │  │  │  ├─ camera_view_model.dart // 카메라 기능 정의
  │  │  │  ├─ creation_management_num_view_model.dart.dart // 관리번호 생성 기능 정의
  │  │  │  ├─ insertion_meat_image_view_model.dart  // 육류 이미지 관련 기능 정의
  │  │  │  ├─ insertion_meat_info_view_model.dart // 육류 분류 기능 및 변수 정의
  │  │  │  ├─ insertion_sensory_eval_view_model.dart // 관능평가 기능 정의
  │  │  │  ├─ insertion_trace_num_view_model.dart // 이력 번호 api 기능 정의
  │  │  │  └─ meat_registration_view_model.dart  // 육류 등록 관련 기능 정의
  │  │  ├─ my_page  // 마이페이지
  │  │  │  ├─ change_password_view_model.dart // 비밀번호 변경 기능 정의
  │  │  │  ├─ delete_user_view_model.dart // 회원 탈퇴 기능 정의
  │  │  │  ├─ my_page_view_model.dart // 사용자 정보 조회 기능 정의
  │  │  │  └─ user_detail_view_model.dart // 사용자 상세 정보 조회 기능 정의
  │  │  ├─ sign_in // 로그인
  │  │  │  ├─ password_reset_view_model.dart // 비밀번호 변경 기능 정의
  │  │  │  └─ sign_in_view_model.dart // 로그인 기능 정의
  │  │  ├─ sign_up // 회원가입
  │  │  │  ├─ insertion_user_detail_view_model.dart // 상세정보 입력 기능 정의
  │  │  │  └─ insertion_user_info_view_model.dart // 사용자 정보 입력 기능 정의
  │  │  └─ home_view_model.dart // 앱의 메인 화면
  │  ├─ firebase_options.dart  // firebase의 구성 옵션, api 키 등이 포함
  │  └─ main.dart // 앱의 진입점 (앱이 초기화 되고 시작됨)
  ├─ .env // 서버 url 등 환경 변수 파일
  ├─ .firebaserc // firebase 프로젝트 ID를 포함하는 구성 파일
  ├─ .flutter-plugins
  ├─ .flutter-plugins-dependencies
  ├─ .metadata
  ├─ analysis_options.yaml
  ├─ devtools_options.yaml
  ├─ firebase.json // firebase 프로젝트 설정 값을 포함하는 구성 파일
  ├─ pubspec.lock  // 프로젝트에 사용되는 패키지의 버전을 고정 (일관성 유지)
  ├─ pubspec.yaml // 프로젝트의 이름, 버전, 종속성, assets을 정의
  └─ storage.rules  // firebase cloud storage의 보안 규칙을 정의하는 구성 파일
```
