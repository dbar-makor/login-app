import React, { ChangeEvent, MouseEventHandler } from 'react';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import { IHistory } from '../../../models/history';

import classes from './Table.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly history: IHistory[] | null;
  readonly validityCheck: boolean;
  readonly onDownload: () => void;
  readonly onUpload: () => void;
  readonly onRun: () => void;
  readonly fileChangeHandler: (value: ChangeEvent<HTMLInputElement>) => void;
}

const TableView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
    <div className={classes['outerContainer']}>
      <div className={classes['titlesContainer']}>
        <span className={classes['titlesContainer__title']}>Date</span>
        <span className={classes['titlesContainer__title']}>Status</span>
        <span className={classes['titlesContainer__title']}>Actions</span>
      </div>
      <hr />
      {/* {props.history?.map((index, idx) => {  */}
        {/* return ( */}
          <div className={classes['historyContainer']}>
            <span className={classes['historyContainer__date']}>22/11/2021</span>
            <span className={classes['historyContainer__status']}>
              {props.validityCheck ?
              <MSvg
                name='checkMark'
                className={classes['svgContainer']} 
              /> :
              <MSvg
                name='error'
                className={classes['svgContainer']} 
              />
              }
            </span>
            <span className={classes['historyContainer__options']}>
              <span className={classes['historyContainer__svgWrapper']}>
                  <MSvg
                    name='download'
                    className={classes['svgContainer']} 
                    onClick={props.onDownload}
                  />
              </span>
              <span className={classes['historyContainer__svgWrapper']}>
                <label>
                  <input 
                    type='file'
                    accept='.csv'
                    onChange={props.fileChangeHandler}
                    />
                  <MSvg
                    name='upload'
                    className={classes['svgContainer']} 
                    onClick={props.onUpload}
                  />
                </label>
              </span>
              <label>
                
              </label>
              <MSvg
                name='run'
                className={classes['svgContainer']} 
                onClick={props.onRun}
              />
            </span>
          </div>
        {/* )})} */}
    </div>
  );
};

TableView.displayName = 'TableView';
TableView.defaultProps = {};

export default TableView;