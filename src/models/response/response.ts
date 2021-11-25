import { Status } from '../shared/enum';

// export interface IHistoryResponse {
//   reports: Readonly<{
//     readonly id?: string,
//     readonly status?: Status,
//     readonly created_at?: Date,
//   }>
// }[];

export interface IHistoryResponse {
  reports: {
    id?: string;
    status?: Status;
    created_at?: string;
  }[];
};
  
export interface IUploadCSVResponse {
  readonly report_id: string,
};
  
export interface IGetDataResponse { };

export interface IDownloadResponse {
  readonly file_link: string;
};

export interface ILoginResponse {
  readonly token: string;
};

export interface ITokenRefreshResponseData {
  readonly data?: Readonly<{
    token: string;
  }>;
}