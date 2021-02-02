import React from 'react';

type DateProps = {
  date: number;
};

const OrderDate: React.FC<DateProps> = (props: DateProps) => {
  const { date } = props
  const orderDate = new Date(date) 
  const dateObj = orderDate.toLocaleDateString('de-DE')
  const timeObj = orderDate.toLocaleTimeString('de-DE')
  return (
    <span>{ `${dateObj} ${timeObj}` }</span>
  );
};

export default OrderDate;