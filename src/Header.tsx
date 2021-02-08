import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { logout, loginSelector } from './features/login/loginSlice';
import { Header } from './components/Layout';
import Menu, { MenuItem } from './components/Menu';
import Button from './components/Button';

const useStyles = createUseStyles({
  header: {
    color: '#fff',
    display: 'flex'
  },
  menu: {
    marginLeft: '3vmin'
  },
  headerIcon: {
    paddingRight: '1em'
  },
  button: {
    alignSelf: 'center',
    marginLeft: 'auto'
  },
  home: {
    overflow: 'hidden'
  }
});

interface LocationState {
  from: {
    pathname: string;
  };
}

const HeaderApp: React.FC = () => {
  const classes = useStyles();
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();
  const { token } = useSelector(loginSelector);
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <Header className={classes.header}>
      <Link className={classes.home} to="/"><span className={classes.headerIcon} aria-label="wave" role="img">🦄</span>Choco Shop</Link>
      <Menu
        defaultSelectedKeys={[]}
        selectedKeys={ location.pathname === '/orders'? ['1'] : []}
        className={classes.menu}
        theme="dark"
        mode="horizontal"
      >
        <MenuItem key="1"><Link to="/orders">Orders</Link></MenuItem>
      </Menu>
      { token && <Button className={classes.button} type="primary" onClick={handleLogout}>Logout</Button> }
    </Header>
  );
};


export default HeaderApp;
