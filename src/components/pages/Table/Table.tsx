import React, { ChangeEvent, useEffect, useState } from 'react';

import { AxiosResponse, AxiosError } from 'axios';

import { backendAPIAxios } from '../../../utils/http';

import { IHistory } from '../../../models/history';

import { 
  IHistoryResponse, 
  IUploadCSVResponse,
  IGetDataResponse,
  IDownloadResponse,
} from '../../../models/response/response';

import icons from '../../../assets/icons';

import TableView from './Table.view';

interface Props { 
  readonly iconName?: keyof typeof icons;
}

const Table: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ hitoryState, setHistoryState ] = useState<IHistory | null>(null);
  const [ downloadState, setDownloadState ] = useState<string>('');
  const [ , setFileState ] = useState<string>('');

  let [ loadingState, setLoadingState ] = useState<boolean>(false);
  let [ colorState, setColorState ] = useState("#ffffff");

  const CVSFile = new FormData();
  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    CVSFile.append('file', file);
  };
  
  useEffect(() => {
    backendAPIAxios.get('/history')
    .then((response: AxiosResponse<IHistoryResponse>) => {
      if (!response.data) {
        return alert('Failed to get history');
      }

      setHistoryState(() => response.data);
    })
    .catch((e: AxiosError) => {
      // alert(`Failed to get history with error: ${e}`);
    });
  }, [setHistoryState])

  const onDownland = () => {
    backendAPIAxios.post(`/download`)
      .then((response: AxiosResponse<IDownloadResponse>) => { 
        if (!response.data.file_name) {
          return alert('Failed to download CSV');
        }

        setDownloadState(() => response.data.file_name);
      })
      .catch((e: AxiosError) => {
        alert(`Failed to download CSV with error: ${e}`);
      });
  };
       
  const onUpload = () => {
    backendAPIAxios.post('/file', {
      file: CVSFile,
    }).then((response: AxiosResponse<IUploadCSVResponse>) => { 
        if (!response.data) {
          return alert('Failed to upload CSV');
        }
  
        setFileState(() => response.data.report_id);
      })
      .catch((e: AxiosError) => {
        alert(`Failed to upload CSV with error: ${e}`);
      });
  };

  const onRun = (reportId: string) => {
    backendAPIAxios.get(`/run/${reportId}`)
      .then((response: AxiosResponse<IGetDataResponse>) => {
        if (!response.data) {
          return alert('Failed to run');
        }
      })
      .catch((e: AxiosError) => {
        alert(`Failed to run with error: ${e}`);
      });
  };

  return (
    <TableView
      iconName={props.iconName}
      history={hitoryState}
      onDownload={onDownland}
      onUpload={onUpload}
      onRun={onRun}
      fileChangeHandler={fileChangeHandler}
    >{props.children}</TableView>
  );
};

Table.displayName = 'Table';
Table.defaultProps = {};

export default Table;