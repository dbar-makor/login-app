import React, { ChangeEvent } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import { IHistory } from '../../../models/history';

import { Status } from '../../../models/shared/enum';

import classes from './Table.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly history: IHistory | null;
  download?: string;
  readonly onDownload: () => void;
  readonly onUpload: () => void;
  readonly onRun: () => void;
  readonly fileChangeHandler: (value: ChangeEvent<HTMLInputElement>) => void;
}

const d = new Date();

// const history: IHistory[] = [
  //   {
    //     "reports": [
//       {
//         "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
//         "status": Status.Failed,
//         "created_at": d
//       }
//     ],
//   },
//   {
//     "reports": [
//       {
//         "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
//         "status": Status.Failed,
//         "created_at": d
//       }
//     ],
//   },
//   {
//     "reports": [
//       {
//         "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
//         "status": Status.Failed,
//         "created_at": d
//       }
//     ],
//   },
//   {
//     "reports": [
//       {
//         "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
//         "status": Status.Failed,
//         "created_at": d
//       }
//     ],
//   },
// ];

const TableView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
    <div className={classes['outerContainer']}>
      <div className={classes['titlesContainer']}>
        <span className={classes['titlesContainer__title']}>Date</span>
        <span className={classes['titlesContainer__title']}>Status</span>
        <span className={classes['titlesContainer__title']}>Actions</span>
      </div>
      <hr />
      {props.history?.reports.map((history, idx) => {
        return (
          <div className={classes['historyContainer']}>
            <span className={classes['historyContainer__date']} key={idx}>
              {history.created_at}
            </span>
            <span className={classes['historyContainer__status']}>
              {history.status === Status.Success ?
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
              <span className={classes['historyContainer__svgWrapper']} key={idx}>
                {/* {history.status === Status.Failed ? */}
                  <MSvg
                    name='download'
                    className={classes['svgContainerBlack']} 
                    onClick={()=> {
                      // props.onDownload
                      props.download = history.id;
                    }}
                  /> 
                  {/* <MSvg
                    name='download'
                    className={classes['svgContainerBlack']} 
                    onClick={props.onDownload}
                  />
                } */}
              </span>
              {history.status === Status.Failed ?
                <Popup trigger={
                  <button>
                    <MSvg
                      name='popup'
                      className={classes['svgContainerBlack']} 
                    />
                  </button>} 
                  position='top center'
                  on='hover'
                  mouseLeaveDelay={577500}>
                  <MSvg
                    name='run'
                    className={classes['svgContainerBlack']} 
                    onClick={props.onRun}
                  />
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
                    </label>
                </Popup> :
                <MSvg
                  name='popup'
                  className={classes['svgContainerGrey']} 
                />
              }
            </div>
          </div>
        )
      })}
    </div>
  );
};

TableView.displayName = 'TableView';
TableView.defaultProps = {};

export default TableView;