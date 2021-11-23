import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import * as authActions from '../../../store/actions/auth';
import { backendAPIAxios } from '../../../utils/http';
import { IUser } from '../../../models/user';

import { ILoginResponse } from '../../../models/response/response';

import icons from '../../../assets/icons';

import LoginView from './Login.view';

interface PropsFromDispatch {
  login: (user: IUser) => authActions.Login;
}

interface Props extends PropsFromDispatch { 
  readonly iconName?: keyof typeof icons;
}

const Login: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ emailState, setEmailState ] = useState<string>('');
  const [ passwordState, setPasswordState ] = useState<string>('');

  const emailChangeHandler = (value: string) => setEmailState(() => value);
  const passwordChangeHandler = (value: string) => setPasswordState(() => value);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    backendAPIAxios.post('/login', {
      email: emailState,
      password: passwordState,
    }).then((response: AxiosResponse<ILoginResponse>) => {
      sessionStorage.setItem('token', response.data.data!.token);
      props.login({ email: emailState });
    });
  };

  return (
    <LoginView
      iconName={props.iconName}
      email={emailState}
      password={passwordState}
      emailChangeHandler={emailChangeHandler}
      passwordChangeHandler={passwordChangeHandler}
      submitHandler={submitHandler}
    >{props.children}</LoginView>
  );
};

Login.displayName = 'Login';
Login.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<authActions.AuthTypes>): PropsFromDispatch => {
  return {
    login: (user: IUser): authActions.Login => dispatch(authActions.login(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
