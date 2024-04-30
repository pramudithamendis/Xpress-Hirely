import React from "react";
import { Avatar, Button, Card, Flex, Typography } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };
  return (
    <div className="px-40 py-16">
      <Card className="profile-card">
        <Flex vertical gap="small" align="center">
          <Avatar size={150} icon={<UserOutlined />} className="avatar" />
          <Typography.Title level={2} strong className="username">
            {userData.name}
          </Typography.Title>
          <Typography.Text type="secondary" strong>
            Email: {userData.email}
          </Typography.Text>
          <Typography.Text type="secondary" strong>
            Role: {userData.role}
          </Typography.Text>
          <div className="flex justify-between space-x-8">
            <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
              My Rentals
            </button>
            <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
              Payment Details
            </button>
          </div>
          <Button
            size="large"
            type="primary"
            className="profile-btn"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default Dashboard;
