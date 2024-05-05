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
          <Typography.Text>
            Email: <strong>{userData.email}</strong>
          </Typography.Text>
          <Typography.Text>
            Role: <strong>{userData.role}</strong>
          </Typography.Text>
          <div className="flex justify-between space-x-8">
            <Link to="/request-management">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Request Management
              </button>
            </Link>

            <Link to="/insurancedashboard">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Insurance Dashboard
              </button>
            </Link>

            <Link to="/licensedashboard">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                License Dashboard
              </button>
            </Link>
            <br />
            <Link to="/rentHome">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                User Rentals
              </button>
            </Link>
            <Link to="/recordHome">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Vehicle Maintenance
              </button>
            </Link>

            <Link to="/admin">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                User Payments
              </button>
            </Link>

            <Link to="/offers/home">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Offers Management
              </button>
            </Link>
            <Link to="/feedbacks/home">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Feedback Management
              </button>
            </Link>

            <Link to="/vehicle-details">
              <button className="rounded bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">
                Vehicle Details
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
