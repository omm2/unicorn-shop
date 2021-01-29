import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, productsSelector } from './productsSlice'
import { loginSelector } from '../login/loginSlice'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector(productsSelector)
  const { token } = useSelector(loginSelector)
  console.log(loading, error, data)

  useEffect(() => {
    dispatch(fetchProducts(token))
  }, [dispatch])

  return (
    <div>Products</div>
  );
};

export default Products;
