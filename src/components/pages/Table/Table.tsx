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
  const CVSFile = new FormData();

  const [ hitoryState, setHistoryState ] = useState<IHistory | null>(null);
  const [ downloadState, setDownloadState ] = useState<string>('');
  const [ , setFileState ] = useState<string>('');
  
  const [ downloadLoadingState, setDownloadLoadingState ] = useState<boolean>(false);
  const [ runLoadingState, setRunLoadingState ] = useState<boolean>(false);
  const [ uploadLoadingState, setUploadLoadingState ] = useState<boolean>(false);

  const [ checkUploadState, setCheckUploadState ] = useState<boolean>(false);

  const [ openModalState, setOpenModalState ] = useState<boolean>(false);

  const handleModalOpen = () => setOpenModalState(true);
  const handleModalClose = () => setOpenModalState(false);
  
  const getHistory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      
      // Checks if token exist
      if (token) {
        const response = await backendAPIAxios.get('/history',{ headers: { "Authorization": token } });
        backendAPIAxios.defaults.headers.common['Authorization'] = token;
        
        setHistoryState(() => response.data);
      }
      
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
      
    } catch (e) {
      alert(`Failed to get history with error: ${e}`);
    }
  };
  
  useEffect(() => {
    getHistory();
  }, [setHistoryState])
  
  const onDownland = (reportId: string) => {
    setDownloadLoadingState(() => true);

    backendAPIAxios.get(`/download/${reportId}`)
    .then((response: AxiosResponse<IDownloadResponse>) => { 
      if (!response.data.file_link) {
        return alert('Failed to download CSV');
      }
      
      setDownloadState(() => response.data.file_link);
    })
    .catch((e: AxiosError) => {
      alert(`Failed to download CSV with error: ${e}`);
    }).finally(() => {

      setDownloadLoadingState(() => false);  
    });
  };   
  
  const onUpload = (event: ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files![0];

    CVSFile.append('file', file);

    setUploadLoadingState(() => true); 

    backendAPIAxios.post('/upload', {
      file: CVSFile,
    }, {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // https://github.com/request/request-promise
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response: AxiosResponse<IUploadCSVResponse>) => { 
        if (!response.data) {
          return alert('Failed to upload CSV');
        }

        setFileState(() => response.data.report_id);

        if (response.status === 200) {
          setCheckUploadState(() => true);
        }

      })
      .catch((e: AxiosError) => {
        alert(`Failed to upload CSV with error: ${e}`);
      }).finally(() => {
        setUploadLoadingState(() => false);
      });
  };

  const onRun = () => {
    setRunLoadingState(() => true);

    backendAPIAxios.post(`/run/${downloadState}`)
      .then((response: AxiosResponse<IGetDataResponse>) => {
        if (!response.data) {
          return alert('Failed to run');
        }

        if (response.status === 200) {
          setCheckUploadState(() => false);
        }
      })
      .catch((e: AxiosError) => {
        alert(`Failed to run with error: ${e}`);
      }).finally(() => {
        setRunLoadingState(() => false);
      });
  };

  return (
    <TableView
      iconName={props.iconName}
      history={hitoryState}
      onDownload={onDownland}
      onRun={onRun}
      onUpload={onUpload}
      openModalState={openModalState}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      downloadLoadingState={downloadLoadingState}
      runLoadingState={runLoadingState}
      uploadLoadingState={uploadLoadingState}
      checkUploadState={checkUploadState}
    >{props.children}</TableView>
  );
};

Table.displayName = 'Table';
Table.defaultProps = {};

export default Table;