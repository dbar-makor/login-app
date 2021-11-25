import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { AxiosError, AxiosResponse } from 'axios';

import { backendAPIAxios } from '../../../utils/http';

import { ILoginResponse } from '../../../models/response/response';

import icons from '../../../assets/icons';

import LoginView from './Login.view';

interface Props { 
  readonly iconName?: keyof typeof icons;
}

const Login: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ usernameState, setUsernameState ] = useState<any>('');
  const [ passwordState, setPasswordState ] = useState<any>('');
  const [ errorState, setErrorState ] = useState<boolean>(false);

  const history = useHistory();

  const usernameChangeHandler = (username: any) => setUsernameState(username.target.value);
  const passwordChangeHandler = (password: any) => setPasswordState(password.target.value);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    backendAPIAxios.post('/auth', {
      username: usernameState,
      password: passwordState,
    }).then((response: AxiosResponse<ILoginResponse>) => {
      sessionStorage.setItem('token','Bearer ' + response.data.token);
      backendAPIAxios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      history.push('/table');
    }).catch((e: AxiosError) => {
      setErrorState(() => true);
      alert(`Failed to auth with error: ${e}`);
    });
  };

  return (
    <LoginView
      iconName={props.iconName}
      username={usernameState}
      password={passwordState}
      error={errorState}
      usernameChangeHandler={usernameChangeHandler}
      passwordChangeHandler={passwordChangeHandler}
      submitHandler={submitHandler}
    >{props.children}</LoginView>
  );
};

Login.displayName = 'Login';
Login.defaultProps = {};

export default Login;