import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getLocalStorage } from "../helpers/utils";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./Footer";
import Modal from "./Modal";
//import '../js/sb-admin-2.min.js'
//import '../../public/assets/chart-area-demo.js'

function Dashboard() {
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          <Outlet />
          <Footer />
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default Dashboard;
