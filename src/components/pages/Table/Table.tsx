import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams<{ id: string }>();
  
  const [ hitoryState, setHistoryState ] = useState<IHistory[] | null>(null);
  const [ downloadState, setDownloadState ] = useState<string>('');
  const [ , setFileState ] = useState<string>('');
  
  const CVSFile = new FormData();
  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    CVSFile.append('file', file);
  };
  
    useEffect(() => {
      backendAPIAxios.get('/history')
      .then((response: AxiosResponse<IHistoryResponse[]>) => {
        if (!response.data) {
          return alert('Failed to get history');
        }

        console.log(response.data)
        setHistoryState(() => response.data);
      })
      .catch((e: AxiosError) => {
        console.log(e)
        // alert(`Failed to get history with error: ${e}`);
      });
    }, [setHistoryState])

  const onDownland = () => {
    backendAPIAxios.post(`/download/${id}`)
      .then((response: AxiosResponse<IDownloadResponse>) => { 
        if (!response.data) {
          return alert('Failed to download CSV');
        }

        // Get file_name
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
  
        setFileState(() => response.data.data!.report_id);
      })
      .catch((e: AxiosError) => {
        alert(`Failed to upload CSV with error: ${e}`);
      });
  };

  const onRun = () => {
    backendAPIAxios.get(`/run/${id}`) // Add report_id
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