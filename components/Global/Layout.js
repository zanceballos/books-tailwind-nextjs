import React from "react";
import Meta from "./Meta";
import Sidebar from "../Navigation/Sidebar";
const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Sidebar >{children}</Sidebar>
      
    </>
  );
};

export default Layout;
