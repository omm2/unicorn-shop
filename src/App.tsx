import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Layout, Footer, Content } from './components/Layout';
import HeaderApp from './Header';
import { loginSelector } from './features/login/loginSlice';
import Login from './features/login/Login';
import Products from './features/products/Products';
import Orders from './features/orders/Orders';
import Order from './features/orders/Order';
import jss from './jss';

const useStyles = createUseStyles({
  layout: {
    background: jss.colors.white,
    display: 'flex',
    minHeight: '100vh',
    margin: 0
  },
  content: {
    maxWidth: 1200,
    minHeight: '280px',
    padding: '24px'
  },
  footer: {
    marginTop: 'auto'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Router>
      <Layout className={classes.layout}>
        <HeaderApp />
        <Content className={classes.content}>
          <Switch>
            <PrivateRoute path="/orders">
              <Orders/>
            </PrivateRoute>
            <PrivateRoute path="/order/:id">
              <Order/>
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/">
              <Products/>
            </PrivateRoute>
          </Switch>
        </Content>
        <Footer className={classes.footer}>Choco Shop ©2021 Created by Ganna Pavlova</Footer>
      </Layout>
    </Router>
  );
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { token } = useSelector(loginSelector);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default App;
