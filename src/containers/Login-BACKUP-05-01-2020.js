import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../store/actions/authActions';
import { clearErrors } from '../store/actions/errorActions';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../components/common/Logo/Logo';
import Box from '@material-ui/core/Box';

import BackgroundImage from '../assets/img/home-background.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  const history = useHistory();

  // useEffect(() => {
  //     if (error.id === 'LOGIN_FAIL') {
  //         setErrorMsg(error.msg.msg);
  //     } else {
  //         setErrorMsg(null);
  //     }

  //     if (auth.isAuthenticated) {
  //         history.push("/requestor/dashboard");
  //     }
  // }, [error, auth])

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
    // dispatch(ACTION.login(newUser));
    history.push('/requestor/dashboard');
    // console.log(newUser);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5}>
        <div className={classes.paper}>
          <Box>
            <Logo />
          </Box>
          <Typography style={{ marginTop: 120, fontWeight: 'bold' }} component="h1" variant="h6">
            Document Distribution System
          </Typography>
          {auth.isLoading ? (
            <CircularProgress disableShrink />
          ) : errorMsg ? (
            <Alert severity="error" className={classes.alertStyle}>
              {errorMsg}
            </Alert>
          ) : null}
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
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => passwordHandler(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Log in
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
