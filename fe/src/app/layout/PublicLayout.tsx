import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {};

const PublicLayout: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="app-body-wrapper">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(PublicLayout);
