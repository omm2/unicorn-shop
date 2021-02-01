import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  RouteProps
} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { Layout, Header, Footer, Content } from './components/Layout';
import { loginSelector } from './features/login/loginSlice'
import Login from './features/login/Login';
import Products from './features/products/Products';

const useStyles = createUseStyles({
  layout: {
    display: 'flex',
    minHeight: '100vh',
    margin: 0
  },
  content: {
    minHeight: '280px',
    padding: '24px',
    background: '#fff'
  },
  header: {
    color: '#fff'
  },
  footer: {
    marginTop: 'auto'
  },
  headerIcon: {
    paddingRight: '1em'
  }
})

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <Router>
      <Layout className={classes.layout}>
        <Header className={classes.header}>
          <Link to="/"><span className={classes.headerIcon} aria-label="wave" role="img">🦄</span>Choco Shop</Link>
        </Header>
        <Content className={classes.content}>
          <Switch>
            { /* <Route path="/orders">
              <Orders/>
            </Route>
            <Route path="/order">
              <Order/>
            </Route> */}
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
  const { token } = useSelector(loginSelector)
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
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
