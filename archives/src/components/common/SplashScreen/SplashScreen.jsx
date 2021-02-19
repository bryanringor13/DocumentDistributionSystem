import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const SplashScreen = () => (
  <CircularProgress
    size={40}
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
);

export default SplashScreen;
