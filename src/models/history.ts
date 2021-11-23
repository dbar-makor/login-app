import { Status } from "./shared/enum";

export interface IHistory {
    readonly id?: string,
    status?: Status,
    readonly created_at?: Date,
};

export interface ICSV {
    readonly file: string,
};