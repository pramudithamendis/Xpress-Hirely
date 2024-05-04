import React from "react";

import { Routes, Route } from "react-router-dom";
import Create from "./ChatPages/Create.jsx";
import Chats from "./ChatPages/Chats.jsx";
import Delete from "./ChatPages/Delete.jsx";
import AChat from "./ChatPages/AChat.jsx";
import Edit from "./ChatPages/Edit.jsx";
import ChatsForAdmin from "./ChatPages/ChatsForAdmin.jsx";
import Homee from "./ChatPages/Homee.jsx";
import AChatForAdmin from "./ChatPages/AChatForAdmin.jsx";
import CreateForAdmin from "./ChatPages/CreateForAdmin.jsx";
import ChatUser from "./ChatPages/ChatUser.jsx";
import ChatUserLogin from "./ChatPages/ChatUserLogin.jsx";
import CreateVehicle from "./ChatPages/CreateVehicle.jsx";
import ChatAdmin from "./ChatPages/ChatAdmin.jsx";
import HomeAdmin from "./ChatPages/HomeAdmin.jsx";
import ChatAdminLogin from "./ChatPages/ChatAdminLogin.jsx";

import CreateRentHisPage from "./pages/CreateRentHis.page";
import DeleteRentHisPage from "./pages/DeleteRentHis.page";
import EditRentHisPage from "./pages/EditRentHis.page";
import HomeRentHisPage from "./pages/HomeRentHis.page";
import ShowRentHisPage from "./pages/ShowRentHis.page";
//<<<<<<< piyaraCRUD

import Payments_ClientView from './pages/Payments_ClientView';
import Payments_AdminView from './pages/Payments_AdminView';
import ChoosePaymentOption from './pages/ChoosePaymentOption';

import CreateCardPayment from './pages/CardPayments/CreateCardPayment';
import ShowCardPayment from './pages/CardPayments/ShowCardPayment';

import EditCashPayment from './pages/CashPayments/EditCashPayment';
import CreateCashPayment from './pages/CashPayments/CreateCashPayment';
import ShowCashPayment from './pages/CashPayments/ShowCashPayment';

import EditPaymentMethod from './pages/PaymentMethod/EditPaymentMethod';
import SavePaymentMethod from './pages/PaymentMethod/SavePaymentMethod';
import DeletePaymentMethod from './pages/PaymentMethod/DeletePaymentMethod';
import ShowPaymentMethod from './pages/PaymentMethod/ShowPaymentMethod';

import CreateRequestRefund from './pages/RefundRequests/CreateRequestRefund';
import ShowRefundRequest from './pages/RefundRequests/ShowRefundRequest';
import UpdateRefundRequest from './pages/RefundRequests/UpdateRefundRequest';

import CreateStripePayment from './pages/StripePayments/CreateStripePayment';
import ShowStripePayment from './pages/StripePayments/ShowStripePayment';



//=======
import "./App.css";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./contexts/AuthContext";
//>>>>>>> development-main
import Layout from "./components/layout/Layout";
import Profile from "./pages/ProfilePage.jsx";
import { Navigate } from "react-router-dom";




import Home from "./pages/Home";
import CreateRecord from "./pages/createRecords";
import ShowRecord from "./pages/ShowRecord";
import EditRecord from "./pages/editRecord";
import DeleteRecord from "./pages/deleteRecord";

// import adminDashboard from "./components/admin/Dashboard";
import LicenseDashboard from "./components/admin/Dashboard";
import AddLicense from "./components/admin/AddLicense";
import LicenseForm from "./components/admin/LicenseForm";
import InsuranceForm from "./components/admin/InsuranceForm";
import InsuranceDashboard from "./components/admin/InsuranceDashboard";
import AddInsurance from "./components/admin/Addinsurance";
// lahiru
import OfferHome from './pages/OfferPages/Home';
import AddOffer from './pages/OfferPages/AddOffer';
import EditOffers from './pages/OfferPages/EditOffers';
import DeleteOffers from './pages/OfferPages/DeleteOffers';
import ShowOffers from './pages/OfferPages/ShowOffers';
import FirstPage from './pages/OfferPages/FirstPage';
// import Layout from './components/layouts/Layout';


//Nimesha files
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import OnBoarding from '../src/pages/OnBoarding.jsx';
import RentRequest from './pages/RentRequest.jsx';
import RequestManagement from './pages/RequestManagment.jsx';
import VehicleDetails from './pages/VehicleDetails.jsx';
import 'react-toastify/dist/ReactToastify.css';


