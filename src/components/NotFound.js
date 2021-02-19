import React from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => {
  // <JumbotronWrapper {...props.jumbotronProps}>
  //     {props.children}
  // </JumbotronWrapper>
  return <div>Not Found</div>;
};

// NotFound.propTypes = {
//     jumbotronProps: PropTypes.shape({
//         title: PropTypes.string,
//         description: PropTypes.string
//     })
// };

// NotFound.defaultProps = {
//     jumbotronProps: {
//         title: '404 not found'
//     },
//     children: (<Link className="nav-link" to="/">Back</Link>)
// };

export default NotFound;
