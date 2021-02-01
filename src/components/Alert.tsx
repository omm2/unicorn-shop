import React from 'react';
import { Alert as AlertAnt} from 'antd';
import { AlertProps } from 'antd/lib/alert';

const Alert: React.FC<AlertProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AlertAnt {...props} />
  );
};

export default Alert;