import React from 'react';
import { Button as ButtonAnt } from 'antd';
import { ButtonProps } from 'antd/lib/button';

const Button: React.FC<ButtonProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonAnt {...props} />
  );
};

export default Button;