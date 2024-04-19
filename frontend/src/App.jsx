import React from "react";
import { Routes, Route } from "react-router-dom";
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
import CreateRentHisPage from "./pages/CreateRentHis.page";
import DeleteRentHisPage from "./pages/DeleteRentHis.page";
import EditRentHisPage from "./pages/EditRentHis.page";
import HomeRentHisPage from "./pages/HomeRentHis.page";
import ShowRentHisPage from "./pages/ShowRentHis.page";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Layout>
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
        <Route path="/" element={<HomeRentHisPage />} />
        <Route path="/rents/createHis" element={<CreateRentHisPage />} />
        <Route path="/rents/detailsHis/:id" element={<ShowRentHisPage />} />
        <Route path="rents/editHis/:id" element={<EditRentHisPage />} />
        <Route path="rents/deleteHis/:id" element={<DeleteRentHisPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
