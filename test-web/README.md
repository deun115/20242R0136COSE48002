# DeepPlant Web Admin Page

![logo](https://github.com/user-attachments/assets/dd386089-3aa5-42de-852c-88f1e8b78039)
## 프로젝트 소개
육류 및 유저 데이터의 조회/입력/수정/통계/예측 등 관리 및 조회가 가능한 어드민 페이지입니다.

> 접속 주소 : http://deeplant-web.s3-website.ap-northeast-2.amazonaws.com


## 주요 기능

### 홈
- 각 주요 기능 접근
 
### 프로필
- 프로필 정보 수정 및 회원 탈퇴

### 대시보드
- 목록 - 육류데이터 조회, 삭제, 엑셀 export
- 통계 - 육류데이터의 원육 및 숙성육 비율, 부위 별 데이터 수, 지역 별 데이터 수에 대한 현황 조회
- 반려 - 반려 상태 육류데이터 조회, 삭제

### 데이터 예측
- 예측할 육류데이터 조회 가능
- 개별적인 육류 데이터의 상세한 정보 조회 가능, 데이터 및 등급 예측 가능, 예측에 사용된 정보를 시각화 한 XAI 이미지 제공

### 상세조회
- 개별적인 육류 데이터가 대기 및 반려 상태인 경우, 원육 데이터 조회/수정 및 승인/반려.
- 개별적인 육류 데이터가 승인 상태인 경우, 해당 육류 데이터에 대해 상세한 정보 조회/수정 및 회차 추가/삭제.
- 육류 데이터의 단면 이미지 및 지방, 단백질 비율 색상 팔레트 확인.

### 통계 분석
- 소/돼지, 원육/처리육/가열육, 등급 별 박스 플롯, 빈도수 분포, 상관관계 및 부위, 회차별 시계열 통계 차트를 날짜 별로 조회

### 사용자 관리
- 사용자 검색, 신규 회원 등록, 권한 변경, 사용자 삭제 기능

---

## 화면 구성

| **로그인 페이지**  |  **홈페이지**   |
| :-------------------------------------------: | :------------: |
| <img width="400" src="https://github.com/user-attachments/assets/26c56112-ac96-4a0a-b987-6fa261451d21"/> |  <img width="400" src="https://github.com/user-attachments/assets/f84e5ab6-a5e2-4eb5-b3aa-639b953ef7e5"/>>| 
| **대시보드 목록 페이지**   |  **대시보드 현황 페이지**   |  
| <img width="400" src="https://github.com/user-attachments/assets/dadb6135-4b28-439a-b02b-40d2fd401bd9"/>   |  <img width="400" src="https://github.com/user-attachments/assets/d5cada9f-87f8-4141-8dc2-5057555eb746"/>     |
| **육류 승인/반려 페이지**   |  **육류 조회/수정 페이지**   |  
| <img width="400" src="https://github.com/user-attachments/assets/dcad8e22-956c-4356-a1af-ae4cb87d9052"/>   |  <img width="400" src="https://github.com/user-attachments/assets/a2718ba7-d70f-4019-bf3f-230d8e4b99c9"/>     |
| **육류 예측 목록 페이지**   |  **육류 예측 상세 페이지**   |  
| <img width="400" src="https://github.com/user-attachments/assets/9653a499-a226-4d78-b701-39f5742a9049"/>   |  <img width="400" src="https://github.com/user-attachments/assets/bc595ed0-b05c-45fc-83c5-1b45b0450ab2"/>     |
| **통계 페이지 (상관관계)**    |   **통계 페이지 (시계열)**   |
| <img width="400" src="https://github.com/user-attachments/assets/e37f259f-6d1e-43e3-8788-f9654cd7f881"/>   |  <img width="400" src="https://github.com/user-attachments/assets/7b3df4b9-49d6-4179-b6c8-c0b020cb44e6"/>     |
| **프로필 페이지**    |   **유저 관리 페이지**   |
| <img width="400" src="https://github.com/user-attachments/assets/5d765a6f-c5b9-46ec-8fa1-eaa79eac8df9"/>   |  <img width="400" src="https://github.com/user-attachments/assets/e494680c-c912-44b3-91da-eb86f35f210c"/>     |

## 웹개발팀

|                             최순혁 (Choi Sunhyuk)                              |                            최승민 (Choi Seungmin)                             |                             김태우 (Kim Taewoo)                              |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/recon48" width="200"> | <img src="https://avatars.githubusercontent.com/sdouf5054" width="200"> | <img src="https://avatars.githubusercontent.com/skitw427" width="200"> |
|               [GitHub: @recon48](https://github.com/recon48)                |              [GitHub: @sdouf5054](https://github.com/sdouf5054)              |                [GitHub: @skitw427](https://github.com/skitw427)                 |
|                         고려대학교 컴퓨터학과 3학년                         |                        고려대학교 데이터과학과 3학년                         |                          고려대학교 컴퓨터학과 2학년                          |

## 환경 설정 ???

... 시작 가이드 등

## 프로젝트 구성

```
test-web
│  .env
│  .gitignore
│  .prettierrc // vscode extenstion prettier 설정
│  jsconfig.json  
│  package-lock.json 
│  package.json // 필요한 패키지(의존성) 목록, 스크립트 명령어, 메타정보 등
│  server.js 
├─images // 기업 로고 및 예시 이미지 
├─public // react 퍼블릭 폴더, 컴파일되지 않음
└─src // react src 폴더, 컴파일 되는 웹 코드
  │  App.jsx // 웹 애플리케이션 루트 컴포넌트 
  │  App.module.css //App.jsx CSS 모듈
  │  config.js // timezone, apiIP 정의
  │  firebase-config.js // firebase 설정
  │  index.js
  ├─components
  │  ├─DataDetailPage // 육류 상세 페이지 feature
  │  │  │  DetailDataController.js
  │  │  ├─api
  │  │  │  │  isPost.js
  │  │  │  │  updateDataStatus.js
  │  │  │  │  uploadNewImgToFirebase.js
  │  │  │  ├─add
  │  │  │  │      addDeepAging.js
  │  │  │  │      addHeatedData.js
  │  │  │  │      addProbexptData.js
  │  │  │  │      addSensoryProcessedData.js
  │  │  │  │      addSensoryRawData.js
  │  │  │  │      addSensoryRawImg.js
  │  │  │  ├─delete
  │  │  │  │      deleteDeepAging.js
  │  │  │  ├─get
  │  │  │  │      getDetailMeatDataSWR.js
  │  │  │  │      getOpencvImageDataSWR.js
  │  │  │  │      getPredictedData.js
  │  │  │  └─predict
  │  │  │          predictOpencvImageData.js
  │  │  │          predictOpencvTrainingData.js
  │  │  │          predictSensoryData.js
  │  │  ├─constants
  │  │  │      infofield.js
  │  │  ├─DetailDataController
  │  │  │  │  DataConfirmView.js
  │  │  │  │  DataPAView.js
  │  │  │  │  dataProcessing.js
  │  │  │  │  DataView.js
  │  │  │  ├─DataViewComps
  │  │  │  │  │  RestrictedModal.js
  │  │  │  │  ├─CardComps
  │  │  │  │  │  │  MeatImgsCard.js
  │  │  │  │  │  │  MeatImgsCardStatic.js
  │  │  │  │  │  │  QRInfoCard.js
  │  │  │  │  │  └─MeatImgsCard
  │  │  │  │  │      │  handleImgChange.js
  │  │  │  │  │      │  OpencvImgMaker.js
  │  │  │  │  │      └─OpencvImgMaker
  │  │  │  │  │              ColorPaletteMaker.js
  │  │  │  │  ├─DataConfirmView
  │  │  │  │  │      AcceptModal.js
  │  │  │  │  │      RejectModal.js
  │  │  │  │  │      StateChangedModal.js
  │  │  │  │  ├─DataPAView
  │  │  │  │  │      imgRot.css
  │  │  │  │  ├─DataView
  │  │  │  │  │      AgingInfoDelete.js
  │  │  │  │  │      AgingInfoRegister.js
  │  │  │  │  │      DeepInfoCompleteModal.js
  │  │  │  │  └─TablesComps
  │  │  │  │          ApiTable.js
  │  │  │  │          HeatTable.js
  │  │  │  │          HeatTableStatic.js
  │  │  │  │          LabTable.js
  │  │  │  │          LabTableStatic.js
  │  │  │  │          PredictedProcessedTablePA.js
  │  │  │  │          PredictedRawTable.js
  │  │  │  │          ProcessedTable.js
  │  │  │  │          ProcessedTableStatic.js
  │  │  │  │          RawTable.js
  │  │  │  └─shared
  │  │  │          computeTime.js
  │  │  │          InputTransitionsModal.js
  │  │  ├─routes
  │  │  │      DataConfirm.js
  │  │  │      DataEdit.js
  │  │  │      DataPredict.js
  │  │  └─style // UI style
  │  │          acceptmodalstyle.js
  │  │          datadetailroutestyle.js
  │  │          dataviewstyle.js
  │  │          inputtransitionsmodalstyle.js
  │  │          meatimgscardstaticstyle.js
  │  │          meatimgscardstyle.js
  │  │          opencvimgmakerstyle.js
  │  ├─DataListView // 육류 목록 (대시보드, 현황, 예측 목록) feature
  │  │  │  Charts.js // 대시보드 현황 탭 컴포넌트, 세부 차트 구성
  │  │  │  DataListComp.js // 대시보드 육류 목록 구성 컴포넌트. 테이블, 필터, 검색, export 버튼, 페이지네이션 등 구성
  │  │  │  ExcelController.js // 엑셀 export 컴포넌트
  │  │  │  PADataListComp.js // 예측 육류 목록 구성 컴포넌트
  │  │  │  PASearchedDataListComp.js // 예측 육류 목록 검색 결과 컴포넌트
  │  │  │  RejectedDataListComp.js // 반려함 육류 목록 구성 컴포넌트
  │  │  │  SearchById.js // 육류 검색바 컴포넌트
  │  │  │  SearchedDataListComp.js // 대시보드 육류 목록 검색 결과 컴포넌트
  │  │  ├─api // 육류 목록 데이터 api
  │  │  │  ├─delete
  │  │  │  │      deleteMeat.js // 육류 (일련번호 기준 모든 데이터) 삭제
  │  │  │  ├─get
  │  │  │  │      getByPartialMeatId.js // 육류 일련번호 중 일부 이용 검색
  │  │  │  │      getDataListJSON.js // 육류 export 데이터 fetch
  │  │  │  │      getMeatListSWR.js // 대시보드 목록 표시 데이터 fetch
  │  │  │  │      getPredictedMeatListSWR.js // 예측 목록 페이지 표시 데이터 fetch
  │  │  │  │      getRejectedMeatListSWR.js // 반려함 표시 데이터 fetch
  │  │  │  └─statistic
  │  │  │          statsticChoroplethMapSWR.js // 지도 차트 데이터 fetch
  │  │  │          statsticPieChartSWR.js // 원형 차트 데이터 fetch
  │  │  │          statsticStackedBarSWR.js // 스택바 차트 데이터 fetch
  │  │  ├─Charts 
  │  │  │  ├─ChoroplethMap
  │  │  │  │  │  ChoroplethMap.js // 컴포넌트
  │  │  │  │  │  geojson_korea.json // 지도 정보
  │  │  │  │  │  Map.js // 지도 차트 컴포넌트, ChoroplethMap 단순 반환
  │  │  │  │  └─helper
  │  │  │  │          getColor.js // 소, 돼지 비율에 따라 색상 결정
  │  │  │  │          onEachFeature.js // 호버링 시 마리 수 등 표시 정보 정의
  │  │  │  │          processMapData.js // 지도 내 지명 정보 매핑 등 처리 함수 
  │  │  │  ├─PieChart
  │  │  │  │  │  formatNumber.js // 단위 포맷 지정 함수
  │  │  │  │  │  pieChart.js // 원형 차트 컴포넌트
  │  │  │  │  └─helper
  │  │  │  │          handleBtnClick.js // 버튼 클릭 함수
  │  │  │  │          processPieData.js // 원형 차트 데이터 처리 함수
  │  │  │  │          usePieChart.js // 차트 옵션 등 정의
  │  │  │  └─StackedBarChart
  │  │  │      │  StackedBarChart.js // 스택바 차트 컴포넌트
  │  │  │      └─helper
  │  │  │              processStackedBarData.js // 스택바 차트 데이터 처리 함수
  │  │  ├─constants
  │  │  │      headCells.js // 목록 attribute 정의
  │  │  ├─ExcelController
  │  │  │      excelExport.js // 엑셀 export 데이터 처리 함수
  │  │  │      ExcelImportAlertModal.js // 엑셀 업로드 성공 여부 모달 (사용x)
  │  │  ├─ListComp
  │  │  │  │  DataList.js // 데이터 테이블 컴포넌트, fetch 데이터로 테이블 구성
  │  │  │  │  Pagination.js // 페이지네이션 컴포넌트
  │  │  │  └─DataList
  │  │  │          DelWarningModal.js // 삭제 전 확인 모달
  │  │  │          OrderStatus.js // 승인, 반려 아이콘 컴포넌트
  │  │  │          OrderTableHead.js // 테이블 헤더 컴포넌트
  │  │  ├─routes
  │  │  │      Dashboard.js // 대시보드 목록 페이지
  │  │  │      PA.js // 예측 목록 페이지
  │  │  └─style
  │  │          dashboardstyle.js
  │  │          datalistcompstyle.js
  │  │          dataliststyle.js
  │  │          delwarningmodalstyle.js
  │  │          excelcontrollerstyle.js
  │  │          excelimportalertmodalstyle.js
  │  │          ordertableheadstyle.js
  │  │          padatalistcompstyle.js
  │  │          pasearcheddatastyle.js
  │  │          pastyle.js
  │  │          rejecteddatalistcompstyle.js
  │  │          searcheddatastyle.js
  │  ├─Home // 홈 화면 feature
  │  │  └─routes
  │  │          Home.js // 홈 화면 페이지
  │  ├─LogIn // 로그인 feature
  │  │  │  LogInField.js // 로그인 입력 컴포넌트
  │  │  ├─api
  │  │  │      userIsLogin.js // 로그인 정보 확인 컴포넌트
  │  │  └─routes
  │  │          LogIn.js // 로그인 페이지
  │  ├─Profile // 프로필 화면 feature
  │  │  │  PasswordCheckModal.js // 비밀번호 확인 모달
  │  │  │  ProfileEditForm.js // 정보 수정 폼 컴포넌트
  │  │  │  SelfDeleteConfirmationModal.js // 비밀번호 확인 후 삭제 재확인 모달
  │  │  └─routes
  │  │          Profile.js
  │  ├─Stats // 통계 화면 feature
  │  │  │  StatsTabs.js // 통계 탭 컴포넌트, 통계, 분포, 상관관계, 시계열 선택
  │  │  ├─api // 통계 정보 fetch api
  │  │  │      statisticProbexptFresh.js // 신선육(원육) 맛 데이터
  │  │  │      statisticProbexptProcessed.js // 처리육 맛 데이터
  │  │  │      statisticSensoryFresh.js // 신선육 관능 데이터
  │  │  │      statisticSensoryHeated.js // 가열육 관능 데이터
  │  │  │      statisticSensoryProcessed.js // 처리육 관능 데이터
  │  │  │      statisticTime.js // 시계열 데이터
  │  │  ├─routes
  │  │  │      Stats.js // 통계 화면 페이지, 날짜 필터
  │  │  └─StatsTabs // ApexCharts 사용
  │  │      ├─BoxPlot // 박스 플롯
  │  │      │      BoxPlotChart.js // 컴포넌트
  │  │      │      calculateBoxPlotStat.js // 계산 함수
  │  │      ├─constants
  │  │      │      axisLabels.js // 데이터 레이블 정의
  │  │      ├─Corr // 상관관계
  │  │      │      calculateCorrChartSeries.js // 차트 위치 계산
  │  │      │      calculateCorrelation.js // 상관관계 계산 함수
  │  │      │      CorrelationChart.js // 컴포넌트
  │  │      │      getCorrChartOption.js // 차트 옵션 정의
  │  │      ├─HeatMap // 분포
  │  │      │      calculateHeatMapChartSeries.js // 계산 함수
  │  │      │      getHeatMapChartOption.js // 차트 옵션 정의
  │  │      │      HeatMapChart.js // 컴포넌트
  │  │      └─Time // 시계열
  │  │              TasteTime.js // 컴포넌트
  │  ├─UserManagement // 사용자 관리 feature
  │  │  │  UserMangementField.js // 사용자 관리 컴포넌트, 세부 컴포넌트 조합
  │  │  ├─api
  │  │  │      userDuplicateCheck.js // 유저 아이디 중복 확인 api
  │  │  │      userList.js // 가입된 유저 리스트 fetch api
  │  │  │      userRegister.js // 유저 등록 api
  │  │  ├─routes
  │  │  │      UserManagement.js // 사용자 관리 페이지, 접근 유저 권한 확인
  │  │  └─UserMangementField // 유저리스트 표
  │  │      │  DeleteConfirmationModal.js // 유저 삭제 확인 모달
  │  │      │  handleUserDelete.js // 유저 삭제 핸들러 함수
  │  │      │  handleUserSearch.js // 유저 검색, 필터링 이벤트 핸들러 함수
  │  │      │  UserRegisterModal.js // 유저 등록 정보 입력 모달
  │  │      │  UserTable.js // 유저 테이블 컴포넌트
  │  │      ├─UserRegisterModal 
  │  │      │      handleUserRegisterSubmit.js // 유저 등록 함수
  │  │      │      RegisterCompletionModal.js // 회원 등록 완료 모달
  │  │      └─UserTable
  │  │              handleUserEdit.js // 유저 정보 수정 함수
  │  │              UserTypeEditCell.js // 유저 권한 변경 함수
  │  └─Widget // 화면 상단 앱바 및 좌측 사이드바 feature
  │      │  WidgetBars.js // 위젯바 컴포넌트, 사이드바 여닫힘, 스낵바, 페이지 이동 관리
  │      ├─constants
  │      │      pageListItems.js // 사이드바 클릭시 이동할 페이지 정보
  │      ├─style
  │      │      selectbtnstyle.js 
  │      └─WidgetBars
  │              AppBar.js // 화면 상단 앱바 컴포넌트
  │              Drawer.js // 화면 좌측 사이드 바 컴포넌트 
  ├─shared // 두 개 이상 feature에서 공유되는 코드
  │  ├─api // 공유 api
  │  │      fetcher.js // api data fetch 시 에러 처리
  │  │      userDelete.js // 유저 삭제 api
  │  │      userUpdate.js // 유저 정보 업데이트 api
  │  ├─components // 공유 컴포넌트
  │  │  │  CustomSnackbar.js // 화면 우측 상단 커스텀 스낵바 알림 컴포넌트
  │  │  └─Search // 검색위한 날짜 필터 컴포넌트
  │  │      │  SearchFilterBar.js // 필터 작동 구현 
  │  │      └─style
  │  │              searchfilterbarstyle.js 
  │  └─Utils // 공유 함수 등
  │          updateDates.js // 필터 등 사용되는 'total', 'year', 'quarter', 'month', 'week' 값을 Date 값으로 업데이트
  │          useLogout.js // 로그아웃 처리
  │          UserContext.js // react Context 기능으로 유저 Context 정의
  └─src_assets // 사용되는 이미지 (png 등)
```

