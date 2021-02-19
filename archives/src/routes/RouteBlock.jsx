/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CommonRoute from './CommonRoute';
import ProtectedRoute from './ProtectedRoute';
import Error404 from '../components/pageError/Error404';

import Home from '../components/home/Home';
import Dashboard from '../components/dds/dashboard/Dashboard';
// import Dashboard from '../components/treasury/';


const RouteBlock = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/terms-and-conditions" component={Home} />
    <Route path="/forgot-password" component={Home} />

    {/* Redirect to /dashboard if user is authenticated */}
    <CommonRoute path="/login" component={Home} />
    <CommonRoute path="/sign-up" component={Home} />

    <ProtectedRoute path="/dashboard" component={Dashboard} />
    <ProtectedRoute path="/collection-distribution" component={CollectionDistribution} />
    <Route component={Error404} />
  </Switch>
);

export default RouteBlock;
