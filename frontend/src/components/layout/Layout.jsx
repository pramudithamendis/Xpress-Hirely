import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: "url('bgRentHis.jpg')",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
