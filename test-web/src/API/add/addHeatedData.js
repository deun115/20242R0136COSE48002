import { apiIP } from '../../config';

// 가열육 수정 POST API
export const addHeatedData = async (
  data, // 가열육 데이터
  i, // 가열육 seqno
  meatId, // 이력번호
  userId,
  isPost
) => {
  const dataset = {
    ['flavor']: parseFloat(data.flavor),
    ['juiciness']: parseFloat(data.juiciness),
    ['umami']: parseFloat(data.umami),
    ['palatability']: parseFloat(data.palatability),
    ['tenderness0']: parseFloat(data.tenderness0),
    ['tenderness3']: parseFloat(data.tenderness3),
    ['tenderness7']: parseFloat(data.tenderness7),
    ['tenderness14']: parseFloat(data.tenderness14),
    ['tenderness21']: parseFloat(data.tenderness21),
  };
  //request body에 보낼 데이터 가공
  let req = {
    heatedmeatSensoryData: dataset,
  };
  req = {
    ...req,
    ['meatId']: meatId,
    ['userId']: userId,
    ['seqno']: i,
    ['filmedAt']: '2024-07-07T12:12:12',
    ['imgAdded']: false,
  };
  if (!isPost) delete req['userId'];

  //meat/add/heatedmeat-eval로 가열육 데이터 생성/수정 API 전송
  try {
    const response = await fetch(`http://${apiIP}/meat/add/heatedmeat-eval`, {
      method: `${isPost ? 'POST' : 'PATCH'}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    if (!response.ok) {
      throw new Error(
        'heatedmeat_eval 서버에서 응답 코드가 성공(2xx)이 아닙니다.'
      );
    }
    // 서버에서 받은 JSON 응답 데이터를 해석
    const responseData = await response.json();
    return { ...responseData, ok: true };
  } catch (err) {
    console.log('error');
    console.error(err);
  }
};
export default addHeatedData
