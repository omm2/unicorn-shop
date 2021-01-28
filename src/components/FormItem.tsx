import React from 'react';
import { Form as FormAnt} from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';

const FormItem: React.FC<FormItemProps> = (props) => {
  return (
    // disable rule since in this case we are building a wrapper around ant component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormAnt.Item {...props} />
  );
};

export default FormItem;