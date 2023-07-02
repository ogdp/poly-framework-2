import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { Outlet } from "react-router-dom";
type Props = {};

const LayoutCL = (props: Props) => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutCL;
