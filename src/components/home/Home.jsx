import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BackgroundImage from '../../assets/img/home-background.png';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Login from './Login/Login';

// import './home.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'row',
    minHeight: 0,
    backgroundColor: '#f2f4f7',
  },
  banner: {
    flex: 'auto',
    height: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: 'top right',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  sider: {
    position: 'relative',
    minWidth: 0,
    transition: 'all 0.2s',
    flex: '0 0 650px',
    maxWidth: 650,
    width: 650,
    '@media (max-width: 1400px)': {
      flexBasis: 500,
      maxWidth: 500,
      width: 500,
    },
    '@media (max-width: 1200px)': {
      flexBasis: '50%',
      maxWidth: '50%',
      width: '50%',
    },
    '@media (max-width: 768px)': {
      flexBasis: '100%',
      maxWidth: '100%',
      width: '100%',
    },
  },
  siderContentWrap: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'auto',
  },
  siderContent: {
    padding: '2.5rem 20%',
    margin: 'auto 0',
    '@media (max-width: 1400px)': {
      padding: '2.5rem 15%',
    },
    '@media (max-width: 1200px)': {
      padding: '2.5rem 10%',
    },
    '@media (max-width: 768px)': {
      margin: 0,
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.banner} />

      <div className={classes.sider}>
        <div className={classes.siderContentWrap}>
          <div className={classes.siderContent}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
