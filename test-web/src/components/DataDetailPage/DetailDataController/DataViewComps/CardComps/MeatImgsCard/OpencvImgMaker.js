import React from 'react';
import style from '../../../../style/opencvimgmakerstyle';
import ColorPaletteMaker from './OpencvImgMaker/ColorPaletteMaker';

// OpenCV 이미지 생성 컴포넌트
const OpencvImgMaker = ({ data }) => {
  if (!data) return <div style={style.overlayNotExistWrapper}>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 단면 이미지 */}
      {data.segmentImage && (
        <div>
          <div style={style.imgTitleWrapper}>단면 이미지</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={data.segmentImage}
              alt="Segmented Image"
              style={style.imgWrapper}
            />
          </div>
          <div style={{ marginTop: '6vh' }}>
            <div style={style.imgTitleWrapper}>
              {data.proteinRate
                ? ` 단백질 비율 (${data.proteinRate.toFixed(2)}%)`
                : ''}
            </div>
            <div style={style.imgTitleWrapper}>
              {data.fatRate ? ` 지방 비율 (${data.fatRate.toFixed(2)}%)` : ''}
            </div>
          </div>
        </div>
      )}

      {/* 컬러팔레트 */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={style.imgTitleWrapper}>단백질 컬러팔레트</div>
          {data.proteinColorPalette ? (
            <ColorPaletteMaker
              colors={data.proteinColorPalette.map((color) => [color])}
            />
          ) : (
            <div>No Protein Color Palette Available</div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={style.imgTitleWrapper}>지방 컬러팔레트</div>
          {data.fatColorPalette ? (
            <ColorPaletteMaker
              colors={data.fatColorPalette.map((color) => [color])}
            />
          ) : (
            <div>No Fat Color Palette Available</div>
          )}
        </div>

        <div>
          <div style={style.imgTitleWrapper}>전체 컬러팔레트 (%)</div>
          {/* Use ColorPalette and pass the color and percentage */}
          {data.totalColorPalette ? (
            <ColorPaletteMaker
              colors={data.totalColorPalette}
              showPercentage={true}
            />
          ) : (
            <div>No Total Color Palette Available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpencvImgMaker;
