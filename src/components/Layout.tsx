import React from 'react';
import { Layout as LayoutAnt } from 'antd';
import { LayoutProps } from 'antd/lib/layout';
import { BasicProps } from 'antd/lib/layout/layout';

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LayoutAnt {...props} />
  );
};

const Header: React.FC<BasicProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LayoutAnt.Header {...props} />
  );
};

const Footer: React.FC<BasicProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LayoutAnt.Footer {...props} />
  );
};

const Content: React.FC<BasicProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LayoutAnt.Content {...props} />
  );
};

export { Layout, Header, Footer, Content };