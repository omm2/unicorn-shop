import React from 'react';
import { Modal as ModalAnt } from 'antd';
import { ModalProps } from 'antd/lib/modal';

const Modal: React.FC<ModalProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ModalAnt {...props} />
  );
};

export default Modal;