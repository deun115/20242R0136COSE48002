import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../shared/Utils/UserContext';

import UserMangementField from '../UserMangementField';
import CustomSnackbar from '../../../shared/components/CustomSnackbar';
// import MuiAlert from '@mui/material/Alert';

// const Alert = React.forwardRef((props, ref) => {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const UserManagement = () => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const user = useUser();
  useEffect(() => {
    if (user.type !== 'Manager') {
      setHasPermission(false);
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  }, [user, navigate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!hasPermission) {
    return (
      <div>
        <CustomSnackbar
          open={snackbarOpen}
          message={'권한이 없습니다.'}
          severity={'error'}
          onClose={handleSnackbarClose}
        />
      </div>
    );
  }

  return <UserMangementField />;
};

export default UserManagement;
