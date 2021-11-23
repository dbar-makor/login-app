import { Status } from '../shared/enumerations';

export interface ILoginResponse {
  readonly data?: Readonly<{
    token: string;
    email: string;
  }>;
}

export interface IHistoryResponse {
  data?: {
    id: number,
    date: Date,
    status: Status,
    files: File,
  }[];
};

export interface IUploadCSVResponse {
  data?: {
    file: string,
  };
};

export interface IGetDataResponse { };