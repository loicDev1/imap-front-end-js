import React, { useEffect, useState } from 'react';
import userProfile from '../img/user.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import {
  getLocalStorage,
  setLocalStorage,
  LS_USER_KEY,
  formatDate,
  formatHours,
  firstLetterUc,
  socket,
} from '../helpers/utils';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const user = getLocalStorage(LS_USER_KEY);
  const navigate = useNavigate();

  const [notification, setnotification] = useState();

  const [allNotifications, setAllNotifications] = useState([]);

  const message =
    user.role == 'admin'
      ? "a soumis une demande d'interventon : "
      : "a soumis une Fiche de diagnostic pour l'intervention : ";

  const getAllNotificationsByUser = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `http://localhost:3500/api/notification/getNotifications/?token=${user.userToken}`,
      });
      const notifications = await result.data;
      //console.log(notifications);
      if (!notifications) throw new Error('error getting notifications');
      localStorage.setItem(
        'allNotifications',
        JSON.stringify(
          notifications
            .reverse()
            .filter(
              (notif) => notif.receiver.id == user.id || user.role === 'admin'
            )
        )
      );
      setAllNotifications(
        notifications
          .reverse()
          .filter(
            (notif) => notif.receiver.id == user.id || user.role === 'admin'
          )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear(LS_USER_KEY);
    return navigate('/');
  };

  const receiveNotification = () => {
    socket.on('notifyIntervention', (data) => {
      console.log('dataSokect : ', data);
      getAllNotificationsByUser();
    });
  };
  receiveNotification();

  // const notifyDiagnostic = () => {
  //   socket.on('notifyDiagnostic', (data) => {
  //     if (
  //       user.role ===
  //       'admin' /*|| notif.receiver == user.id permettre a un personnel de recevoir aussi les notif envoyé a son id*/
  //     ) {
  //       //console.log('socket data 1: ', data);
  //       getAllNotificationsByUser();
  //     }
  //   });
  // };

  const openNotif = async (notificationParams) => {
    try {
      if (!notificationParams.isOpen) {
        const result = await axios({
          method: 'PATCH',
          url: `http://localhost:3500/api/notification/updateNotifStatus/${notificationParams.id}/?token=${user.userToken}`,
        });
        const notificationRes = result.data;
        if (!notificationRes) throw new Error('error updating notification');
        setAllNotifications(
          allNotifications.map((notif) => {
            if (notif.id == notificationRes.id) {
              return notificationRes;
            } else {
              return notif;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notif = (event, notification) => {
    //event.preventDefault();
    localStorage.setItem('notification', JSON.stringify(notification));
  };

  useEffect(() => {
    getAllNotificationsByUser();
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faSearch} />
          </a>

          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bell fa-fw"></i>
            {/* <FontAwesomeIcon icon={faBell} /> */}
            <span className="badge badge-danger badge-counter">
              {' '}
              {allNotifications.length > 9
                ? '9+'
                : allNotifications.filter((n) => n.isOpen === false)
                    .length}{' '}
            </span>
          </a>

          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Notifications</h6>
            {/* <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="fas fa-file-alt text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 12, 2019</div>
                <span className="font-weight-bold">
                  A new monthly report is ready to download!
                </span>
              </div>
            </a> */}
            {allNotifications
              .filter((n) => n.isOpen === false)
              .slice(0, 3)
              .map((notification, index) => {
                return (
                  <span
                    key={index}
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      openNotif(notification);
                    }}
                  >
                    {' '}
                    <div className="mr-3">
                      <div className="icon-circle bg-success">
                        <i className="fas fa-donate text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`small ${
                          !notification.isOpen
                            ? 'font-weight-bold'
                            : 'text-gray-500 font-weight-bold'
                        }`}
                      >
                        Le
                        {` ${formatDate(
                          notification.createdAt
                        )} À ${formatHours(notification.createdAt)}`}
                      </div>
                      <Link
                        to={`users/notification/${notification.id}`}
                        onClick={(event) => {
                          notif(event, notification);
                        }}
                      >
                        <span
                          className={!notification.isOpen && 'font-weight-bold'}
                        >
                          {`M. / Mme ${
                            notification.sender.nom +
                            ' ' +
                            notification.sender.prenom
                          } ${message} ${
                            notification.intervention.titre
                          } a votre service...`}
                        </span>
                      </Link>
                    </div>
                  </span>
                );
              })}
            {allNotifications.length > 0 ? (
              <Link
                className="dropdown-item text-center small text-gray-500"
                to={'users/notifications'}
              >
                Voir plus de notifications
              </Link>
            ) : (
              <span className="dropdown-item text-center small text-gray-500">
                {' '}
                Aucune notification pour le moment
              </span>
            )}
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="messagesDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-envelope fa-fw"></i>

            <span className="badge badge-danger badge-counter">7</span>
          </a>

          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="messagesDropdown"
          >
            <h6 className="dropdown-header">Message Center</h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="img/undraw_profile_1.svg"
                  alt="..."
                />
                <div className="status-indicator bg-success"></div>
              </div>
              <div className="font-weight-bold">
                <div className="text-truncate">
                  Hi there! I am wondering if you can help me with a problem
                  I've been having.
                </div>
                <div className="small text-gray-500">Emily Fowler · 58m</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src={userProfile} alt="..." />
                <div className="status-indicator"></div>
              </div>
              <div>
                <div className="text-truncate">
                  I have the photos that you ordered last month, how would you
                  like them sent to you?
                </div>
                <div className="small text-gray-500">Jae Chun · 1d</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="img/undraw_profile_3.svg"
                  alt="..."
                />
                <div className="status-indicator bg-warning"></div>
              </div>
              <div>
                <div className="text-truncate">
                  Last month's report looks great, I am very happy with the
                  progress so far, keep up the good work!
                </div>
                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                  alt="..."
                />
                <div className="status-indicator bg-success"></div>
              </div>
              <div>
                <div className="text-truncate">
                  Am I a good boy? The reason I ask is because someone told me
                  that people say this to all dogs, even if they aren't good...
                </div>
                <div className="small text-gray-500">Chicken the Dog · 2w</div>
              </div>
            </a>
            <a
              className="dropdown-item text-center small text-gray-500"
              href="#"
            >
              Read More Messages
            </a>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {firstLetterUc(user.nom) + ' ' + user.prenom}
            </span>
            <img className="img-profile rounded-circle" src={userProfile} />
          </a>

          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a className="dropdown-item">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              {/* Profile */}
              <Link className="noline" to={'profil'}>
                {' '}
                profil{' '}
              </Link>
            </a>
            <span className="dropdown-item">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              {/* Settings */}
              <Link className="noline" to={'setting'}>
                {' '}
                Parametres{' '}
              </Link>
            </span>
            <a className="dropdown-item noline">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              {/* Activity Log */}
              <Link className="noline" to={'users/reports'}>
                {' '}
                Rapports{' '}
              </Link>
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#logoutModal"
              style={{ cursor: 'pointer' }}
              onClick={logout}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