import HomeBooking from './pages/bookingPages/Home.jsx';
import CreateBook from './pages/bookingPages/CreateBooks';
import ShowBook from './pages/bookingPages/ShowBook';
import EditBook from './pages/bookingPages/EditBook';
import DeleteBook from './pages/bookingPages/DeleteBook';
import Mainhome from "./pages/bookingPages/mainhome.jsx";
const App = () => {
  const { isAuthenticated, userData } = useAuth();
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Homee />} />{" "}
        {/* this has the signup and signin buttons */}
        <Route path="/chat/create" element={<Create />} />{" "}
        {/* this has the issue creating form */}
        <Route path="/chat/chats"
        element={
          !isAuthenticated ? (
            <Register />
          ) : userData.role === "admin" ? (
            <Navigate to="/chat/chats/admin" />
          ) : (
            <Chats />
          )
        }
         />{" "}
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
        <Route path="/rentHome" element={<HomeRentHisPage />} />
        <Route path="/rents/createHis" element={<CreateRentHisPage />} />
        <Route path="/rents/detailsHis/:id" element={<ShowRentHisPage />} />
        <Route path="rents/editHis/:id" element={<EditRentHisPage />} />
        <Route path="rents/deleteHis/:id" element={<DeleteRentHisPage />} />



        <Route path='/user' element={<Payments_ClientView />} />
        <Route path='/admin' element={<Payments_AdminView />} />
        <Route path='/method' element={<ChoosePaymentOption />} />

        <Route path='/cardpayments/user/create' element={<CreateCardPayment />} />
        <Route path='/cashpayments/user/create' element={<CreateCashPayment />} />
        <Route path='/stripepayments/user/create' element={<CreateStripePayment />} />
        <Route path='/savepaymentmethod/user/create' element={<SavePaymentMethod />} />
        <Route path='/refundrequests/user/create' element={<CreateRequestRefund />} />

        <Route path='/cardpayments/user/details/:id' element={<ShowCardPayment />} />
        <Route path='/cashpayments/user/details/:id' element={<ShowCashPayment />} />
        <Route path='/stripepayments/user/details/:id' element={<ShowStripePayment />} />
        <Route path='/savepaymentmethod/user/details/:id' element={<ShowPaymentMethod />} />
        <Route path='/refundrequests/admin/details/:id' element={<ShowRefundRequest />} />

        <Route path='/cashpayments/admin/edit/:id' element={<EditCashPayment />} />
        <Route path='/savepaymentmethod/user/edit/:id' element={<EditPaymentMethod />} />
        <Route path='/refundrequests/admin/edit/:id' element={<UpdateRefundRequest />} />

        <Route path='/savepaymentmethod/user/delete/:id' element={<DeletePaymentMethod />} />

        <Route path="/insuranceform" element={<InsuranceForm />} />
        <Route path="/licensedashboard" element={<LicenseDashboard />} />
        <Route path="/licenseform" element={<LicenseForm />} />
        <Route path="/addlicense" element={<AddLicense />} />
        <Route path="/addinsurance" element={<AddInsurance />} />
        <Route path="/insurancedashboard" element={<InsuranceDashboard />} />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Register />
            ) : userData.role === "admin" ? (
              <Navigate to="/AdminDashboard" />
            ) : (
              <Navigate to="/profile" />
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
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/profile"
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
        <Route path="/recordHome" element={<Home />} />
        <Route path="/records/create" element={<CreateRecord />} />
        <Route path="/records/details/:id" element={<ShowRecord />} />
        <Route path="/records/edit/:id" element={<EditRecord />} />
        <Route path="/records/delete/:id" element={<DeleteRecord />} />



        <Route path='/offers' element={<FirstPage/>} />
        <Route path='/offers/home' element={<OfferHome />} />
        <Route path='/offers/show/:id' element={<ShowOffers />} />
        <Route path='/offers/add' element={<AddOffer />} />
        <Route path='/offers/edit/:id' element={<EditOffers />} />
        <Route path='/offers/delete/:id' element={<DeleteOffers />} />
        



        <Route path="" />
        <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/rent-request" element={<RentRequest />} />
          <Route path="/request-management" element={<RequestManagement />} />
          <Route path="/vehicle-details" element={<VehicleDetails />} />


          <Route path='/bookshome' element={<HomeBooking />} />
          <Route path='/mainhome' element={<Mainhome />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes>
    </Layout>
  );
};

export default App;
