import { LinearProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BackgroundImage from '../assets/img/bg-login.png';
import Logo from '../components/common/Logo/Logo';
import PasswordField from '../components/common/PasswordField/PasswordField';
import * as ACTION from '../store/actions/authActions';
import * as REQUEST from '../store/actions/requestActions';
import * as ADDRESS from '../store/actions/addressActions';
import { clearErrors } from '../store/actions/errorActions';
import * as CONSTANTS from '../utils/Constants';
import Veridata from '../assets/img/icons/veridata.png';
import './styles/Login.css';
import packageJson from '../../package.json';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  forgotPassword: {
    marginBottom: theme.spacing(0.5),
    maxWidth: '368px',
    '& span': {
      fontSize: '14px',
      lineHeight: '24px',
    },
  },
  passwordText: {
    color: '#55565c',
  },
  forgotPassText: {
    fontWeight: 'bold',
    color: '#41B67F',
    cursor: 'pointer',
  },
  forgotPassModalContent: {
    padding: '24px 24px 44px',
    '&:first-child': {
      paddingTop: '24px',
    },
  },
  forgotPassModalClose: {
    border: '1px solid rgba(47, 53, 66, 0.4)',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      fill: '#2f3542',
    },
  },
  forgotPassModalTitle: {
    fontSize: '36px',
    lineHeight: '48px',
    fontWeight: 'bold',
  },
  forgotPassModalText: {
    margin: '26px 0 42px',
    fontSize: '15px',
    lineHeight: '22px',
  },
  forgotPassModalBtn: {
    textAlign: 'right',
  },
  powered: {
    marginTop: '100px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  veridata: {
    marginLeft: '5px',
    width: '66px',
    height: '16px',
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingLeft: '0',
    '& .MuiInputBase-root': {
      maxWidth: '368px',
    },
    '& .MuiInputLabel-root': {
      '& span': {
        display: 'none',
      },
    },
  },
  paper: {
    marginTop: 70,
    marginRight: 100,
    marginLeft: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  alertStyle: {
    width: '100%',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    height: '56px',
    maxWidth: '368px',
    margin: theme.spacing(1, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState(null);

  const [showForgotPass, setShowForgotPass] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrorMsg(error.msg.message);
    } else {
      setErrorMsg(null);
    }

    // if (auth.isAuthenticated) {
    //   if (auth.data) {
    //     if (auth.data.user.user_type === 'dds_requestor') {
    //       history.push('/requestor/dashboard')
    //     } else if (auth.data.user.user_type === 'dds_admin_assistant') {
    //       history.push('/admin/dashboard')
    //     }
    //   }
    // }

    const userRoles = JSON.parse(localStorage.getItem('roles'));
    const userRoleRequestor =
      userRoles !== null ? userRoles.some((roles) => CONSTANTS.REQUESTOR.indexOf(roles) >= 0) : userRoles;
    const userRoleAdminAssistant =
      userRoles !== null ? userRoles.some((roles) => CONSTANTS.ADMIN_ASSISTANT.indexOf(roles) >= 0) : userRoles;

    if (auth.isAuthenticated) {
      if (userRoleRequestor) {
        history.push('/app/requests');
      }

      if (userRoleAdminAssistant) {
        history.push('/app/statistics');
      }
    }
  }, [error, auth, history]);

  const usernameHandler = (username) => setUsername(username);
  const passwordHandler = (password) => setPassword(password);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(clearErrors());
    //  Login user Object
    const newUser = {
      username,
      password,
    };

    // Attempt to login
    dispatch(ACTION.login(newUser));
    dispatch(REQUEST.clearAllFilter());
  
    // history.push("/requestor/dashboard");
    // console.log(newUser);
  };

  const forgotPassModal = () => {
    setShowForgotPass(!showForgotPass);
  };

  return (
    <Grid container component="main" className={`login-wrapper ${classes.image}`}>
      <CssBaseline />
      <Grid item xs={7} />
      <Grid item xs={5} className="login-right-content">
        <div className="login-content">
          <Box>
            <Logo />
          </Box>
          <Typography style={{ marginTop: 120, fontSize: '28px', fontWeight: 'bold' }} component="h1" variant="h1">
            Document Distribution System
          </Typography>
          <div style={{ marginTop: '100px' }}>
            {auth.isLoading ? (
              <LinearProgress />
            ) : errorMsg ? (
              <Alert severity="error" className={classes.alertStyle} data-cy="alert_login">
                <span data-cy="invalid_alert_login">{errorMsg}</span>
              </Alert>
            ) : null}
          </div>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => usernameHandler(e.target.value)}
              inputProps={{ 'data-cy': 'username_login' }}
            />

            <Grid container className={classes.forgotPassword}>
              <Grid item xs={6}>
                <span className={classes.passwordText}>Password</span>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <Typography
                  variant="outlined"
                  className={classes.forgotPassText}
                  onClick={() => forgotPassModal()}
                  data-cy="forgot_password"
                >
                  {/* <Link to="/forgot-password" tabIndex={-1}>
                    Forgot Password??
                  </Link> */}
                  Forgot Password?
                </Typography>
              </Grid>
            </Grid>
            <div className="icon-show-cust">
              <PasswordField
                required
                name="password"
                variant="outlined"
                fullWidth
                id="password"
                autoComplete="current-password"
                onChange={(e) => passwordHandler(e.target.value)}
                inputProps={{ 'data-cy': 'password_login' }}
              />
            </div>
            <Button
              disabled={!password || !username}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-cy="submit_login"
            >
              Log in
            </Button>
          </form>
          <div className={classes.powered}>
            <p>
              Powered by: <img src={Veridata} className={classes.veridata} alt="veridata" />
            </p>
            <div>v{packageJson.version}</div>
          </div>
        </div>
      </Grid>
      <Dialog
        open={showForgotPass}
        onClose={forgotPassModal}
        aria-labelledby="forgot-password-modal"
        disableBackdropClick
        data-cy="forgot_password_modal"
      >
        <DialogContent className={classes.forgotPassModalContent}>
          <div className={classes.forgotPassModalBtn}>
            <IconButton
              aria-label="close-forgot-pass-modal"
              className={classes.forgotPassModalClose}
              onClick={forgotPassModal}
            >
              <ClearSharpIcon fontSize="small" />
            </IconButton>
          </div>
          <Typography className={classes.forgotPassModalTitle}>Forgot Password</Typography>
          <Typography className={classes.forgotPassModalText} data-cy="forgot_password_instruction">
            Go to HIMS 2.0 Login page and click the “Forgot Password” link to request for a password reset.
          </Typography>
          <div className={classes.forgotPassModalBtn}>
            <Button type="button" variant="contained" color="primary" onClick={forgotPassModal}>
              Ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Login;
