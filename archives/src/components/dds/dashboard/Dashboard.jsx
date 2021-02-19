import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SplashScreen from '../../common/SplashScreen/SplashScreen';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();

  if (auth.user === null) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Dashboard</h2>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
