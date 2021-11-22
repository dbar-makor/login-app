import { Link } from 'react-router-dom';
import React from 'react';

import Input from '../../ui/Input/Input';
import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import classes from './Login.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly email: string;
  readonly password: string;
  readonly emailChangeHandler: (value: string) => void;
  readonly passwordChangeHandler: (value: string) => void;
  readonly submitHandler: (e: React.FormEvent) => void;
}

const LoginView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes['outerContainer']}>
        <div className={classes['formContainer']}>
          <form className={classes['form']} onSubmit={props.submitHandler}>
            <h1 className={classes['form__header']}>Sing-In</h1>
            <Input
              placeholder='Email'
              value={props.email}
              changeHandler={props.emailChangeHandler}
            />
            <Input
              placeholder='Password'
              value={props.password}
              changeHandler={props.passwordChangeHandler}
            />
            <button
              className={classes['form__button']}
              type='submit'>
              Sing-In
            </button>  
          </form>
        </div>
    </div>
  );
};

LoginView.displayName = 'LoginView';
LoginView.defaultProps = {};

export default LoginView;
