import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import DownloadJS from 'downloadjs';

import * as authActions from '../../../store/actions/auth';
import { backendAPIAxios } from '../../../utils/http';

import { IUser } from '../../../models/user';
import { ICSV, IHistory } from '../../../models/history';

import { 
  IHistoryResponse, 
  IUploadCSVResponse,
  IGetDataResponse,
} from '../../../models/response/user';

import icons from '../../../assets/icons';

import TableView from './Table.view';

interface PropsFromDispatch {
  login: (user: IUser) => authActions.Login;
}

interface Props extends PropsFromDispatch { 
  readonly iconName?: keyof typeof icons;
}

const Table: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const { id } = useParams<string>();
  const CVSFile = new FormData();

  const [ hitoryState, setHistoryState ] = useState<IHistory[] | null>(null);
  const [ fileState, setFileState ] = useState<string>('');
  const [ validityCheckeState, setValidityCheckeState ] = useState<boolean>(false);
  
  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    CVSFile.append("file", file);
  };
  
  backendAPIAxios.get('/history', {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}` },
  })
    .then((response: AxiosResponse<IHistoryResponse>) => {
      if (!response.data) {
          return alert('Failed to get history');
      }
  
      setHistoryState(() => response.data.data!);
    })
    .catch((e: AxiosError) => {
      alert(`Failed to get history with error: ${e}`);
    });
    

  backendAPIAxios.post(`/upload/${id}`, {
    CVSFile,
  }, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}` },
  }).then((response: AxiosResponse<IUploadCSVResponse>) => { 
      if (!response.data) {
        return alert('Failed to send CSV');
      }

      setFileState(() => response.data.data!.file);
    })
    .catch((e: AxiosError) => {
      alert(`Failed to send CSV with error: ${e}`);
    });

  backendAPIAxios.get(`/run/${id}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}` },
  })
    .then((response: AxiosResponse<IGetDataResponse>) => {
      if (!response.data) {
        return alert('Failed to get data');
      }
    })
    .catch((e: AxiosError) => {
      alert(`Failed to get patient with error: ${e}`);
    });


  return (
    <TableView
      iconName={props.iconName}
      history={hitoryState}
      validityCheck={validityCheckeState}
      fileChangeHandler={fileChangeHandler}
    >{props.children}</TableView>
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