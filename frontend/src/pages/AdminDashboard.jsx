import React from "react";
import { Avatar, Button, Card, Flex, Typography } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
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
            <Link to="/rentHome">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                User Rentals
              </button>
            </Link>
            <Link to="/recordHome">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Vehicle Maintainance
              </button>
            </Link>
            <Link to="/admin">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                User Payments
              </button>
            </Link>
          </div>
          <Button
            size="large"
            type="primary"
            className="profile-btn bg-blue-500"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default AdminDashboard;
