import { apiIP } from '../../../../config';

// export 할 육류 데이터 목록 fetch
export const getDataListJSON = async ({ startDate, endDate, specieValue }) => {
  try {
    const response = await fetch(
      `http://${apiIP}/meat/get?start=${startDate}&end=${endDate}&specieValue=${specieValue}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Fetch error:', error);
    return null; // 또는 빈 객체나 배열을 반환할 수 있습니다.
  }
};
export default getDataListJSON;
