import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LogIn from './components/LogIn/routes/LogIn';
import Home from './components/Home/routes/Home';
import Dashboard from './components/DataListView/routes/Dashboard';
import Stats from './components/Stats/routes/Stats';
import PA from './components/DataListView/routes/PA';
import Profile from './components/Profile/routes/Profile';
import DataEdit from './components/DataDetailPage/routes/DataEdit';
import UserManagement from './components/UserManagement/routes/UserManagement';
import DataConfirm from './components/DataDetailPage/routes/DataConfirm';
import DataPredict from './components/DataDetailPage/routes/DataPredict';

import { UserProvider } from './shared/Utils/UserContext';

import Box from '@mui/material/Box';
import WidgetBars from './components/Widget/WidgetBars';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();

function App() {
  const isLoggedin = localStorage.getItem('isLoggedIn') === 'true';
  console.log(isLoggedin);

  const routes = [
    {
      path: '/',
      title: isLoggedin ? 'Home | DeePlant' : 'LogIn | DeePlant',
      component: isLoggedin ? <Home /> : <LogIn />,
    },
    {
      path: '/Home',
      title: 'Home | DeePlant',
      component: <Home />,
    },
    {
      path: '/DataManage',
      title: 'DataManage | DeePlant',
      component: <Dashboard />,
    },
    {
      path: '/DataConfirm/:id',
      title: 'DataConfirm | Deeplant',
      component: <DataConfirm />,
    },
    {
      path: '/dataView/:id',
      title: 'DataView | DeePlant',
      component: <DataEdit />,
    },
    {
      path: '/dataPA/:id',
      title: 'DataPredict | DeePlant',
      component: <DataPredict />,
    },
    {
      path: '/PA',
      title: 'PA | DeePlant',
      component: <PA />,
    },
    {
      path: '/stats',
      title: 'Statistics | DeePlant',
      component: <Stats />,
    },
    {
      path: '/profile',
      title: 'Profile | DeePlant',
      component: <Profile />,
    },
    {
      path: '/UserManagement',
      title: 'UserManage | Deeplant',
      component: <UserManagement />,
    },
  ];

  return (
    <UserProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  <Helmet>
                    <title>{route.title}</title>
                  </Helmet>
                  <ThemeProvider theme={defaultTheme}>
                    {!isLoggedin ? (
                      <LogIn />
                    ) : (
                      <Box sx={{ display: 'flex' }}>
                        <WidgetBars />
                        <Box
                          component="main"
                          sx={{
                            backgroundColor: '#FAFBFC',
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          {route.component}
                        </Box>
                      </Box>
                    )}
                  </ThemeProvider>
                </>
              }
            />
          ))}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
