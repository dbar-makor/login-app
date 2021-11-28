import React, { ChangeEvent } from 'react';

import moment from 'moment';

import MSvg from '../../ui/MSvg/MSvg';

import icons from '../../../assets/icons';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

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
                  />
                }
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
                      <Tooltip title={<h1 style={{ fontSize: '17px' }}>Loading</h1>} placement="left" arrow>
                        <CircularProgress color="inherit" />
                      </Tooltip>
                    }
                  </Button>
                </span>
                {history.status === Status.Failed ?  
                  <Button onClick={props.handleModalOpen}>
                    <MSvg
                      name='popup'
                      className={classes['svgContainerBlack']} 
                    />
                  </Button> :
                  <Tooltip 
                    title={<h1 style={{ fontSize: '17px' }}>No actions to proform</h1>} 
                    placement="right" 
                    arrow
                  >
                    <Button className={classes['openModal']}>
                      <MSvg
                        name='popup'
                        className={classes['svgContainerGrey']} 
                      />
                    </Button>
                  </Tooltip>
                }
                <Modal
                  open={props.openModalState}
                  onClose={props.handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes['boxContainer']}>
                    <div className={classes['buttonWrapper']}>
                      {!props.checkUploadState ? 
                        <Tooltip 
                          title={<h1 style={{ fontSize: '17px' }}>Unable to run, no file uploaded</h1>} 
                          placement="top" 
                          arrow
                        >
                          <Button className={classes['buttonWrapper__button']}>
                            <label className={classes['buttonWrapper__label']}>
                                <MSvg
                                  name='run'
                                  className={classes['svgModalGrey']}
                                />
                              <p className={classes['buttonWrapper__unclickableText']}>RUN</p>
                            </label>
                          </Button>
                        </Tooltip> :
                        <Button onClick={props.onRun} className={classes['buttonWrapper__button']}>
                          <label className={classes['buttonWrapper__label']}>
                            {!props.runLoadingState ? 
                              <MSvg
                                name='run'
                                className={classes['svgModal']}
                              /> :
                              <Tooltip 
                                title={<h1 style={{ fontSize: '17px' }}>Loading</h1>} 
                                placement="top" 
                                arrow
                              >
                              <CircularProgress color="inherit" size={80}/>
                              </Tooltip>
                            }
                            <p className={classes['buttonWrapper__text']}>RUN</p>
                          </label>
                        </Button>
                      }
                      <Button type='button' className={classes['buttonWrapper__button']}>
                        <label className={classes['buttonWrapper__label']}>
                          {!props.uploadLoadingState ?
                            <label className={classes['buttonWrapper__label']}>
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
                            <Tooltip 
                              title={<h1 style={{ fontSize: '17px' }}>Loading</h1>} 
                              placement="top" 
                              arrow
                            >
                              <CircularProgress color="inherit" size={80}/>
                            </Tooltip>
                          }
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