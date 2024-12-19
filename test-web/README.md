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
test-ewb
│  .env
│  .gitignore
│  .prettierrc
│  jsconfig.json
│  package-lock.json
│  package.json
│  server.js
│
├─images
│      로고 및 예시 이미지
├─node_modules
├─public
│   deeplant-logo.png
│   deeplant-text-logo.png
│   favicon.ico
│   index.html
│   manifest.json
│   robots.txt
└─src
  │  App.jsx
  │  App.module.css
  │  config.js
  │  firebase-config.js
  │  index.js
  │  setupTests.js
  │
  ├─components
  │  ├─DataDetailPage
  │  │  │  DetailDataController.js
  │  │  │
  │  │  ├─api
  │  │  │  │  isPost.js
  │  │  │  │  updateDataStatus.js
  │  │  │  │  uploadNewImgToFirebase.js
  │  │  │  │
  │  │  │  ├─add
  │  │  │  │      addDeepAging.js
  │  │  │  │      addHeatedData.js
  │  │  │  │      addProbexptData.js
  │  │  │  │      addSensoryProcessedData.js
  │  │  │  │      addSensoryRawData.js
  │  │  │  │      addSensoryRawImg.js
  │  │  │  │
  │  │  │  ├─delete
  │  │  │  │      deleteDeepAging.js
  │  │  │  │
  │  │  │  ├─get
  │  │  │  │      getDetailMeatDataSWR.js
  │  │  │  │      getOpencvImageDataSWR.js
  │  │  │  │      getPredictedData.js
  │  │  │  │
  │  │  │  └─predict
  │  │  │          predictOpencvImageData.js
  │  │  │          predictOpencvTrainingData.js
  │  │  │          predictSensoryData.js
  │  │  │
  │  │  ├─constants
  │  │  │      infofield.js
  │  │  │
  │  │  ├─DetailDataController
  │  │  │  │  DataConfirmView.js
  │  │  │  │  DataPAView.js
  │  │  │  │  dataProcessing.js
  │  │  │  │  DataView.js
  │  │  │  │
  │  │  │  ├─DataViewComps
  │  │  │  │  │  RestrictedModal.js
  │  │  │  │  │
  │  │  │  │  ├─CardComps
  │  │  │  │  │  │  MeatImgsCard.js
  │  │  │  │  │  │  MeatImgsCardStatic.js
  │  │  │  │  │  │  QRInfoCard.js
  │  │  │  │  │  │
  │  │  │  │  │  └─MeatImgsCard
  │  │  │  │  │      │  handleImgChange.js
  │  │  │  │  │      │  OpencvImgMaker.js
  │  │  │  │  │      │
  │  │  │  │  │      └─OpencvImgMaker
  │  │  │  │  │              ColorPaletteMaker.js
  │  │  │  │  │
  │  │  │  │  ├─DataConfirmView
  │  │  │  │  │      AcceptModal.js
  │  │  │  │  │      RejectModal.js
  │  │  │  │  │      StateChangedModal.js
  │  │  │  │  │
  │  │  │  │  ├─DataPAView
  │  │  │  │  │      imgRot.css
  │  │  │  │  │
  │  │  │  │  ├─DataView
  │  │  │  │  │      AgingInfoDelete.js
  │  │  │  │  │      AgingInfoRegister.js
  │  │  │  │  │      DeepInfoCompleteModal.js
  │  │  │  │  │
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
  │  │  │  │
  │  │  │  └─shared
  │  │  │          computeTime.js
  │  │  │          InputTransitionsModal.js
  │  │  │
  │  │  ├─routes
  │  │  │      DataConfirm.js
  │  │  │      DataEdit.js
  │  │  │      DataPredict.js
  │  │  │
  │  │  └─style
  │  │          acceptmodalstyle.js
  │  │          datadetailroutestyle.js
  │  │          dataviewstyle.js
  │  │          inputtransitionsmodalstyle.js
  │  │          meatimgscardstaticstyle.js
  │  │          meatimgscardstyle.js
  │  │          opencvimgmakerstyle.js
  │  │
  │  ├─DataListView
  │  │  │  Charts.js
  │  │  │  DataListComp.js
  │  │  │  ExcelController.js
  │  │  │  PADataListComp.js
  │  │  │  PASearchedDataListComp.js
  │  │  │  RejectedDataListComp.js
  │  │  │  SearchById.js
  │  │  │  SearchedDataListComp.js
  │  │  │
  │  │  ├─api
  │  │  │  ├─delete
  │  │  │  │      deleteMeat.js
  │  │  │  │
  │  │  │  ├─get
  │  │  │  │      getByPartialMeatId.js
  │  │  │  │      getDataListJSON.js
  │  │  │  │      getMeatListSWR.js
  │  │  │  │      getPredictedMeatListSWR.js
  │  │  │  │      getRejectedMeatListSWR.js
  │  │  │  │
  │  │  │  └─statistic
  │  │  │          statsticChoroplethMapSWR.js
  │  │  │          statsticPieChartSWR.js
  │  │  │          statsticStackedBarSWR.js
  │  │  │
  │  │  ├─Charts
  │  │  │  ├─ChoroplethMap
  │  │  │  │  │  ChoroplethMap.js
  │  │  │  │  │  geojson_korea.json
  │  │  │  │  │  Map.js
  │  │  │  │  │
  │  │  │  │  └─helper
  │  │  │  │          getColor.js
  │  │  │  │          onEachFeature.js
  │  │  │  │          processMapData.js
  │  │  │  │
  │  │  │  ├─PieChart
  │  │  │  │  │  formatNumber.js
  │  │  │  │  │  pieChart.js
  │  │  │  │  │
  │  │  │  │  └─helper
  │  │  │  │          handleBtnClick.js
  │  │  │  │          processPieData.js
  │  │  │  │          usePieChart.js
  │  │  │  │
  │  │  │  └─StackedBarChart
  │  │  │      │  StackedBarChart.js
  │  │  │      │
  │  │  │      └─helper
  │  │  │              processStackedBarData.js
  │  │  │
  │  │  ├─constants
  │  │  │      headCells.js
  │  │  │
  │  │  ├─ExcelController
  │  │  │      excelExport.js
  │  │  │      ExcelImportAlertModal.js
  │  │  │
  │  │  ├─ListComp
  │  │  │  │  DataList.js
  │  │  │  │  Pagination.js
  │  │  │  │
  │  │  │  └─DataList
  │  │  │          DelWarningModal.js
  │  │  │          OrderStatus.js
  │  │  │          OrderTableHead.js
  │  │  │
  │  │  ├─routes
  │  │  │      Dashboard.js
  │  │  │      PA.js
  │  │  │
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
  │  │
  │  ├─Home
  │  │  └─routes
  │  │          Home.js
  │  │
  │  ├─LogIn
  │  │  │  LogInField.js
  │  │  │  LogInField.test.js
  │  │  │
  │  │  ├─api
  │  │  │      userIsLogin.js
  │  │  │
  │  │  └─routes
  │  │          LogIn.js
  │  │
  │  ├─Profile
  │  │  │  PasswordCheckModal.js
  │  │  │  ProfileEditForm.js
  │  │  │  SelfDeleteConfirmationModal.js
  │  │  │
  │  │  └─routes
  │  │          Profile.js
  │  │
  │  ├─Stats
  │  │  │  StatsTabs.js
  │  │  │
  │  │  ├─api
  │  │  │      statisticProbexptFresh.js
  │  │  │      statisticProbexptProcessed.js
  │  │  │      statisticSensoryFresh.js
  │  │  │      statisticSensoryHeated.js
  │  │  │      statisticSensoryProcessed.js
  │  │  │      statisticTime.js
  │  │  │
  │  │  ├─routes
  │  │  │      Stats.js
  │  │  │
  │  │  └─StatsTabs
  │  │      ├─BoxPlot
  │  │      │      BoxPlotChart.js
  │  │      │      calculateBoxPlotStat.js
  │  │      │
  │  │      ├─constants
  │  │      │      axisLabels.js
  │  │      │
  │  │      ├─Corr
  │  │      │      calculateCorrChartSeries.js
  │  │      │      calculateCorrelation.js
  │  │      │      CorrelationChart.js
  │  │      │      getCorrChartOption.js
  │  │      │
  │  │      ├─HeatMap
  │  │      │      calculateHeatMapChartSeries.js
  │  │      │      getHeatMapChartOption.js
  │  │      │      HeatMapChart.js
  │  │      │
  │  │      └─Time
  │  │              TasteTime.js
  │  │
  │  ├─UserManagement
  │  │  │  UserMangementField.js
  │  │  │
  │  │  ├─api
  │  │  │      userDuplicateCheck.js
  │  │  │      userList.js
  │  │  │      userRegister.js
  │  │  │
  │  │  ├─routes
  │  │  │      UserManagement.js
  │  │  │
  │  │  └─UserMangementField
  │  │      │  DeleteConfirmationModal.js
  │  │      │  handleUserDelete.js
  │  │      │  handleUserSearch.js
  │  │      │  UserRegisterModal.js
  │  │      │  UserTable.js
  │  │      │
  │  │      ├─UserRegisterModal
  │  │      │      handleUserRegisterSubmit.js
  │  │      │      RegisterCompletionModal.js
  │  │      │
  │  │      └─UserTable
  │  │              handleUserEdit.js
  │  │              UserTypeEditCell.js
  │  │
  │  └─Widget
  │      │  WidgetBars.js
  │      │
  │      ├─constants
  │      │      pageListItems.js
  │      │
  │      ├─style
  │      │      selectbtnstyle.js
  │      │
  │      └─WidgetBars
  │              AppBar.js
  │              Drawer.js
  │
  ├─shared
  │  ├─api
  │  │      fetcher.js
  │  │      userDelete.js
  │  │      userUpdate.js
  │  │
  │  ├─components
  │  │  │  CustomSnackbar.js
  │  │  │
  │  │  └─Search
  │  │      │  SearchFilterBar.js
  │  │      │
  │  │      └─style
  │  │              searchfilterbarstyle.js
  │  │
  │  └─Utils
  │          updateDates.js
  │          useLogout.js
  │          UserContext.js
  │
  └─src_assets
          background.png
          data.png
          deeplant_big_logo.png
          deeplant_logo.png
          deeplant_long.webp
          deeplant_text_logo.png
          home1.png
          home2.png
          home3.png
          home4.png
          home5.png
          home6.png
          layer_1.png
          logo.png
          logout.svg
          opencvpreview.png
          profile.jpg
```

