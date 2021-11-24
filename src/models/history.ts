import { Status } from "./shared/enum";

// export interface IHistory {
//     reports: Readonly<{
//         readonly id?: string,
//         status?: Status,
//         readonly created_at?: Date,
//     }[]>
// };

export interface IHistory {
  reports: {
    id?: string;
    status?: Status;
    created_at?: string;
  }[];
};

export interface ICSV {
    readonly file: string,
};
