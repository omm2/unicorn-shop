import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { Redirect } from 'react-router-dom'
import { fetchProducts, productsSelector } from './productsSlice'
import { loginSelector } from '../login/loginSlice'
import { createOrder } from '../orders/ordersSlice'
import ProductCard from './ProductCard'
import OrderModal from './OrderModal'
import Button from '../../components/Button'
import Spin from '../../components/Spin'
import Alert from '../../components/Alert'

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  spinWrapper: {
    textAlign: 'center',
    margin: '20px 0',
  },
  productsHeader: {
    color: '#4dabf7',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '1vmin 0',
    minHeight: '35px',
  },
  note: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3vmin',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: '1vmin',
  }
})

const Products: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector(productsSelector)
  const { token } = useSelector(loginSelector)
  const [selectedIds, setSelectedIds] = useState<Array<string>>([])
  const [orderCreated, setOrderCreated] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts(token))
  }, [dispatch])


  function handleClick(id: string) {
    let ids;
    if (selectedIds.includes(id)) {
      ids = selectedIds.filter(selectedId => selectedId !== id);
    } else {
      ids = [...selectedIds, id];
    }
    setSelectedIds(ids);
  }

  function getSelectedProducts() {
    return data.filter(item => {
      return selectedIds.includes(item.guid)
    })
  }

  function handleCreateOrder() {
    setIsModalVisible(true);
  }

  function handleDeselectAll() {
    setSelectedIds([])
  }

  function handleModalOk() {
    dispatch(createOrder(getSelectedProducts()));
    setSelectedIds([])
    setOrderCreated(true)
  }

  function handleModalCancel() {
    setIsModalVisible(false);
  }

  const listProducts = data.map(product => {
    return <ProductCard
      key={product.guid}
      handleClick={handleClick}
      product={product}
      selected={selectedIds.includes(product.guid)}
    />
  })

  const spin = loading && (
    <div className={classes.spinWrapper}>
      <Spin size="large" />
    </div>
  )
  const errorAlert = error && (
    <Alert message="Sorry, something went wrong." type="error" />
  )
  const productsHeader = (
    <div className={classes.productsHeader}>
      <div className={classes.note}>Items Selected: <span>{selectedIds.length}</span></div>
      {(selectedIds.length > 0) &&
        <div className={classes.buttonsWrapper}>
          <Button className={classes.button} onClick={handleDeselectAll}>Deselect All</Button>
          <Button className={classes.button} type="primary" onClick={handleCreateOrder}>Create an order</Button>
          <OrderModal
            products={getSelectedProducts()}
            isModalVisible={isModalVisible}
            handleModalOk={handleModalOk}
            handleModalCancel={handleModalCancel}
          />
        </div>
      }
    </div> 
  )

  if (orderCreated) {
    return <Redirect to='/orders' />
  }

  return (
    <div>
      {spin}
      {errorAlert}
      {
        !!data.length &&
        <div>
          {productsHeader}
          <div className={classes.wrapper}>
            {listProducts}
          </div>
        </div>
      }
    </div>
  );
};

export default Products;
