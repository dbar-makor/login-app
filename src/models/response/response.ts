import { ICSV } from '../history';
import { Status } from '../shared/enumerations';

export interface IHistoryResponse {
    readonly data?: Readonly<{
      id: number,
      status: Status,
      date: Date,
      files: File,
    }>[];
  };
  
  export interface IUploadCSVResponse {
    readonly data?: Readonly<{
      file: string,
    }>;
  };
  
  export interface IGetDataResponse { };

  export interface IDownloadResponse { };

  export interface ILoginResponse {
    readonly data?: Readonly<{
      token: string;
      email: string;
    }>;
  };