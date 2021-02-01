import React from 'react'
import { createUseStyles } from 'react-jss'
import { Product } from './productsSlice';
import Button from '../../components/Button'
import Card from '../../components/Card'

const useStyles = createUseStyles({
  card: {
    margin: '1vmin 1vmin 1vmin 0',
  },
  cardSelected: {
    backgroundColor: '#f0f0f0'
  }
})

type ProductCardProps = {
  key: string;
  handleClick: (id: string) => void;
  product: Product;
  selected: boolean;
};

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const classes = useStyles()
  const { product, selected } = props
  const button = <Button type="primary" onClick={() => props.handleClick(product.guid)}>{ selected ? 'Unselect' : 'Select' }</Button>
  return (
    <Card
      className={`${classes.card} ${selected && classes.cardSelected}`}
      size="small"
      title={product.name}
      extra={button} style={{ width: 250 }}>
      <p>{product.description}</p>
    </Card>
  )
};

export default ProductCard;
