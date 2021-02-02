import React from 'react'
import { useSelector } from 'react-redux'
// TODO create a component wrapper arounf Table
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store'
import Alert from '../../components/Alert';
import OrderDate from '../../components/OrderDate';
import Price from '../../components/Price';
import { Title, Text } from '../../components/Typography';

const useStyles = createUseStyles({
  summery: {
    fontWeight: '800',
  },
  date: {
    padding: '1vmin 0',
  },
  products: {
    padding: '1vmin 0',
  }
})

interface ProductTableItem {
  key: string;
  name: string;
  price: number;
}

interface RouteParams {
  id: string
}

const Order: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<RouteParams>();
  const order = useSelector((state: RootState) => state.orders.data.find(orderItem => orderItem.id.toString(10) === id))

  if(!order) {
    return <Alert message="Sorry, something went wrong." type="error" />
  }

  const total = order.products
    .map(item => item.price)
    .reduce((accumulator, value) => accumulator + value) 

  const columns: ColumnsType<ProductTableItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Price price={price} />,
    },
  ];
  
  const data: ProductTableItem[] = order.products.map((product) => ({
    key: product.guid,
    name: product.name,
    price: product.price
  }))

  return (
    <div>
      <Title level={2}>Order #{order.id}</Title>
      <Text type="secondary"><OrderDate date={order.date} /></Text>
      <div className={classes.products}>Products in your order:</div>
      <div>
        <Table<ProductTableItem> 
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          showHeader={false}
          summary={() => {
            return (
            <Table.Summary.Row className={classes.summery}>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}><Price price={total} /></Table.Summary.Cell>
            </Table.Summary.Row>
          )}}
        />
      </div>
    </div>
  );
};

export default Order;
