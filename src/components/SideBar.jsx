import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
} from '../helpers/utils';

function SideBar() {
  const user = getLocalStorage(LS_USER_KEY);

  return (
    <ul
      className="navbar-nav  sidebar sidebar-dark accordion"
      id="accordionSidebar"
      style={{backgroundColor:'#ef7900'}}
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          {/* <i className="fas fa-laugh-wink"></i> */}
        </div>
        <div className="sidebar-brand-text mx-3">Imap Admin</div>
        {/* <Link to={`dashboard`}>Dashboard</Link> */}
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
          {/* <Link to={`dashboard`}>Dashboard</Link> */}
        </a>
      </li>

      {/* <div className="sidebar-heading">Interface</div> */}
      <hr className="sidebar-divider" />
      {user.role === 'admin' && (
        <>
          <li className="nav-item">
            <span className="nav-link">
              <i class="fa fa-users"></i>
              <Link className="nolinkstyle" to={`compagnie`}>
                Compagnies
              </Link>
            </span>
          </li>
          <hr className="sidebar-divider" />
        </>
      )}
      <li className="nav-item">
            <span className="nav-link">
              <i class="fa fa-users"></i>
              <Link className="nolinkstyle" to={`users`}>
                Utilisateurs
              </Link>
            </span>
          </li>
          <hr className="sidebar-divider" />
      <li className="nav-item">
        <span className="nav-link">
          <i className="fa-solid fa-bars"></i>
          <span>
            <Link className="nolinkstyle" to={`reports`}>
              Reports
            </Link>{' '}
          </span>
        </span>
      </li>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Incidents</span>
        </a>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">AUTRES : </h6>
            <Link className="nolinkstyle collapse-item" to={`incidents`}>
              Gerer Les Incidents
            </Link>
            <Link className="collapse-item" to={'suivieIncidents'}>
              Suivie des Incidents
            </Link>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}

export default SideBar;
