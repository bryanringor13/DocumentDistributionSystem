import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
// import Login from '../components/Login';
// import NotFound from '../components/NotFound'
import PropTypes from 'prop-types';
import Login from '../containers/Login';
// const Register = () => (
//     <JumbotronWrapper title="Register">
//         <Link className="nav-link" to="/">
//             Back to login
// 		</Link>
//     </JumbotronWrapper>
// );
// const ForgotPassword = () => (
//     <JumbotronWrapper title="ForgotPassword">
//         <Link className="nav-link" to="/">
//             Back to login
// 		</Link>
//     </JumbotronWrapper>
// );

const PublicRoutes = ({ match }) => (
  <Fragment>
    {/* <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/register" component={Register} /> */}
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Login} />
    {/* <Route component={NotFound} /> */}
  </Fragment>
);

PublicRoutes.propTypes = {
  match: PropTypes.any,
};

export default PublicRoutes;
