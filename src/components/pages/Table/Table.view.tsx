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
  readonly hitoryState: IHistory | null;
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
  readonly currentSelectedRowIdState: string;
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
        {props.hitoryState?.reports.map((history, idx) => {
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
                    {props.downloadLoadingState && props.currentSelectedRowIdState === history.id ?
                      <Tooltip title={<h1 style={{ fontSize: '17px' }}>Loading</h1>} placement="left" arrow>
                        <CircularProgress color="inherit" />
                      </Tooltip> :
                      <MSvg
                        name='download'
                        className={classes['svgContainerBlack']} 
                        onClick={() => props.onDownload(history.id!)}
                      />
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
                          <p className={classes['buttonWrapper__text']}>STEP 1: UPLOAD</p>
                        </label>
                      </Button>
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
                                  className={classes['svgModalRed']}
                                />
                              <p className={classes['buttonWrapper__unclickableText']}>STEP 2: RUN</p>
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
                            <p className={classes['buttonWrapper__text']}>STEP 2: RUN</p>
                          </label>
                        </Button>
                      }
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