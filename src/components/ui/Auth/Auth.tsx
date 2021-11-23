import React from 'react';
import { Redirect } from "react-router-dom";

const Auth = (Component: React.ComponentType) => {
  const AuthRoute = () => {
    const isAuth = !!localStorage.getItem('token');
    if (isAuth) {
      return <Component />;
    }

    return <Redirect to="/login" />;
  };

  return AuthRoute;
};

Auth.displayName = 'Auth';
Auth.defaultProps = {};

export default Auth;
