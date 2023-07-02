import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const LayoutAD = (props: Props) => {
  return (
    <div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

export default LayoutAD;
