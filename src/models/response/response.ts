import { ICSV } from '../history';
import { Status } from '../shared/enum';

export interface IHistoryResponse {
  readonly data?: Readonly<{
    id: string,
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

export interface ITokenRefreshResponseData {
  readonly data?: Readonly<{
    token: string;
  }>;
}