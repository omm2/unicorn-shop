import React from 'react';
import { Form as FormAnt} from 'antd';
import { FormProps } from 'antd/lib/form';

const Form: React.FC<FormProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormAnt {...props} />
  );
};

export default Form;