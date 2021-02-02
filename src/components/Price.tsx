import React from 'react';
import NumberFormat from 'react-number-format';

type PriceProps = {
  price: number;
};

const Price: React.FC<PriceProps> = (props: PriceProps) => {
  const {price} = props
  return (
    <NumberFormat value={price} displayType='text' thousandSeparator prefix='€' />
  );
};

export default Price;