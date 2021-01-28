import React from 'react';
import {createUseStyles} from 'react-jss'
import { Layout, Header, Footer, Content } from './components/Layout';
import Login from './Login';

const useStyles = createUseStyles({
  layout: {
    display: 'flex',
    height: '100vh',
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
    <Layout className={classes.layout}>
      <Header className={classes.header}>
        <span className={classes.headerIcon} aria-label="wave" role="img">🦄</span>Choco Shop
      </Header>
      <Content className={classes.content}>
        <Login/>
      </Content>
      <Footer className={classes.footer}>Choco Shop ©2021 Created by Ganna Pavlova</Footer>
    </Layout>
  );
};

export default App;
