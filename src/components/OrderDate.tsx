import React from 'react';

type DateProps = {
  date: number;
};

const OrderDate: React.VFC<DateProps> = (props: DateProps) => {
  const { date } = props;
  const orderDate = new Date(date);
  const dateStr = orderDate.toLocaleDateString('de-DE');
  const timeStr = orderDate.toLocaleTimeString('de-DE');
  return (
    <span>{ `${dateStr} ${timeStr}` }</span>
  );
};

export default OrderDate;
