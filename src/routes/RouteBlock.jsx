import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
// import Welcome from '../containers/Welcome';
import Login from '../containers/Login';
import PropTypes from 'prop-types';
import { rolesConfig } from '../config/roles';
import * as Routes from './index';
import { uniqBy } from 'lodash';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return localStorage.getItem('token') ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }}
//     />
//   )
// }

export const RouteBlock = (props) => {
  const [allowedRoutes, setAllowedRoutes] = useState({ allowedRoutes: [] });
  useEffect(() => {
    let roles = JSON.parse(localStorage.getItem('roles'));
    if (roles) {
      roles = [...roles];

      let allowedRoutes = roles.reduce((acc, role) => {
        return [...acc, ...rolesConfig[role].routes];
      }, []);

      // For removing duplicate entries, compare with 'url'.
      allowedRoutes = uniqBy(allowedRoutes, 'url');
      setAllowedRoutes({ allowedRoutes });
      // console.log(allowedRoutes);
    } else {
      props.history.push('/');
    }
  }, [props.history]);
  return (
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      {/* <Route path='/register' component={Register} /> */}

      {allowedRoutes.allowedRoutes.map((route) => (
        <Route exact key={route.url} component={Routes[route.component]} path={`${props.match.path}${route.url}`} />
      ))}
      {/* <Route component={NotFound} /> */}
      {/* <ProtectedRoute path='/requestor/dashboard' component={Requestor} />
            <ProtectedRoute path='/admin/dashboard' component={Admin} /> */}
      {/* <Route path='/print/preview/:id' component={PrintPreview} /> */}
      {/* <Route path='/dashboard' component={Dashboard} /> */}
    </React.Fragment>
  );
};

RouteBlock.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default RouteBlock;
