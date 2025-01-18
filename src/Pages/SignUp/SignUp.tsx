import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  address?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignUp = () => {
  return (
    <div className="px-24 mt-20">
      <h2 className="text-4xl font-semiBold text-center py-5">Sign Up</h2>
      <Form
        className="mx-auto  "
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<FieldType>
          label="Name"
          name="username"
          rules={[{ required: true, message: "Please input your name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="phone-number"
          name="phone_number"
          rules={[
            { required: true, message: "Please input your phone number  !" },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="address"
          name="address"
          rules={[{ required: true, message: "Please input your address  !" }]}>
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
