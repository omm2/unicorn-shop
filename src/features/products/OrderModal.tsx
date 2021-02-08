import React from 'react';
// TODO create a component wrapper arounf Table
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { createUseStyles } from 'react-jss';
import Modal from '../../components/Modal';
import { Product } from './productsSlice';
import Price from '../../components/Price';
import { getTotal } from '../../utils';

const useStyles = createUseStyles({
  summery: {
    fontWeight: '800'
  }
});

type OrderModalProps = {
  products: Array<Product>;
  isModalVisible: boolean;
  handleModalOk: () => void;
  handleModalCancel: () => void;
};

interface ProductTableItem {
  key: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<OrderModalProps> = (props: OrderModalProps) => {
  const classes = useStyles();
  const { products, isModalVisible, handleModalOk, handleModalCancel } = props;
  const total = getTotal(products);

  const columns: ColumnsType<ProductTableItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Price price={price} />
    }
  ];

  const data: ProductTableItem[] = products.map((product) => ({
    key: product.guid,
    name: product.name,
    price: product.price
  }));

  return (
    <Modal title="Are you sure you want to create an order?" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
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
        );}}
      />
    </Modal>
  );
};

export default ProductCard;
