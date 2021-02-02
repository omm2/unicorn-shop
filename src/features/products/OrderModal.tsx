import React from 'react';
// TODO create a component wrapper arounf Table
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Modal from '../../components/Modal';
import { Product } from './productsSlice';
import Price from '../../components/Price';

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
  const { products, isModalVisible, handleModalOk, handleModalCancel } = props

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
  
  const data: ProductTableItem[] = products.map((product) => ({
    key: product.guid,
    name: product.name,
    price: product.price
  }))
  
  return (
    <Modal title="Are you sure you want create an order?" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
      <Table<ProductTableItem> columns={columns} dataSource={data} pagination={false} />
    </Modal>
  );
};

export default ProductCard;
