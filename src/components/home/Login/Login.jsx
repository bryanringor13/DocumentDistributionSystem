import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PasswordField from '../../common/Form/PasswordField';
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
  email_address: '',
  password: '',
  agreement: false,
};

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Box mb="7rem">
        <Logo />
      </Box>

      <div>
        <h3>Partners Portal</h3>

        <form noValidate className={classes.formWrap}>
          <Alert icon={false} severity="error" className={classes.alert}>
            error
          </Alert>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email_address"
                variant="outlined"
                fullWidth
                disabled={false}
                data-cy="asdad"
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
              <PasswordField name="password" variant="outlined" fullWidth disabled={false} />
            </Grid>

            <Grid item xs={12} className={classes.checkbox}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                <CircularProgress size={20} />
                Log In
              </Button>

              <Box mt={8}>
                <Typography variant="body2">
                  {'Don’t have an account yet? '}
                  <Link to="/sign-up">Sign Up</Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default Login;
