import { Histoyr } from '../../models/history';

export const COMPANIES = '[Auth] Logout';
export const COMPANY = '[Auth] Login';

// --- Interface --- //

export interface Companies {
  type: typeof COMPANIES;
  payload: { countries: Country }
}

export interface Company {
  type: typeof COMPANY;
  payload: { user: IUser };
}

export type AuthTypes = Logout | Login;