import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { TextField, IconButton, Box } from '@mui/material';
import { getByPartialMeatId } from './api/get/getByPartialMeatId';
const SearchById = ({
  onDataFetch,
  onValueChange,
  startDate,
  endDate,
  specieValue,
}) => {
  const [meatId, setMeatId] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    // 정규식으로 영어/숫자만 허용
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(value)) {
      setMeatId(value);
      setError(false);
    } else {
      setMeatId(value);
      setError(true);
    }
  };

  const handleSearch = async () => {
    if (error) return; // Return if there's an error
    if (!meatId) {
      // If meatId is empty, switch to list view and return
      onValueChange('list');
      return;
    }
    try {
      const data = await getByPartialMeatId(
        meatId,
        0, // offset
        2000, // count - showing more results for partial matches
        startDate,
        endDate,
        specieValue
      );

      // If we got results, update the view accordingly
      if (data && data.meat_dict && Object.keys(data.meat_dict).length > 0) {
        onDataFetch(data);
        onValueChange('searched'); // Change to list view to show multiple results
      } else {
        // Handle no results case
        onDataFetch({ id_list: [], meat_dict: {}, 'DB Total len': 0 });
        onValueChange('searched');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      onDataFetch(null); // 에러 발생 시 데이터 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1, // 간격을 추가하여 인풋과 버튼 사이에 여유 공간을 둡니다.
        backgroundColor: '#ffffff', // 배경색을 설정합니다.
        borderRadius: '4px', // 모서리를 둥글게 설정합니다.
        padding: '5px', // 안쪽 여백을 설정합니다.
      }}
    >
      <TextField
        value={meatId}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="ID"
        variant="outlined"
        size="small"
        error={error}
        helperText={error ? '영어와 숫자만 입력할 수 있습니다.' : ''}
        sx={{
          flex: 1, // 인풋이 가능한 한 넓게 차지하도록 설정합니다.
          backgroundColor: 'white', // 인풋의 배경색을 설정합니다.
          borderRadius: '4px', // 인풋의 모서리를 둥글게 설정합니다.
        }}
      />
      <IconButton
        onClick={handleSearch}
        color="primary"
        sx={{
          backgroundColor: '#115293', // 버튼의 배경색을 설정합니다.
          color: 'white', // 버튼 아이콘의 색상을 설정합니다.
          '&:hover': {
            backgroundColor: 'Navy', // 호버 시 버튼의 배경색을 설정합니다.
          },
        }}
      >
        <HiOutlineSearch />
      </IconButton>
    </Box>
  );
};

export default SearchById;
