import React, { useState } from 'react';
import { AxiosResponse } from 'axios';

import { backendAPIAxios } from '../../../utils/http';

import { ILoginResponse } from '../../../models/response/response';

import icons from '../../../assets/icons';

import LoginView from './Login.view';

interface Props { 
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

export default Login;