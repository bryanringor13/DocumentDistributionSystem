import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-final-form';
import { makeValidate, TextField } from 'mui-rff';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { noAuthAxios } from '../../../utils/apiConfig';
import { login, roles } from '../../../store/actions/authActions';

import Logo from '../../common/Logo/Logo';

const useStyles = makeStyles((theme) => ({
  formWrap: {
    marginTop: theme.spacing(4),
  },
  forgotPassword: {
    marginBottom: theme.spacing(0.5),
  },
  alert: {
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(0),
  },
}));

const initialValues = {
  username: '',
  password: '',
  agreement: false,
};

const formSchema = Yup.object().shape({
  // username: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  const onSubmit = async (values) => {
    await noAuthAxios
      .post('/login', values)
      .then((response) => {
        dispatch(login(response.data.data.token));
        dispatch(roles(response.data.data.roles));
       
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          setError(data.message);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Box mb="7rem">
        <Logo />
      </Box>

      <div>
        <h3>Documents Distribution System</h3>

        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={makeValidate(formSchema)}
          render={({ handleSubmit, submitting, invalid, pristine }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className={classes.formWrap}
            >
              {error && (
                <Alert icon={false} severity="error" className={classes.alert}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    disabled={submitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container className={classes.forgotPassword}>
                    <Grid item xs={6}>
                      <span>Password</span>
                    </Grid>
                    <Grid container item xs={6} justify="flex-end">
                      <Typography variant="body2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <TextField
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    disabled={submitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={invalid || pristine || submitting}
                    onClick={handleSubmit}
                    className={classes.submit}
                  >
                    {submitting && <CircularProgress size={20} />}
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default Login;
