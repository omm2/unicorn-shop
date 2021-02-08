import React from 'react';
import { useSelector } from 'react-redux';
// TODO create a component wrapper arounf Table
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { ordersSelector } from './ordersSlice';
import Alert from '../../components/Alert';
import OrderDate from '../../components/OrderDate';
import { Title } from '../../components/Typography';

const useStyles = createUseStyles({
  wrapper: {
    'maxWidth': 700
  }
});

interface OrderTableItem {
  id: number;
  date: number;
}

const Orders: React.FC = () => {
  const classes = useStyles();
  const { error, data } = useSelector(ordersSelector);

  const errorAlert = error && (
    <Alert message="Sorry, something went wrong." type="error" />
  );

  const columns: ColumnsType<OrderTableItem> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <div data-testid='row'>`#${id}`</div>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: number) => <OrderDate date={date} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Link to={`/order/${record.id}`}>Details</Link>
      )
    }
  ];

  const tableData: OrderTableItem[] = data.map((order)=> ({
    id: order.id,
    key: order.id,
    date: order.date
  }));

  return (
    <>
      <Title level={2}>Your Orders</Title>
      {errorAlert}
      {
        !!data.length &&
        <div className={classes.wrapper}>
          <Table<OrderTableItem>
            columns={columns}
            dataSource={tableData}
            pagination={false}
            bordered
          />
        </div>
      }
    </>
  );
};

export default Orders;
