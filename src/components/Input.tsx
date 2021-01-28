import React from 'react';
import { Input as InputAnt} from 'antd';
import { InputProps } from 'antd/lib/input';

const Input: React.FC<InputProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <InputAnt {...props} />
  );
};

export default Input;