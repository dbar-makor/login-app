import { IDBDocument } from './db-document';

export interface IUser {
  readonly email: string;
}

export interface IDBUser extends IDBDocument, IUser { }