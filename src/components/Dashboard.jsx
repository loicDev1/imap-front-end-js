import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../helpers/utils";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./Footer";
import Modal from "./Modal";
//import '../js/sb-admin-2.min.js'
//import '../../public/assets/chart-area-demo.js'

function Dashboard() {
  // useEffect(() => {
    
  //   document.body.innerHTML += `<script src="assets/chart-area-demo.js" type="text/javascript"></script>`;
  //   document.body.innerHTML += `<script src="assets/bootstrap.bundle.min.js" type="text/javascript"></script>`;
  //   document.body.innerHTML += `<script src="assets/chart-pie-demo.js" type="text/javascript"></script>`;
  //   document.body.innerHTML += `<script src="assets/Chart.min.js" type="text/javascript"></script>`;
  //   document.body.innerHTML += `<script src="assets/jquery.easing.min.js" type="text/javascript"></script>`;
  //   document.body.innerHTML += `<script src="assets/jquery.min.js" type="text/javascript"></script>`;
  //   document.body.innerHTML += `<script src="assets/sb-admin-2.min.js" type="text/javascript"></script>`;
  // },[])
  
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          <Content />
          <Footer />
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default Dashboard;
