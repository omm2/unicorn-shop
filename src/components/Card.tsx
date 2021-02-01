import React from 'react';
import { Card as CardAnt} from 'antd';
import { CardProps } from 'antd/lib/card';

export const { Meta } = CardAnt;

const Card: React.FC<CardProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CardAnt {...props} />
  );
};

export default Card;