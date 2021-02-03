import React from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Header } from './components/Layout';
import Menu, { MenuItem } from './components/Menu';

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
  return (
    <Header className={classes.header}>
      <Link to="/"><span className={classes.headerIcon} aria-label="wave" role="img">🦄</span>Choco Shop</Link>
      <Menu
        defaultSelectedKeys={[]}
        selectedKeys={ location.pathname === '/orders'? ['1'] : []}
        className={classes.menu}
        theme="dark"
        mode="horizontal"
      >
        <MenuItem key="1"><Link to="/orders">Orders</Link></MenuItem>
      </Menu>
    </Header>
  );
};


export default HeaderApp;