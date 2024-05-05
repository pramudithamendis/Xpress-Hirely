import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import registerImage from "../assets/register.png";
import userSignup from "../hooks/userSignup";

const Register = () => {
  const { loading, error, registerUser } = userSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };
  return (
    <div className="px-80 py-16">
      <Card className="form-container">
        <Flex gap="large" align="center">
          {/* form */}
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className="title">
              Create an account
            </Typography.Title>
            <Typography.Text type="secondary" className="slogan">
              Join for exclusive access!
            </Typography.Text>
            <Form
              layout="vertical"
              onFinish={handleRegister}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Email!",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter your password"
                />
              </Form.Item>
              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="alert"
                />
              )}
              <Form.Item>
                <Button
                  type={`${loading ? "" : "primary"}`}
                  htmlType="submit"
                  size="large"
                  className="btn bg-blue-500"
                >
                  {loading ? <Spin /> : "Create Account"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">
                  <Button size="large" className="btn">
                    Sign In
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>

          {/* Image */}
          <Flex flex={1}>
            <img src={registerImage} alt="Register" className="auth-image" />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Register;
