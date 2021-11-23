import React from 'react';

import classes from './FileInput.module.scss';

interface Props {
  readonly changeHandler: (value: File) => void;
  readonly type?: 'file';
  readonly style?: string;
  readonly accept?: string;
  readonly className?: string;
}

const FileInputView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const containerClasses = `${classes['container']}${props.className ? ` ${props.className}` : ''}`;

  let t: File;
  
  return (
    <div className={containerClasses}>
      <input
        className={classes['container__input']}
        onChange={({ currentTarget: { value }}) => props.changeHandler(t)}
        type={props.type ?? 'file'}
        accept={props.accept}
      />
    </div>
  );
};

FileInputView.displayName = 'FileInput';
FileInputView.defaultProps = {};

export default FileInputView;
