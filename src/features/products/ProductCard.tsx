import React from 'react';
import { createUseStyles } from 'react-jss';
import { Product } from './productsSlice';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Price from '../../components/Price';
import jss from '../../jss';

const useStyles = createUseStyles({
  card: {
    margin: '1vmin 1vmin 1vmin 0'
  },
  [`@media (min-width: ${jss.minWidthTablet}px)`]: {
    card: {
      flex: '0 1 calc(33% - 1vmin)'
    }
  },
  [`@media (min-width: ${jss.minWidthDesktop}px)`]: {
    card: {
      flex: '0 1 calc(25% - 1vmin)'
    }
  },
  cardSelected: {
    backgroundColor: jss.colors.lightGrey
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  price: {
    fontSize: '20px',
    fontWeight: '800'
  }
});

type ProductCardProps = {
  key: string;
  handleClick: (id: string) => void;
  product: Product;
  selected: boolean;
};

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const classes = useStyles();
  const { product, selected } = props;
  const button = <Button type="primary" onClick={() => props.handleClick(product.guid)}>{ selected ? 'Unselect' : 'Select' }</Button>;
  const title =
    <div className={classes.cardWrapper}>
      <div>{product.name}</div>
      <div className={classes.price}><Price price={product.price} /></div>
    </div>;
  return (
    <Card
      className={`${classes.card} ${selected && classes.cardSelected}`}
      size="small"
      title={title}
      extra={button}
      style={{ width: 250 }}
      role="gridcell"
    >
      {product.description}
    </Card>
  );
};

export default ProductCard;
