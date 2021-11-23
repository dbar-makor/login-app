import React, { ChangeEvent } from 'react';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import { IHistory } from '../../../models/history';

import { Status } from '../../../models/shared/enum';

import classes from './Table.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly history: IHistory[] | null;
  readonly onDownload: () => void;
  readonly onUpload: () => void;
  readonly onRun: () => void;
  readonly fileChangeHandler: (value: ChangeEvent<HTMLInputElement>) => void;
}

const d = new Date();

const history: IHistory[] = [
  {
    id: '4234234',
    status: Status.Failed,
    created_at: d,
  },
  {
    id: '4234234',
    status: Status.Success,
    created_at: d,
  },
  {
    id: '4234234',
    status: Status.Success,
    created_at: d,
  },
  {
    id: '4234234',
    status: Status.Success,
    created_at: d,
  },
  {
    id: '4234234',
    status: Status.Success,
    created_at: d,
  },
  {
    id: '4234234',
    status: Status.Failed,
    created_at: d,
  }
];

const TableView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
    <div className={classes['outerContainer']}>
      <div className={classes['titlesContainer']}>
        <span className={classes['titlesContainer__title']}>Date</span>
        <span className={classes['titlesContainer__title']}>Status</span>
        <span className={classes['titlesContainer__title']}>Actions</span>
      </div>
      <hr />
      {history?.map((index, idx) => { 
        return (
          <div className={classes['historyContainer']}>
            <span 
              className={classes['historyContainer__date']}>
              {`${index.created_at?.getDate()}/${index.created_at?.getMonth()! + 1}/${index.created_at?.getUTCFullYear()}`}
            </span>
            <span className={classes['historyContainer__status']}>
              {index.status === Status.Success ?
                <MSvg
                  name='checkMark'
                  className={classes['svgContainerBlack']} 
                /> :
                <MSvg
                  name='error'
                  className={classes['svgContainerBlack']} 
                />
              }
            </span>
            <div className={classes['historyContainer__options']}>
              <span className={classes['historyContainer__svgWrapper']}>
                  {index.status === Status.Failed ?
                    <MSvg
                      name='download'
                      className={classes['svgContainerBlack']} 
                      onClick={props.onDownload}
                    /> : 
                    <MSvg
                      name='download'
                      className={classes['svgContainerBlack']} 
                      onClick={props.onDownload}
                    />
                  }
              </span>
              <span className={classes['historyContainer__svgWrapper']}>
                  {index.status === Status.Failed ?
                    <label>
                      <input 
                        type='file'
                        accept='.csv'
                        onChange={props.fileChangeHandler}
                        />
                      <MSvg
                        name='upload'
                        className={classes['svgContainerBlack']} 
                        onClick={props.onUpload}
                      />
                    </label> :
                    <label>
                      <MSvg
                        name='upload'
                        className={classes['svgContainerGrey']} 
                      />
                    </label>
                  }
              </span>
              {index.status === Status.Failed ?
                <MSvg
                  name='run'
                  className={classes['svgContainerBlack']} 
                  onClick={props.onRun}
                /> :
                <MSvg
                  name='run'
                  className={classes['svgContainerGrey']} 
                />
              }
            </div>
          </div>
        )})}
    </div>
  );
};

TableView.displayName = 'TableView';
TableView.defaultProps = {};

export default TableView;