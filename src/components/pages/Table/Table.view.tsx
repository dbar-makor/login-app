import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import moment from 'moment';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import { Modal, Button, Box } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

import { IHistory } from '../../../models/history';

import { Status } from '../../../models/shared/enum';

import classes from './Table.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly history: IHistory | null;
  readonly onDownload: (reportId: string) => void;
  readonly onRun: () => void;
  readonly fileChangeHandler: (value: ChangeEvent<HTMLInputElement>) => void;
  readonly openState: boolean;
  readonly handleOpen: () => void;
  readonly handleClose: () => void;
  readonly downloadLoadingState: boolean;
  readonly runLoadingState: boolean;
  readonly uploadLoadingState: boolean;
  readonly checkUploadState: boolean;
}

const history: IHistory = {
        "reports": [
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '24/11/2022'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Success,
        "created_at": '24/11/2022'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '24/11/2022'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '24/11/2022'
      },
    ],
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
        {props.history?.reports.map((history) => {
          return (
            <div className={classes['historyContainer']}>
              <span className={classes['historyContainer__date']} key={history.id}>
                {moment(history.created_at).format('DD/MM/YYYY')}
              </span>
              <span className={classes['historyContainer__status']}>
                {history.status === Status.Success ?
                <MSvg
                  name='checkMark'
                  className={classes['svgContainerCheck']} 
                /> :
                <MSvg
                  name='error'
                  className={classes['svgContainerCheck']} 
                />}
              </span>
              <div className={classes['historyContainer__options']}>
                <span className={classes['historyContainer__svgWrapper']} key={history.id}>
                  <Button>
                    {!props.downloadLoadingState ? 
                      <MSvg
                        name='download'
                        className={classes['svgContainerBlack']} 
                        onClick={() => props.onDownload(history.id!)}
                      /> :
                      <CircularProgress className={classes['spinner']} color="inherit" />}
                  </Button>
                </span>
                <Button className={classes['openModal']} onClick={props.handleOpen}>
                  <MSvg
                    name='popup'
                    className={classes['svgContainerBlack']} 
                  />
                </Button>
                {history.status === Status.Failed ?
                <Modal
                  open={props.openState}
                  onClose={props.handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >   
                  <Box className={classes['boxContainer']}>
                    <div className={classes['buttonWrapper']}>
                      {props.checkUploadState ? !props.runLoadingState ?
                        <Button 
                          onClick={props.onRun}
                          className={classes['buttonWrapper__button']}
                        >
                          <label>
                            <MSvg
                              name='run'
                              className={classes['svgModal']}
                            />
                            <p className={classes['buttonWrapper__text']}>RUN</p>
                          </label>
                        </Button> :
                        <div className={classes['spinnerWraper']}>
                          <CircularProgress className={classes['spinnerWraper__spinner']} color="inherit" />
                        </div> : 
                        <Button className={classes['buttonWrapper__unclickableButton']}>
                          <label>
                            <MSvg
                              name='run'
                              className={classes['svgModalGrey']}
                            />
                            <p className={classes['buttonWrapper__unclickableText']}>RUN</p>
                          </label>
                        </Button>}
                      {!props.uploadLoadingState ?
                        <Button 
                          type='button'
                          className={classes['buttonWrapper__button']}
                        >
                          <label>
                            <input 
                              type='file'
                              accept='.csv'
                              onChange={props.fileChangeHandler}
                            />
                            <MSvg
                              name='upload'
                              className={classes['svgModal']} 
                            />
                            <p className={classes['buttonWrapper__text']}>UPLOAD</p>
                          </label>
                        </Button> :
                      <div className={classes['spinnerWraper']}>
                        <CircularProgress className={classes['spinnerWraper__spinner']} color="inherit" style={{ alignSelf: 'center' }} />
                      </div>}
                    </div>
                  </Box>
                </Modal> :
                <MSvg
                  name='popup'
                  className={classes['svgContainerGrey']} 
                />}
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