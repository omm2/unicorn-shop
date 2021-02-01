import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { fetchProducts, productsSelector } from './productsSlice'
import { loginSelector } from '../login/loginSlice'
import ProductCard from './ProductCard'
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

  useEffect(() => {
    dispatch(fetchProducts(token))
  }, [dispatch])


  function handleClick(id: string) {
    let ids
    if (selectedIds.includes(id)) {
      ids = selectedIds.filter(selectedId => selectedId !== id)
    } else {
      ids = [...selectedIds, id]
    }
    setSelectedIds(ids)
  }

  function createOrder() {
  }

  function deselectAll() {
    setSelectedIds([])
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
          <Button className={classes.button} onClick={deselectAll}>Deselect All</Button>
          <Button className={classes.button} type="primary" onClick={createOrder}>Create Order</Button>
        </div>
      }
    </div> 
  )

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
