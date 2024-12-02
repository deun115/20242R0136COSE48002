import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// mui
import { Box, Button, Select, MenuItem, CircularProgress } from '@mui/material';
// style
import style from '../style/dashboardstyle';
// icon, timezone
import { FaBoxOpen } from 'react-icons/fa';
import { TIME_ZONE } from '../../../config';
// 검색 필터 컴포넌트
import SearchFilterBar from '../../../shared/components/Search/SearchFilterBar';
// 육류 목록 컴포넌트
import DataListComp from '../DataListComp';
// 목록 현황 컴포넌트
import Charts from '../Charts';
// 반려 데이터 목록 컴포넌트
import RejectedDataListComp from '../RejectedDataListComp';
// 엑셀 파일 export/ import 컴포넌트
import ExcelController from '../ExcelController';
// ID 검색 컴포넌트
import SearchById from '../SearchById';
import SearchedDataListComp from '../SearchedDataListComp';
// 구간 계산 함수
import updateDates from '../../../shared/Utils/updateDates';

const navy = '#0F3659';

const Dashboard = () => {
  const [value, setValue] = useState('list');
  const [specieValue, setSpecieValue] = useState('전체');
  const [searchedData, setSearchedData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pageOffset, setPageOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // 쿼리스트링 추출
  const location = useLocation();
  const { querypageOffset, queryStartDate, queryEndDate, queryDuration } =
    useMemo(() => {
      const searchParams = new URLSearchParams(location.search);
      return {
        querypageOffset: searchParams.get('pageOffset'),
        queryStartDate: searchParams.get('start') || '',
        queryEndDate: searchParams.get('end') || '',
        queryDuration: searchParams.get('duration') || '',
      };
    }, [location.search]);

  useEffect(() => {
    setPageOffset(querypageOffset);
  }, [querypageOffset]);

  useEffect(() => {
    setIsLoading(true);
    const now = new Date();
    let start = new Date('1970-01-01T00:00:00Z');
    let end = new Date(now);

    if (queryDuration) {
      const { start: durationStart, end: durationEnd } =
        updateDates(queryDuration);
      start = new Date(durationStart);
      end = new Date(durationEnd);
    } else if (queryStartDate || queryEndDate) {
      // startDate 또는 endDate 파라미터가 있을 경우
      if (queryStartDate) {
        start = new Date(queryStartDate);
      }
      if (queryEndDate) {
        end = new Date(queryEndDate);
      }
    } else {
      // 기본값 설정 (7일 전부터 현재까지)
      start = new Date(now);
      start.setDate(now.getDate() - 7);
    }

    const formattedStartDate = new Date(start.getTime() + TIME_ZONE)
      .toISOString()
      .slice(0, -5);
    const formattedEndDate = new Date(end.getTime() + TIME_ZONE)
      .toISOString()
      .slice(0, -5);

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setIsLoading(false);
  }, [queryStartDate, queryEndDate, queryDuration, location.search]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleSpeciesChange = (event) => {
    setSpecieValue(event.target.value);
  };

  const handleSearchedDataFetch = (fetchedData) => {
    setSearchedData(fetchedData);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div
      style={{
        overflow: 'auto',
        width: '100%',
        marginTop: '100px',
        height: '100%',
        paddingLeft: '30px',
        paddingRight: '20px',
      }}
    >
      {/**페이지 제목 Dashboard ()> 반려함) */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '634px', // minimum width
        }}
      >
        {value === 'reject' ? (
          <div style={{ display: 'flex' }}>
            <span
              style={{ color: '#b0bec5', fontSize: '30px', fontWeight: '600' }}
            >
              Dashboard {'>'}{' '}
            </span>
            <span
              style={{ color: `${navy}`, fontSize: '30px', fontWeight: '600' }}
            >
              반려함
            </span>
          </div>
        ) : (
          <span
            style={{ color: `${navy}`, fontSize: '30px', fontWeight: '600' }}
          >
            Dashboard
          </span>
        )}

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            style={
              value === 'reject'
                ? style.tabBtnCilcked
                : { color: `${navy}`, border: `1px solid ${navy}` }
            }
            value="reject"
            variant="outlined"
            onClick={(e) => {
              setValue(e.target.value);
            }}
          >
            <FaBoxOpen style={{ marginRight: '3px' }} />
            반려함
          </Button>
        </div>
      </Box>

      {/**이동 탭 (목록, 통계 , 반려) */}
      <Box sx={style.fixedTab}>
        <div style={{ display: 'flex' }}>
          <Button
            style={value === 'list' ? style.tabBtnCilcked : style.tabBtn}
            value="list"
            variant="outlined"
            onClick={(e) => {
              setValue(e.target.value);
            }}
          >
            목록
          </Button>
          {value !== 'searched' && (
            <Button
              style={value === 'stat' ? style.tabBtnCilcked : style.tabBtn}
              value="stat"
              variant="outlined"
              onClick={(e) => {
                setValue(e.target.value);
              }}
            >
              현황
            </Button>
          )}
        </div>
      </Box>

      {/**검색필터, 엑셀  */}
      <Box sx={style.fixed}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}
        >
          <SearchFilterBar />
          <SearchById
            onDataFetch={handleSearchedDataFetch}
            onValueChange={handleValueChange}
            startDate={startDate}
            endDate={endDate}
            specieValue={specieValue}
          />
          <Select
            labelId="species"
            id="species"
            value={specieValue}
            onChange={handleSpeciesChange}
            label="종류"
          >
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="소">소</MenuItem>
            <MenuItem value="돼지">돼지</MenuItem>
          </Select>
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: '85px',
          }}
        >
          {(value === 'list' || value === 'searched') && (
            <ExcelController
              startDate={startDate}
              endDate={endDate}
              specieValue={specieValue}
            />
          )}
        </div>
      </Box>

      {value === 'searched' && (
        <SearchedDataListComp
          startDate={startDate}
          endDate={endDate}
          searchedData={searchedData}
        />
      )}

      {value === 'list' && (
        <DataListComp
          startDate={startDate}
          endDate={endDate}
          pageOffset={pageOffset}
          specieValue={specieValue}
        />
      )}
      {value === 'stat' && (
        <Charts
          startDate={startDate}
          endDate={endDate}
          pageOffset={pageOffset}
        />
      )}
      {value === 'reject' && (
        <RejectedDataListComp
          startDate={startDate}
          endDate={endDate}
          pageOffset={pageOffset}
          specieValue={specieValue}
        />
      )}
    </div>
  );
};

export default Dashboard;
