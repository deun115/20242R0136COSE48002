import * as XLSX from 'xlsx';

// JSON 데이터를 엑셀로 변환하기
const downloadExcel = (data) => {
  const rows = DataListJSON2Excel(data);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'my_sheet');
  XLSX.writeFile(workbook, '데이터목록.xlsx');
};

// json 데이터 가공
const DataListJSON2Excel = (rawData) => {
  let newData = [];

  // id_list에 있는 ID들을 사용하여 meat_dict에서 데이터를 가져옴
  rawData.id_list.forEach((id) => {
    const meatData = rawData.meat_dict[id];
    if (meatData) {
      newData.push(meatData);
    }
  });

  return newData;
};

export { downloadExcel };
