# DeepAging app

![logo](./images/logo.png)

> 성균관대학교 산학협력프로젝트 딥플랜트1 Mobile Application
> 개발기간: 2023.03 ~ 2023.12
>
> Built with Flutter.

## Table of Contents

- [Introduction](#Introduction)
- [Features](#Features)
- [Views](#Views)
- [Contributors](#Contributors)
- [Build Process](#Build-Process)

## Introduction

Register data such as photos and information of meat, view the entered meat information, modify the information of that meat, or add new data.

Available for only Android.

<img src="./images/app-main.png" width="400">

## Features

A few ot the things you can do with DeepAging:

- Register a meat with image and some info.
- View the list of the meat information you registerd.
- Modify the information on the meat.
- Add measured data from processed meats.

<img src="./images/features-1.png" height=400>

<img src="./images/features-2.png" height=400>

## Views

|                   Sign in                    |                   Sign up                    |                   Home                    |                   My page                    |
| :------------------------------------------: | :------------------------------------------: | :---------------------------------------: | :------------------------------------------: |
| <img src="./images/sign-in.png" width="200"> | <img src="./images/sign-up.png" width="200"> | <img src="./images/home.png" width="200"> | <img src="./images/my-page.png" width="200"> |

<table>
  <tr>
    <th colspan="4" style="text-align: center;">Meat registration</td>
  </tr>
  <tr>
    <td><img src="./images/meat-regi-1.png" width=200></td>
		<td><img src="./images/meat-regi-2.png" width=200></td>
    <td><img src="./images/meat-regi-3.png" width=200></td>
    <td><img src="./images/meat-regi-4.png" width=200></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="4" style="text-align: center;">Data management</td>
  </tr>
  <tr>
    <td><img src="./images/data-mng-1.png" width=200></td>
		<td><img src="./images/data-mng-2.png" width=200></td>
    <td><img src="./images/data-mng-3.png" width=200></td>
    <td><img src="./images/data-mng-4.png" width=200></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="4" style="text-align: center;">Data addition</td>
  </tr>
  <tr>
    <td><img src="./images/data-add-1.png" width=200></td>
		<td><img src="./images/data-add-2.png" width=200></td>
    <td><img src="./images/data-add-3.png" width=200></td>
    <td><img src="./images/data-add-4.png" width=200></td>
  </tr>
</table>

## Contributors

|                            전수현 (Jeon Suhyeon)                             |                            송의영 (Song Euiyeong)                            |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/69349488?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/85021840?v=4" width="200"> |
|              [GitHub: @junsu0573](https://github.com/junsu0573)              |               [GitHub: @hosicuro](https://github.com/hosicuro)               |
|                      성균관대학교 소프트웨어학과 2학년                       |                      성균관대학교 소프트웨어학과 2학년                       |

## Build Process

- Follow the [Flutter Install Guide](https://docs.flutter.dev/get-started/install) for getting started building a project with flutter SDK.
- Install [Android Studio](https://developer.android.com/studio?hl=ko) and Emulator yo want from Android Studio for rendering flutter project on the emulator.
- And set the environment variable if you want to use flutter globally.
- Clone or download the repo.
- Open your emulator from Android Studio.
- `flutter pub get` to get all flutter dependencies
- `flutter start` to start the flutter app

```
app
├─ README.md // 프로젝트 목적, 방법 설명
├─ images // README에 사용된 이미지
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
