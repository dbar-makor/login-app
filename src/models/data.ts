import { Status } from "./shared/enumerations";

export interface IHistory {
    id?: number,
    date?: Date,
    status?: Status,
    files?: File,
};