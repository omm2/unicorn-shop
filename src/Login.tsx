import React from 'react';
import Form from './components/Form'
import FormItem from './components/FormItem'
import Input from './components/Input'
import InputPassword from './components/InputPassword'
import Button from './components/Button'

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <FormItem
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <InputPassword />
      </FormItem>

      <FormItem wrapperCol={{ span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default Login;
