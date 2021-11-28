import React, { ChangeEvent, useState } from 'react';

import moment from 'moment';

import MSvg from '../MSvg/MSvg';

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
  readonly hitoryState: IHistory | null;
  readonly onDownload: (reportId: string) => void;
  readonly downloadLoadingState: boolean;
  readonly setDownloadLoadingState: boolean;
}

const RunButtonView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ downloadLoadingState, setDownloadLoadingState ] = useState<boolean>(false);

  return (
    <div className={classes['outerContainer']}>
      {props.hitoryState?.reports.map((history, idx) => {
        return (
          <div className={classes['historyContainer']} key={idx}>
            <div className={classes['historyContainer__options']}>
              <span className={classes['historyContainer__svgWrapper']}>
                <Button>
                  {!props.downloadLoadingState ?
                      <MSvg
                        name='download'
                        className={classes['svgContainerBlack']} 
                        onClick={() => {
                          setDownloadLoadingState(true)
                          props.onDownload(history.id!).finally(() => setDownloadLoadingState(true))
                          }
                        }
                      /> :
                    <Tooltip title={<h1 style={{ fontSize: '17px' }}>Loading</h1>} placement="left" arrow>
                      <CircularProgress color="inherit" />
                    </Tooltip>
                  }
                </Button>
              </span>
            </div>
          </div>
        )
      })}
    </div>
  );
};

RunButtonView.displayName = 'RunButtonView';
RunButtonView.defaultProps = {};

export default RunButtonView;