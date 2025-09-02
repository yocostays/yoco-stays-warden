import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
