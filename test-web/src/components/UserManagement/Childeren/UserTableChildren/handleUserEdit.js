/** 유저 정보 수정 함수 */
/** id 해당하는 유저의 field 값으로 들어온 정보를 value로 수정*/
import { userUpdate } from '../../../../API/user/userUpdate';

const handleUserEdit = async (params, handleSnackbarShow) => {
  const { id, field, value } = params;

  const req = {
    userId: id,
    [field]: value,
  };
  try {
    // Send a POST request to update the user's information
    const response = await userUpdate(req);
    if (response.ok) {
      const data = await response.json();
      handleSnackbarShow(
        `${data.name}님의 ${field}이 ${value}로 수정되었습니다.`,
        'success'
      );
      return true;
    } else {
      handleSnackbarShow(`권한 변경에 실패하였습니다. `, 'error');
      console.log('Failed to update the user information');
      return false;
    }
  } catch (error) {
    handleSnackbarShow(`권한 변경 중 오류가 발생하였습니다. `, 'error');
    console.log('Error updating user information:', error);
    return false;
  }
};

export default handleUserEdit;
