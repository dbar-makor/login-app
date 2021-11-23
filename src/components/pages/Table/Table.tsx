import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import * as authActions from '../../../store/actions/auth';
import { backendAPIAxios } from '../../../utils/http';
import { IUser } from '../../../models/user';

import { IHistory } from '../../../models/history';
import { IHistoryResponse } from '../../../models/response/user';

import icons from '../../../assets/icons';

import LoginView from './Table.view';

interface PropsFromDispatch {
  login: (user: IUser) => authActions.Login;
}

interface Props extends PropsFromDispatch { 
  readonly iconName?: keyof typeof icons;
}

const Table: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ hitoryState, setHistoryState ] = useState<IHistory[] | null>(null);

  backendAPIAxios.get('/history')
    .then((response: AxiosResponse<IHistoryResponse>) => {
      // if (!response.data.success) {
      //   return alert(`Failed to get history with error: ${response.data.message}`)
      // }

      setHistoryState(() => response.data.data!);
    })
    .catch((e: AxiosError) => {
    // alert(`Failed to get historic prices with error: ${e}`);
  });

  return (
    <LoginView
      iconName={props.iconName}
      history={hitoryState}
    >{props.children}</LoginView>
  );
};

Table.displayName = 'Table';
Table.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<authActions.AuthTypes>): PropsFromDispatch => {
  return {
    login: (user: IUser): authActions.Login => dispatch(authActions.login(user)),
  };
};

export default connect(null, mapDispatchToProps)(Table);