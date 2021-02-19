/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';

import RouteBlock from './routes/RouteBlock';
import PublicRoutes from './routes/PublicRoutes';
import history from './utils/history';

import * as ACTION from './store/actions/authActions';
import * as CONSTANTS from './utils/Constants';

import './App.css';
import './app.scss';
import 'react-toastify/dist/ReactToastify.css';

const authentication = () => {
  const userRoles = JSON.parse(localStorage.getItem('roles'));
  const userRoleRequestor =
    userRoles !== null ? userRoles.some((roles) => CONSTANTS.REQUESTOR.indexOf(roles) >= 0) : userRoles;
  const userRoleAdminAssistant =
    userRoles !== null ? userRoles.some((roles) => CONSTANTS.ADMIN_ASSISTANT.indexOf(roles) >= 0) : userRoles;

  return userRoleRequestor ? (
    <Redirect to="/app/requests" />
  ) : userRoleAdminAssistant ? (
    <Redirect to="/app/statistics" />
  ) : (
    <PublicRoutes />
  );
};

const App = () => {
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.auth)

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      //   if ((userInfo.user === null) && userLoad) {
      dispatch(ACTION.loadUser());
      //     serUserload(false);
    }
    // }
  }, [dispatch]);
  // }, [userInfo])

  return (
    // <Router>
    //   <RouteBlock path="/app" />
    // </Router>
    <>
      <Router history={history}>
        <Switch>
          <Route path="/app" component={RouteBlock} />
          <Route path="" render={authentication} />
        </Switch>
      </Router>

      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
