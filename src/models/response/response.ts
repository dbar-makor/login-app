import { Status } from '../shared/type';

// export interface IHistoryResponse {
//   reports: Readonly<{
//     readonly id?: string,
//     readonly status?: Status,
//     readonly created_at?: Date,
//   }>
// }[];

interface IReports {
  readonly id?: string;
  status?: Status;
  created_at?: Date;
}

export interface IHistoryResponse {
  reports: {
    readonly id?: string;
    status?: Status;
    created_at?: string;
  }[];
}
  
export interface IUploadCSVResponse {
  readonly data?: Readonly<{
    report_id: string,
  }>;
};
  
export interface IGetDataResponse { };

export interface IDownloadResponse { };

export interface ILoginResponse {
  readonly token: string;
};

export interface ITokenRefreshResponseData {
  readonly data?: Readonly<{
    token: string;
  }>;
}