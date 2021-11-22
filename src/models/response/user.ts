import { Status } from '../shared/enumerations';
import IServerResponseData from '../shared/response';

export interface ILoginResponse extends IServerResponseData {
  readonly data?: Readonly<{
    token: string;
    email: string;
  }>;
}

export interface IHistoryResponse extends IServerResponseData {
  data?: {
    id: number,
    date: Date,
    status: Status,
    files: File,
  }[];
};