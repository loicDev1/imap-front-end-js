import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  firstLetterUc,
  formatDate,
  formatHours,
  addZeroOrNo,
  getLocalStorage,
  LS_USER_KEY,
} from '../helpers/utils';
import axios from 'axios';
import userProfile from '../img/user.png';
import PdfDiagFile from './PdfDiagFile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfFile from './PdfFile';

function AllNotifications() {
  const user = getLocalStorage(LS_USER_KEY);
  //const allNotifications = JSON.parse(localStorage.getItem('allNotifications'));
  const [allNotifications, setAllNotifications] = useState([]);
  const status = [
    { status: 'initié', nom: 'initié', color: '' },
    { status: 'enCours', nom: 'en cours', color: '' },
    { status: 'acheve', nom: 'Fin', color: '' },
  ];
  const message =
    user.role == 'admin'
      ? "a soumis une demande d'interventon : "
      : "a soumis une Fiche de diagnostic pour l'intervention : ";
  const setStatusIntervention = async (e, newStatus, intervention) => {
    try {
      e.preventDefault();
      const { id, status } = intervention;
      const result = await axios({
        method: 'PATCH',
        url: `http://localhost:3500/api/intervention/updateIntervention/?token=${user.userToken}`,
        data: { id, status: newStatus },
      });
      const updatedIntervention = await result.data;
      if (!updatedIntervention) throw new Error('error updating');
      setAllNotifications(
        allNotifications.map((e) => {
          if (e.intervention.id == updatedIntervention.id) {
            e.intervention.status = updatedIntervention.status;
            return e;
          } else {
            return e;
          }
        })
      );

      localStorage.setItem(
        'allNotifications',
        JSON.stringify(allNotifications)
      );

      console.log(updatedIntervention);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotificationsByUser = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `http://localhost:3500/api/notification/getNotifications/?token=${user.userToken}`,
      });
      const notifications = await result.data;
      console.log('notifications :', notifications);
      if (!notifications) throw new Error('error getting notifications');
      // localStorage.setItem(
      //   'allNotifications',
      //   JSON.stringify(
      //     notifications
      //       .filter(
      //         (notif) => notif.receiver.id == user.id || user.role === 'admin'
      //       )
      //       .reverse()
      //   )
      // );
      setAllNotifications(
        notifications
          .filter(
            (notif) => notif.receiver.id == user.id // || user.role === 'admin' 
          )
          .reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotificationsByUser();
  },[]);

  if (user.role == 'admin') {
    return (
      <div className="container-fluid">
        <h1 className="h3 text-gray-800" style={{ marginBottom: '40px' }}>
          Toutes les Interventions
        </h1>

        {allNotifications.map((notification, index) => {
          return (
            <div
              key={index}
              className="card shadow mb-4"
              // style={{ marginTop: '80px' }}
            >
              <div className="card-header d-flex flex-row align-items-center justify-content-between">
                <a
                  className="nav-link"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div>
                    <img
                      style={{ width: '40px' }}
                      className="img-profile rounded-circle"
                      src={userProfile}
                    />
                    <h5
                      style={{ marginLeft: '10px', color: 'black' }}
                      className=" d-none d-lg-inline text-gray-600"
                    >
                      {firstLetterUc(notification.sender.nom) +
                        ' ' +
                        notification.sender.prenom +
                        ' . Le ' +
                        formatDate(notification.createdAt) +
                        ' . ' +
                        formatHours(notification.createdAt).slice(0, 3)}
                    </h5>
                  </div>
                </a>
                <div className="dropdown no-arrow">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Plus d'options</div>
                    {notification.intervention.status === 'initié' && (
                      <Link
                        to={'diagnostic'}
                        onClick={() => {
                          localStorage.setItem(
                            'currentNotification',
                            JSON.stringify(notification)
                          );
                        }}
                        className="dropdown-item"
                      >
                        Fiche de diagnostic
                      </Link>
                    )}
                    <a className="dropdown-item" href="#">
                      Autres...
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div>
                  {' '}
                  {`M. / Mme ${
                    notification.sender.nom + ' ' + notification.sender.prenom
                  } ${message} ${
                    notification.intervention.titre
                  } a votre service...`}{' '}
                </div>
                <h5 style={{ margin: '10px 0px' }}>
                  {' '}
                  Description de l'intervention{' '}
                </h5>
                <div style={{ marginBottom: '10px' }}>
                  {' '}
                  {notification.intervention.description}{' '}
                </div>
                <PDFDownloadLink
                  document={
                    <PdfFile
                      interventionData={notification.intervention}
                      userIntervention={notification.sender}
                      admin={true}
                    />
                  }
                  filename="FORM.pdf"
                >
                  {({ loading }) =>
                    loading ? (
                      <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fas fa-download fa-sm text-white-50"></i>
                        {'  '}Loading...
                      </button>
                    ) : (
                      <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fas fa-download fa-sm text-white-50"></i>
                        {'  '}Generer La demande
                      </button>
                    )
                  }
                </PDFDownloadLink>
                {notification.intervention.status === 'enCours' && (
                  <button
                    onClick={(e) => {
                      setStatusIntervention(
                        e,
                        'acheve',
                        notification.intervention
                      );
                    }}
                    style={{ marginLeft: '10px' }}
                    className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                  >
                    Mettre fin a l'intervention
                  </button>
                )}
                {notification.intervention.status === 'acheve' && (
                  <button
                    disabled
                    style={{ marginLeft: '10px', cursor: 'no-drop' }}
                    className="d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm"
                  >
                    Intervention Achevé
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <h1 className="h3 text-gray-800" style={{ marginBottom: '40px' }}>
          Tout les Diagnostics soumis
        </h1>
        {allNotifications.map((notification, index) => {
          const intervention = notification.intervention;
          return (
            <div key={index} className="container-fluid">
              <div className="card shadow mb-4" style={{ marginTop: '80px' }}>
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6
                    className="m-0 font-weight-bold text-primary"
                    style={{ fontSize: '1.5em' }}
                  >
                    Demande d'intervention #{addZeroOrNo(intervention.id)}
                  </h6>
                  <div style={{ margin: '0px 12%' }}>
                    {user.role == 'admin' ? (
                      <PDFDownloadLink
                        document={
                          <PdfFile
                            interventionData={intervention}
                            userIntervention={notification.sender}
                            admin={user.role == 'admin' ? true : false}
                          />
                        }
                        filename="FORM.pdf"
                      >
                        {({ loading }) =>
                          loading ? (
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                            >
                              <i className="fas fa-download fa-sm text-white-50"></i>
                              Loading...
                            </span>
                          ) : (
                            <span className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                              <i className="fas fa-download fa-sm text-white-50"></i>
                              {'  '}Generer La demande
                            </span>
                          )
                        }
                      </PDFDownloadLink>
                    ) : (
                      <PDFDownloadLink
                        document={
                          <PdfDiagFile diagData={notification.diagnostic} />
                        }
                        filename="FORM.pdf"
                      >
                        {({ loading }) =>
                          loading ? (
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                            >
                              <i className="fas fa-download fa-sm text-white-50"></i>
                              Loading...
                            </span>
                          ) : (
                            <span className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                              <i className="fas fa-download fa-sm text-white-50"></i>
                              {'  '}Generer La fiche de diagnostic
                            </span>
                          )
                        }
                      </PDFDownloadLink>
                    )}
                  </div>
                  <div>
                    {intervention.status === 'initié' &&
                      user.role === 'personnel' && (
                        <span
                          onClick={(e) => {
                            setStatusIntervention(e, 'enCours', intervention);
                          }}
                          className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
                        >
                          Aprouvé le diagnostic
                        </span>
                      )}
                  </div>
                  <div className="dropdown no-arrow">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div className="dropdown-header">Plus d'options</div>
                      {/* {user.role === 'admin' && (
                        <Link
                          to={'diagnostic'}
                          onClick={() => {
                            localStorage.setItem(
                              'currentNotification',
                              JSON.stringify(notification)
                            );
                          }}
                          className="dropdown-item"
                        >
                          Fiche de diagnostic
                        </Link>
                      )} */}
                      <a className="dropdown-item" href="#">
                        Autres...
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    {' '}
                    {`M. / Mme ${
                      notification.sender.nom + ' ' + notification.sender.prenom
                    } ${message} ${intervention.titre} a votre service...`}
                  </div>
                  <h5 style={{ margin: '10px 0px' }}>
                    {' '}
                    Description de l'intervention{' '}
                  </h5>
                  <div style={{ marginBottom: '10px' }}>
                    {' '}
                    {intervention.description}{' '}
                  </div>
                  {/* <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i className="fas fa-download fa-sm text-white-50"></i>
                    Generer La demandE
                  </button> */}

                  <hr />
                  <div>
                    <ul class="timeline">
                      <hr className="lineT" />
                      {status.map((s, index) => {
                        return (
                          <li
                            key={index}
                            class={
                              s.status == intervention.status ? 'active' : ''
                            }
                          >
                            {' '}
                            {s.nom}{' '}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AllNotifications;
