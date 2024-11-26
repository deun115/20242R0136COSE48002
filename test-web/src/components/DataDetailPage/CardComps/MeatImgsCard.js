import { useState, useEffect, useRef } from 'react';
// react-bootstrap
import { Card, OverlayTrigger } from 'react-bootstrap';
// icons
import { FaArrowLeft, FaArrowRight, FaUpload } from 'react-icons/fa';
// mui
import { IconButton } from '@mui/material';
// UserContext
import { useUser } from '../../../Utils/UserContext';

import handleImgChange from './handleImgChange';
import style from '../style/meatimgscardstyle';
import { Tooltip } from '@mui/material';
import useOpencvImageData from '../api/get/getOpencvImageDataSWR';
import OpencvImgMaker from './OpencvImgMaker';

const navy = '#0F3659';

const MeatImgsCard = ({
  edited, //수정버튼 클릭 여부
  page, // 페이지 종류
  raw_img_path, // 원육 이미지 경로
  processed_img_path, // 처리육 이미지 경로
  setIsUploadingDone, // 이미지 업로드 처리 완료 setState 함수
  id, // 이력번호
  raw_data, // 원육 데이터
  setIsLimitedToChangeImage, // 이미지 수정 실패 여부 setState 함수
  butcheryYmd, // 도축 일자
  processedInput, // 처리육 데이터
  processed_data, // 처리육 데이터
  processedMinute, // 처리 시간 (분)
  processed_data_seq, // 회차 정보
  isPost,
}) => {
  // 1.이미지 배열 만들기
  // 이미지 배열 초기화
  const [imgArr, setImgArr] = useState([]);
  // 이미지 배열을 한 번만 설정하고, processed_img_path가 변경될 때만 업데이트
  useEffect(() => {
    // 원육 이미지는 항상 포함
    const newImgArr = [raw_img_path];

    // processed_img_path가 배열이고 비어있지 않은 경우에만 처리
    if (Array.isArray(processed_img_path) && processed_img_path.length > 0) {
      // 최대 4회차까지만 처리육 이미지 추가
      const processedImages = processed_img_path.slice(0, 4);
      newImgArr.push(...processedImages);
    }

    setImgArr(newImgArr);
  }, [raw_img_path, processed_img_path]); // 의존성 배열에 이미지 경로들 추가

  // 현재 이미지 인덱스 상태
  const [currentIdx, setCurrIdx] = useState(0);

  // 이미지 인덱스가 배열 범위를 벗어나지 않도록 보정
  useEffect(() => {
    if (currentIdx >= imgArr.length) {
      setCurrIdx(Math.max(0, imgArr.length - 1));
    }
  }, [imgArr.length, currentIdx]);
  // 육류 회차 정보 추출
  const meatSeq = processed_data_seq
    ? processed_data_seq.map((item) => {
        if (item === '원육') {
          return 0; // 원육은 0으로 변환
        } else {
          const numberMatch = item.match(/\d+/);
          return numberMatch ? parseInt(numberMatch[0], 10) : null; // 숫자 추출
        }
      })
    : [0]; // 회차 정보가 없는 경우 원육만 표시

  // 1) 이미지 페이지네이션 '>' 버튼 클릭
  const handleNextClick = () => {
    setCurrIdx((prev) => (prev + 1) % imgArr.length);
  };

  // 2) 이미지 페이지네이션 '<' 버튼 클릭
  const handlePrevClick = () => {
    setCurrIdx((prev) => (prev - 1) % imgArr.length);
  };

  // 3)이미지 페이지네이션 특정 숫자 클릭
  const handleNumClick = (e) => {
    setCurrIdx(e.target.outerText - 1);
  };

  // 2.이미지 파일 변경
  const fileRef = useRef(null);
  // 이미지 미리보기 or 이미지 변경 될 때 마다 firebase 업로드
  const [isImgChanged, setIsImgChanged] = useState(false);

  // UserContext에서 유저 정보 불러오기
  const user = useUser();

  // 이미지 수정시, 수정 API 호출까지 성공한 경우, 업로드 한 이미지로 미리보기 수정
  const updatePreviews = (reader) => {
    let newImages = imgArr;
    newImages[currentIdx] = reader.result;
    setImgArr(newImages);
  };
  // 툴팁 이미지 데이터
  const [tooltipImgData, setTooltipImgData] = useState(null);
  const { data, isLoading, isError } = useOpencvImageData(
    id,
    meatSeq[currentIdx]
  );
  // currentIdx가 변경될 때마다 tooltipImgData 초기화
  useEffect(() => {
    setTooltipImgData(null);
  }, [currentIdx]);

  const handleFileChange = (e) => {
    handleImgChange({
      newImgFile: e.target.files[0],
      currentIdx,
      imgArr,
      id,
      setIsUploadingDone,
      setIsLimitedToChangeImage,
      setIsImgChanged,
      updatePreviews,
      userId: user.userId,
      raw_data,
      processedInput,
      processed_data,
      processed_data_seq,
      processedMinute,
      butcheryYmd,
      isPost,
      data,
    });
  };

  const renderTooltipContent = () => {
    // 현재 이미지가 없는 경우 툴팁 표시하지 않음
    if (!imgArr[currentIdx] || imgArr[currentIdx] === 'null') {
      return null;
    }

    if (isLoading) {
      return <div style={style.overlayNotExistWrapper}>Loading...</div>;
    }

    if (isError || !tooltipImgData) {
      return (
        <div style={style.overlayNotExistWrapper}>
          단면, 컬러팔레트 이미지가 없습니다
        </div>
      );
    }

    const hasRequiredData =
      tooltipImgData.segmentImage &&
      tooltipImgData.fatColorPalette &&
      tooltipImgData.proteinColorPalette &&
      tooltipImgData.totalColorPalette;

    if (!hasRequiredData) {
      return (
        <div style={style.overlayNotExistWrapper}>
          올바르지 않은 데이터입니다
        </div>
      );
    }

    const hasInvalidColors = tooltipImgData.fatColorPalette.every(
      (color) => color[0] === 0 && color[1] === 0 && color[2] === 0
    );

    if (hasInvalidColors) {
      return (
        <div style={style.overlayNotExistWrapper}>
          올바르지 않은 데이터입니다
        </div>
      );
    }

    return <OpencvImgMaker data={tooltipImgData} />;
  };

  // 데이터 전처리
  useEffect(() => {
    if (data !== null && data !== undefined) {
      const updatedData = {
        ...data,
        // 캐싱 방지를 위해 segmentImage URL에 타임스탬프 추가
        segmentImage: data.segmentImage + '?time=' + new Date().getTime(),
      };
      setTooltipImgData(updatedData);
    }
  }, [data]);

  return (
    <Card
      style={{
        width: '27vw',
        margin: '0px 10px',
        boxShadow: 24,
        minWidth: '360px',
        height: '65vh',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1.1. 이미지 */}
      <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/**이미지 제목 */}
        <Card.Text style={style.imgTitleContainer}>
          {
            // 이미지 제목
            currentIdx === 0 ? (
              <div style={style.imgTitleWrapper}>원육이미지</div>
            ) : (
              <div style={style.imgTitleWrapper}>
                딥에이징 {processed_data_seq[currentIdx]}차 이미지
              </div>
            )
          }

          <div style={{ display: 'flex' }}>
            {
              /**
               * page 가 수정및조회인 경우,
               * 이미지 파일을 업로드하기 위한 <input type="file"/>
               */
              currentIdx !== 0 && (
                <div>
                  <input
                    className="form-control"
                    id="formFile"
                    accept="image/jpg,impge/png,image/jpeg,image/gif"
                    type="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                    style={{ marginRight: '20px', display: 'none' }}
                  />
                  {
                    /**
                     * 수정 버튼 클릭시 이미지 조회 버튼 생성
                     */
                    edited && (
                      <IconButton
                        type="button"
                        className="btn btn-success"
                        style={style.imgUploadWrapper}
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      >
                        <span style={style.imgUploadTextWrapper}>
                          이미지 업로드
                        </span>
                        <FaUpload />
                      </IconButton>
                    )
                  }
                </div>
              )
            }
          </div>
        </Card.Text>
        {/**이미지 */}

        <Card.Text>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip"> {renderTooltipContent()}</Tooltip>
            }
          >
            <div style={style.imgContainer}>
              {
                // 실제 이미지
                imgArr[currentIdx] !== null && imgArr[currentIdx] !== 'null' ? (
                  isImgChanged === true ? (
                    /*이미지 미리 보기*/
                    <img
                      src={imgArr[currentIdx]}
                      alt={`Image ${currentIdx + 1}`}
                      style={style.imgWrapper}
                    />
                  ) : (
                    <img
                      src={imgArr[currentIdx] + '?time=' + new Date()}
                      alt={`Image ${currentIdx + 1}`}
                      style={style.imgWrapper}
                    />
                  )
                ) : (
                  <div style={style.imgNotExistWrapper}>
                    이미지가 존재하지 않습니다. <br /> 이미지를 업로드해주세요!
                  </div>
                )
              }
            </div>
          </OverlayTrigger>
        </Card.Text>

        {/**페이지네이션 */}
        <Card.Text style={style.paginationBtnWrapper}>
          <IconButton
            variant="contained"
            size="small"
            sx={style.paginationLeftBtn}
            onClick={handlePrevClick}
            disabled={currentIdx === 0}
          >
            <FaArrowLeft />
          </IconButton>
          <div style={style.paginationNavBtnWrapper}>
            {
              // 페이지네이션
              Array.from({ length: imgArr.length }, (_, idx) => (
                <div
                  value={idx}
                  style={
                    currentIdx === idx
                      ? style.paginationNavCurrDiv
                      : style.paginationNavNotCurrDiv
                  }
                  onClick={(e) => handleNumClick(e)}
                >
                  {idx + 1}
                </div>
              ))
            }
          </div>
          <IconButton
            variant="contained"
            size="small"
            sx={style.paginationRightBtn}
            onClick={handleNextClick}
            disabled={currentIdx === imgArr.length - 1}
          >
            <FaArrowRight />
          </IconButton>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MeatImgsCard;
