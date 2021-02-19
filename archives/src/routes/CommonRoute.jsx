/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils/common';

const CommonRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (getToken() ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    ))}
  />
);

export default CommonRoute;
