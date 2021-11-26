import React, { ChangeEvent } from 'react';

import moment from 'moment';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';

import { IHistory } from '../../../models/history';

import { Status } from '../../../models/shared/enum';

import classes from './Table.module.scss';

interface Props {
  readonly iconName?: keyof typeof icons;
  readonly history: IHistory | null;
  readonly onDownload: (reportId: string) => void;
  readonly onRun: () => void;
  readonly onUpload: (value: ChangeEvent<HTMLInputElement>) => void;
  readonly openModalState: boolean;
  readonly handleModalOpen: () => void;
  readonly handleModalClose: () => void;
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
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Success,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Success,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Success,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Success,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Failed,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
      {
        "id": "13a5764e-4d0b-11ec-a58b-9c7bef452fa0",
        "status": Status.Success,
        "created_at": '2021-11-24T09:44:11.000Z'
      },
    ],
}

const TableView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
   const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div className={classes['outerContainer']}>
      <div className={classes['titlesContainer']}>
        <span className={classes['titlesContainer__title']}>Date</span>
        <span className={classes['titlesContainer__title']}>Status</span>
        <span className={classes['titlesContainer__title']}>Actions</span>
      </div>
      <hr />
        {history?.reports.map((history, idx) => {
          return (
            <div className={classes['historyContainer']} key={idx}>
              <span className={classes['historyContainer__date']}>
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
                <span className={classes['historyContainer__svgWrapper']}>
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
                {history.status === Status.Failed ?  
                  <Button onClick={props.handleModalOpen}>
                    <MSvg
                      name='popup'
                      className={classes['svgContainerBlack']} 
                    />
                  </Button> :
                  <Button className={classes['openModal']}>
                    <MSvg
                      name='popup'
                      className={classes['svgContainerGrey']} 
                    />
                  </Button>}
                <Modal
                  open={props.openModalState}
                  onClose={props.handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes['boxContainer']}>
                    <div className={classes['buttonWrapper']}>
                      {!props.checkUploadState ? 
                        <Button className={classes['buttonWrapper__button']}>
                          <label className={classes['buttonWrapper__label']}>
                              <MSvg
                                name='run'
                                className={classes['svgModal']}
                              />
                            <p className={classes['buttonWrapper__text']}>RUgergergN</p>
                          </label>
                        </Button> :
                        <Button onClick={props.onRun} className={classes['buttonWrapper__button']}>
                          <label className={classes['buttonWrapper__label']}>
                            {!props.runLoadingState ? 
                              <MSvg
                                name='run'
                                className={classes['svgModal']}
                              /> :
                              <CircularProgress className={classes['spinner']} color="inherit" size={80}/>}
                            <p className={classes['buttonWrapper__text']}>RUN</p>
                          </label>
                        </Button>}
                      <Button type='button' className={classes['buttonWrapper__button']}>
                        <label>
                          {!props.uploadLoadingState ?
                          <label>
                            <input 
                              type='file'
                              accept='.csv'
                              onChange={props.onUpload}
                            />
                            <MSvg
                              name='upload'
                              className={classes['svgModal']} 
                            /> 
                          </label> :
                          <CircularProgress className={classes['spinner']} color="inherit" size={80} />}
                          <p className={classes['buttonWrapper__text']}>UPLOAD</p>
                        </label>
                      </Button>
                    </div>
                  </Box>
                </Modal>
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