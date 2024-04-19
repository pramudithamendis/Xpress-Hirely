import React from "react";
import Create from "./pages/Create.jsx";
import Chats from "./pages/Chats.jsx";
import Delete from "./pages/Delete.jsx";
import AChat from "./pages/AChat.jsx";
import Edit from "./pages/Edit.jsx";
import ChatsForAdmin from "./pages/ChatsForAdmin.jsx";
import Homee from "./pages/Homee.jsx";
import AChatForAdmin from "./pages/AChatForAdmin.jsx";
import CreateForAdmin from "./pages/CreateForAdmin.jsx";
import ChatUser from "./pages/ChatUser.jsx";
import ChatUserLogin from "./pages/ChatUserLogin.jsx";
import CreateVehicle from "./pages/CreateVehicle.jsx";
import ChatAdmin from "./pages/ChatAdmin.jsx";
import HomeAdmin from "./pages/HomeAdmin.jsx";
import ChatAdminLogin from "./pages/ChatAdminLogin.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated, userData } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homee />} />{" "}
        {/* this has the signup and signin buttons */}
        <Route path="/chat/create" element={<Create />} />{" "}
        {/* this has the issue creating form */}
        <Route path="/chat/chats" element={<Chats />} />{" "}
        {/* this has all the chats */}
        <Route path="/chat/delete/:id" element={<Delete />} />{" "}
        {/* this has the confirm message to delete an issue */}
        <Route path="/chat/getchat/:id" element={<AChat />} />{" "}
        {/* this is an in detailed page of an issue */}
        <Route path="/chat/edit/:id" element={<Edit />} />{" "}
        {/* this has the form to edit details of an issue */}
        <Route path="/chat/chats/admin" element={<ChatsForAdmin />} />{" "}
        {/* this has all the chats to view as an admin */}
        <Route
          path="/chat/getchat/:id/admin"
          element={<AChatForAdmin />}
        />{" "}
        {/* this is an in detailed page of an issue for an admin */}
        <Route
          path="/chat/create/admin/:id"
          element={<CreateForAdmin />}
        />{" "}
        {/* this has the form to reply as an admin */}
        <Route path="/user/create" element={<ChatUser />} />{" "}
        {/* this has the signup form */}
        <Route path="/user/signin" element={<ChatUserLogin />} />{" "}
        {/* this has the sign in form */}
        <Route path="/vehicle/vehiclecreate" element={<CreateVehicle />} />{" "}
        {/* this has the form to create a vehicle */}
        <Route path="/admin/create" element={<ChatAdmin />} />{" "}
        {/*this has the form to create an admin */}
        <Route path="/home/admin" element={<HomeAdmin />} />{" "}
        {/*this has the sign up and sign in buttons*/}
        <Route path="/admin/signin" element={<ChatAdminLogin />} />{" "}
        {/*this has the sign in form for admins admin */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Register />
            ) : userData.role === "admin" ? (
              <Navigate to="/AdminDashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : userData.role === "admin" ? (
              <Navigate to="/AdminDashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/AdminDashboard"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
