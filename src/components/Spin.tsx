import React from 'react';
import { Spin as SpinAnt} from 'antd';
import { SpinProps } from 'antd/lib/spin';

const Spin: React.FC<SpinProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SpinAnt {...props} />
  );
};

export default Spin;