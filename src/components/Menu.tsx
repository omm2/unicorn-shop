import React from 'react';
import { Menu as MenuAnt } from 'antd';
import { MenuProps, MenuItemProps } from 'antd/lib/menu';

const Menu: React.FC<MenuProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MenuAnt {...props} />
  );
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MenuAnt.Item {...props} />
  );
};

export { MenuItem };

export default Menu;