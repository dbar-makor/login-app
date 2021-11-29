import { Status } from "./shared/enum";

export interface IHistory {
  reports: {
    id?: string;
    status?: Status;
    created_at?: string;
  }[];
};