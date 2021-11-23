import { Link } from 'react-router-dom';
import React from 'react';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import { IHistory } from '../../../models/history';

import classes from './Table.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly history: IHistory[] | null;
}

const LoginView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes['outerContainer']}>
      <div className={classes['titlesContainer']}>
        <span className={classes['titlesContainer__title']}>Date</span>
        <span className={classes['titlesContainer__title']}>Status</span>
        <span className={classes['titlesContainer__title']}>Actions</span>
      </div>
      <hr />
      <div className={classes['historyContainer']}>
        <span className={classes['historyContainer__date']}>22/11/2021</span>
        <span className={classes['historyContainer__status']}>
          <MSvg
            name='checkMark'
            className={classes['svgContainer']} 
          />
          {/* <MSvg
            name='error'
            className={classes['svgContainer']} 
          /> */}
        </span>
        <span className={classes['historyContainer__options']}>
          <span className={classes['historyContainer__svgWrapper']}>
            <MSvg
              name='download'
              className={classes['svgContainer']} 
            />
          </span>
          <span className={classes['historyContainer__svgWrapper']}>
            <MSvg
              name='cloud'
              className={classes['svgContainer']} 
            />
          </span>
          <MSvg
            name='again'
            className={classes['svgContainer']} 
          />
        </span>
      </div>
    </div>
  );
};

LoginView.displayName = 'LoginView';
LoginView.defaultProps = {};

export default LoginView;
