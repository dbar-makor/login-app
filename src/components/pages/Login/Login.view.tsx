import React from 'react';

import Input from '../../ui/Input/Input';

import icons from '../../../assets/icons';

import classes from './Login.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly uesrname: string;
  readonly password: string;
  readonly error: boolean;
  readonly emailChangeHandler: (value: string) => void;
  readonly passwordChangeHandler: (value: string) => void;
  readonly submitHandler: (e: React.FormEvent) => void;
}

const LoginView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  
  return (
    <div className={classes['outerContainer']}>
        <div className={classes['formContainer']}>
          <form className={classes['form']} onSubmit={props.submitHandler}>
            <h1 className={classes['form__header']}>Sign-In</h1>
            <Input
              placeholder='Username'
              value={props.uesrname}
              changeHandler={props.emailChangeHandler}
              type='text'
            />
            <Input
              placeholder='Password'
              value={props.password}
              changeHandler={props.passwordChangeHandler}
              type='password'
            />
            <button
              className={classes['form__button']}
              type='button'
              onClick={props.submitHandler}>
              Sign-In
            </button>
            {props.error === true && (
              <span className={classes['form__error']}>Wrong username or pasword</span>
            )}
          </form>
        </div>
    </div>
  );
};

LoginView.displayName = 'LoginView';
LoginView.defaultProps = {};

export default LoginView;
