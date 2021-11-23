import { Status } from "./shared/enumerations";

export interface IHistory {
    readonly id?: number,
    status?: Status,
    readonly created_at?: Date,
};

export interface ICSV {
    readonly file: string,
};