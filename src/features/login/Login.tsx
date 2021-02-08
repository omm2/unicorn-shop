import React, { useEffect } from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { login, loginSelector } from './loginSlice';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const useStyles = createUseStyles({
  error: {
    margin: '3vmin'
  }
});

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // TODO add loading, error UI
  const { loading, error, token } = useSelector(loginSelector);
  const history = useHistory();
  const location = useLocation<LocationState>();

  useEffect(() => {
    if (token) {
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    }
  });

  const onFinish = (values: any) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const errorAlert = error && (
    <Alert
      className={classes.error}
      message="Sorry, something went wrong."
      type="error"
    />
  );

  return (
    <>
      {errorAlert}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormItem
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" aria-label="email-input" />
        </FormItem>

        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <InputPassword type="password" aria-label="password-input" />
        </FormItem>

        <FormItem wrapperCol={{ span: 8, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default Login;
