import React, { useState } from 'react';

import FileInputView from './FileInput.view';

interface Props {
  readonly changeHandler: (value: File) => void;
  readonly type?: 'file';
  readonly style?: string;
  readonly accept?: string;
  readonly className?: string;
}

const FileInput: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ raisePlaceholderState, setRaisePlaceholderState ] = useState<boolean>(false);

  const raisePlaceholderHandler = (raised: boolean) => setRaisePlaceholderState(() => raised); 

  return (
    <FileInputView
      changeHandler={props.changeHandler}
      type={props.type}
      accept={props.accept}
      className={props.className}
    >{props.children}</FileInputView>
  );
};

FileInput.displayName = 'FileInput';
FileInput.defaultProps = {};

export default FileInput;
