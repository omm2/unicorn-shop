import { Product } from './features/products/productsSlice';

export const getTotal = (products: Array<Product>) => products
  .reduce((accumulator, item) => accumulator + item.price, 0);
