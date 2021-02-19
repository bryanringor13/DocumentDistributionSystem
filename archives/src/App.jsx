import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import RouteBlock from './routes/RouteBlock';
import { login } from './store/actions/authActions';
import { getToken } from './utils/common';

import HeaderNav from './components/header/HeaderNav';
import HeaderTop from './components/header/HeaderTop';

import './assets/css/main.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    dispatch(login(token));
  }, []);

  return (
    <>
      <Helmet defaultTitle="Veridata" titleTemplate="%s - Veridata" />
      {isAuthenticated ? (
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <HeaderNav />
            <div className="main-content-wrapper">
              <HeaderTop />
              <main className={classes.content}>
                <RouteBlock />
              </main>
            </div>
          </div>
        </Router>
      ) : (
          <Router>
            <RouteBlock />
          </Router>
        )}
    </>
  );
};

export default App;
