import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const history = useHistory();

    // Your authentication logic here
    useEffect(() => {
      // Perform any necessary authentication checks
      // For example, check if the user is logged in or has valid credentials

      const isAuthenticated = localStorage.getItem('token')// Your authentication logic
      if (!isAuthenticated) {
        history.push('/login');
      }
    }, [history]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
