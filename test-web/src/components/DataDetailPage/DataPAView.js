import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import QRInfoCard from './CardComps/QRInfoCard';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomSnackbar from '../../Utils/CustomSnackbar';

//mui
import './imgRot.css';
import { TextField, Autocomplete } from '@mui/material';
// import tables
import RawTable from './TablesComps/RawTable';
import PredictedRawTable from './TablesComps/PredictedRawTable';
import ProcessedTableStatic from './TablesComps/ProcessedTableStatic';
import PredictedProcessedTablePA from './TablesComps/PredictedProcessedTablePA';

import { computePeriod } from './computeTime';
import { apiIP } from '../../config';
import { useUser } from '../../Utils/UserContext';

import { predictSensoryData } from './api/predict/predictSensoryData';
import { predictOpencvTrainingData } from './api/predict/predictOpencvTrainingData';
// import { getPredictedData } from './api/get/getPredictedData';

const DataPAView = ({ dataProps }) => {
  //데이터 받아오기
  const {
    meatId, // 이력번호
    userId, // 로그인한 사용자 id
    createdAt, // 생성 시간
    qrImagePath, // QR이미지 경로
    raw_img_path, // 원육 이미지 경로
    raw_data, // 원육 데이터
    processed_data, // 처리육 데이터
    api_data, // 축산물 이력 API 데이터
    processed_data_seq, // 처리(딥에이징) 회차
    processed_minute, // 처리 시간 (분)
    processed_img_path, // 처리육 이미지 경로
  } = dataProps;

  // 처리육 및 실험 회차 토글
  useEffect(() => {
    options = processed_data_seq;
  }, []);
  const first = `${processed_data_seq[1]}`;

  // 처리육 토글
  const [processed_toggle, setProcessedToggle] = useState(first);
  const [processedToggleValue, setProcessedToggleValue] = useState(first);
  const [tab, setTab] = useState('0');
  const [nowSeqno, setNowSeqno] = useState(0);

  //이미지 파일
  const [previewImage, setPreviewImage] = useState(raw_img_path);
  const [dataXAIImg, setDataXAIImg] = useState(null);
  const [gradeXAIImg, setGradeXAIImg] = useState(null);
  const [imgPath, setImgPath] = useState(raw_img_path);

  // fetch 한 예측 데이터 저장
  const [dataPA, setDataPA] = useState(null);

  // 예측 데이터 fetch
  const getPredictedData = async (seqno) => {
    try {
      const response = await fetch(
        `http://${apiIP}/meat/get/predict-data?meatId=${meatId}&seqno=${seqno}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok', meatId, '-', seqno);
      }

      const json = await response.json();
      setDataPA(json);

      setDataXAIImg(json.xaiImagePath);
      setGradeXAIImg(json.xaiGradeImagePath);
      return json;
    } catch (error) {
      // 데이터를 불러오는 데 실패한 경우 모든 data를 null로 설정
      console.error('Error fetching data seqno ', seqno, ':', error);
      setDataXAIImg(null);
      setGradeXAIImg(null);
      setDataPA(null);
    }
  };

  //예측 post 중 로딩 표시
  const [isPredictedDone, SetIsPredictedDone] = useState(true);

  // 스낵바
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarShow = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // UserContext에서 유저 정보 불러오기
  const user = useUser();

  //데이터 예측 버튼 클릭 시
  const handlePredictClick = async (seqno) => {
    //로그인한 유저 정보
    const userId = user.userId;
    // period 계산
    const elapsedHour = computePeriod(api_data['butcheryYmd']);
    const len = processed_data_seq.length;
    try {
      // 로딩 화면 표시 시작
      SetIsPredictedDone(false);

      await predictOpencvTrainingData(meatId, seqno);
      await predictSensoryData(meatId, seqno);

      // 예측이 성공한 후 즉시 데이터를 가져오기
      const predictedData = await getPredictedData(seqno);

      // 예측된 데이터가 있는지 확인하고 상태 업데이트
      if (predictedData) {
        setDataPA(predictedData);
        handleSnackbarShow('데이터 예측에 성공하였습니다.', 'success');
      } else {
        handleSnackbarShow('데이터 예측에 실패하였습니다.', 'error');
      }

      // 로딩 화면 표시 종료(완료)
      SetIsPredictedDone(true);
    } catch (error) {
      console.error('Error during prediction:', error);
      handleSnackbarShow('오류로 인해 데이터 예측에 실패하였습니다.', 'error');
    } finally {
      // 로딩 화면 표시 종료
      SetIsPredictedDone(true);
    }
  };

  //탭 변환
  const handleSelect = async (key) => {
    setTab(key);
  };
  //원육&처리육 탭, 처리육 회차 변경에 맞추어 seqno, 이미지 변경
  useEffect(() => {
    const target = processedToggleValue; //n회
    const targetIndex = processed_data_seq.indexOf(target) - 1;
    if (tab === '0' || tab === 0) {
      setNowSeqno(parseInt(tab));
      setImgPath(raw_img_path);
      setPreviewImage(raw_img_path);
    } else {
      setNowSeqno(parseInt(processedToggleValue));
      setImgPath(
        processed_img_path[targetIndex] ? processed_img_path[targetIndex] : null
      );
      setPreviewImage(
        processed_img_path[targetIndex] ? processed_img_path[targetIndex] : null
      );
    }
  }, [processedToggleValue, tab]);

  // 회차 따라 예측 데이터 로드
  useEffect(() => {
    getPredictedData(nowSeqno);
  }, [nowSeqno]);

  return (
    <div style={{ width: '100%' }}>
      {!isPredictedDone && (
        <div style={divStyle.loadingBackground}>
          <Spinner />
          <span style={divStyle.loadingText}>
            맛 데이터 및 등급을 예측 중 입니다..
          </span>
        </div>
      )}
      <div style={style.editBtnWrapper}>
        {(dataPA && dataPA.seqno === nowSeqno) ||
        imgPath === 'null' ||
        imgPath === null ? (
          // 예측할 이미지가 없거나 이미 예측된 데이터가 존재하면, 버튼 비활성화 후 툴팁 표시
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              imgPath === 'null' || imgPath === null ? (
                <Tooltip id="no-image-tooltip">
                  예측할 이미지가 존재하지 않습니다
                </Tooltip>
              ) : (
                <Tooltip id="predicted-data-tooltip">
                  이미 예측된 데이터가 존재합니다!
                </Tooltip>
              )
            }
          >
            <span className="d-inline-block">
              <button
                type="button"
                className="btn btn-outline-success"
                disabled
                style={{ pointerEvents: 'none' }}
              >
                예측
              </button>
            </span>
          </OverlayTrigger>
        ) : (
          <button
            type="button"
            class="btn btn-outline-success"
            onClick={() => handlePredictClick(nowSeqno)}
          >
            예측
          </button>
        )}
      </div>
      <div style={style.singleDataWrapper}>
        {/* 1. 관리번호 육류에 대한 사진*/}
        <div>
          {/* 1.1. 원본이미지 */}
          <Card style={style.imgContainer}>
            <Card.Body>
              <Card.Text>
                <div style={style.imgTextWrapper}>원본이미지</div>
                <div style={style.imgWrapper}>
                  {imgPath !== 'null' && imgPath !== null ? (
                    <img
                      src={imgPath} //{previewImage + '?n=' + Math.random()}
                      style={style.imgWrapperContextImg}
                    />
                  ) : (
                    <div style={style.imgWrapperContextText}>
                      데이터 이미지가 존재하지 않습니다.
                    </div>
                  )}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          {/** 1.2. XAI 이미지 */}
          <Card style={style.xaiImgContainer}>
            <Card.Body>
              <Card.Text>
                <div style={style.imgTextWrapper}>
                  XAI이미지 [데이터/등급예측]
                </div>
                <div style={style.xaiImageWrapper}>
                  {dataXAIImg ? (
                    <div className="imgContainer">
                      <img
                        src={dataXAIImg}
                        style={style.imgWrapperContextImg}
                      />
                    </div>
                  ) : (
                    <div style={style.imgWrapperContextText}>
                      데이터 XAI 이미지가 존재하지 않습니다.
                    </div>
                  )}
                  <div style={{ width: '30px' }}></div>
                  {gradeXAIImg ? (
                    <div className="imgContainer">
                      <img
                        src={gradeXAIImg}
                        style={style.imgWrapperContextImg}
                      />
                    </div>
                  ) : (
                    <div style={style.imgWrapperContextText}>
                      등급 XAI 이미지가 존재하지 않습니다.
                    </div>
                  )}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        {/* 2. QR코드와 데이터에 대한 기본 정보*/}
        <QRInfoCard
          qrImagePath={qrImagePath}
          id={meatId}
          userId={userId}
          createdAt={createdAt}
          page="predict"
          divStyle={style.qrWrapper}
        />
        {/* 3. 세부 데이터 정보*/}
        <Card
          style={{
            width: '24vw',
            margin: '0px 10px',
            boxShadow: 24,
            minWidth: '360px',
          }}
        >
          <Tabs
            defaultActiveKey="0"
            id="uncontrolled-tab-example"
            className="mb-3"
            style={{ backgroundColor: 'white', width: '100%' }}
            onSelect={handleSelect}
          >
            <Tab eventKey="0" title="원육" style={{ backgroundColor: 'white' }}>
              <RawTable data={raw_data} />
              <PredictedRawTable raw_data={raw_data} dataPA={dataPA} />
            </Tab>
            <Tab
              eventKey="1"
              title="처리육"
              style={{ backgroundColor: 'white' }}
            >
              {processed_data && processed_data.length > 0 ? (
                <>
                  <Autocomplete
                    id={'controllable-states-processed'}
                    label="처리상태"
                    value={processed_toggle}
                    onChange={(event, newValue) => {
                      setProcessedToggle(newValue);
                      setProcessedToggleValue(newValue);
                    }}
                    inputValue={processedToggleValue}
                    onInputChange={(event, newInputValue) => {
                      setProcessedToggleValue(newInputValue);
                    }}
                    options={options.slice(1)}
                    size="small"
                    sx={{ width: 300, marginBottom: '10px' }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <ProcessedTableStatic
                    processedMinute={processed_minute}
                    processedToggleValue={processedToggleValue}
                    processed_data={processed_data}
                    processed_data_seq={processed_data_seq}
                  />
                  <PredictedProcessedTablePA
                    seqno={parseInt(processedToggleValue)}
                    processedToggleValue={processedToggleValue}
                    processed_data={processed_data}
                    processed_data_seq={processed_data_seq}
                    dataPA={dataPA}
                  />
                </>
              ) : (
                <div style={divStyle.errorContainer}>
                  <div style={divStyle.errorText}>처리육 데이터가 없습니다</div>
                </div>
              )}
            </Tab>
          </Tabs>
        </Card>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default DataPAView;

// 토글 버튼
let options = ['원육'];

const style = {
  singleDataWrapper: {
    height: 'fit-content',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  editBtnWrapper: {
    padding: '0px',
    margin: '0px',
    paddingRight: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    minWidth: '1140px',
  },
  dataFieldColumn: {
    backgroundColor: '#9e9e9e',
    height: '33px',
    borderRight: '1px solid rgb(174, 168, 168)',
    borderBottom: '1px solid #fafafa',
    padding: '4px 5px',
  },
  dataExpColumn: {
    backgroundColor: '#757575',
    height: '33px',
    borderRight: '1px solid rgb(174, 168, 168)',
    borderBottom: '1px solid #fafafa',
    padding: '4px 5px',
    color: 'white',
  },
  dataFieldContainer: {
    backgroundColor: '#eeeeee',
    height: '100%',
    borderRight: '1px solid rgb(174, 168, 168)',
    borderBottom: '1px solid #fafafa',
    padding: '4px 5px',
  },
  dataContainer: {
    height: '33px',
    borderBottom: '0.8px solid #e0e0e0',
    width: '',
    borderRight: '0.8px solid #e0e0e0',
    padding: '4px 5px',
    display: 'flex',
  },
  imgContainer: {
    width: '23vw',
    margin: '0px 10px',
    marginBottom: '20px',
    boxShadow: 24,
    minWidth: '360px',
  },
  imgTextWrapper: {
    color: '#002984',
    fontSize: '18px',
    fontWeight: '800',
  },
  imgWrapper: {
    width: '100%',
    padding: '10px 0px',
    borderRadius: '10px',
  },
  imgWrapperContextImg: {
    height: '190px',
    width: '100%',
    objectFit: 'contain',
  },
  imgWrapperContextText: {
    height: '190px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xaiImgContainer: {
    width: '23vw',
    margin: '0px 10px',
    boxShadow: 24,
    minWidth: '360px',
  },
  xaiImageWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0px',
  },
  qrWrapper: {
    width: '23vw',
    margin: '0px 10px',
    boxShadow: 24,
    minWidth: '360px',
  },
};
const divStyle = {
  loadingBackground: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    backgroundColor: '#ffffffb7',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: '25px',
    textAlign: 'center',
  },
  errorContainer: {
    height: '65vh',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  errorText: {
    fontSize: '16px',
    textAlign: 'center',
  },
};
