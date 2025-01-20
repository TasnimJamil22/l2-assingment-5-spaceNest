// import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUsersQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/features/hooks";
import { Button, Col, Form, Input, Row } from "antd";

const UserForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  // const user = useAppSelector(useCurrentUser);
  console.log(user);
  const { data } = useGetUsersQuery("");

  type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
  };
  // const users: TUser[] = data?.data ?? [];

  // Filter to get the current logged-in user based on their _id
  const currentUser: TUser | undefined = data?.data?.find(
    (u: TUser) => u.email === user?.email
  );

  return (
    <div>
      {/* here, email is from state and others info are from api */}
      {/* Display the logged-in user's email */}
      <h1 className="text-green-800">Hello,{user?.email} ....</h1>
      <div className="xl:mx-32 ">
        {/* checking if the current user is available */}
        {currentUser ? (
          <Form
            initialValues={{
              email: currentUser.email,
              name: currentUser.name,
              phone: currentUser.phone,
              address: currentUser.address,
            }}
            // onFinish={handleSubmit}
          >
            <Row gutter={16}>
              {/* First row: Email and Name */}
              <Col xs={24} sm={12} lg={12} xl={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}>
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={12} xl={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Second row: Phone and Address */}
              <Col xs={24} sm={12} lg={12} xl={12}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={12} xl={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Checkout
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <p>No user found</p>
        )}
      </div>
    </div>
  );
};

export default UserForm;
