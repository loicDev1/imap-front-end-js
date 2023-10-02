import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import PdfDiagFile from './PdfDiagFile';
import PdfFile from './PdfFile';
import { addZeroOrNo, getLocalStorage, LS_USER_KEY } from '../helpers/utils';
import '../../src/timeline.css';

function Notification() {
  const [notification, setNotification] = useState(
    JSON.parse(localStorage.getItem('notification'))
  );
  const [intervention, setIntervention] = useState(notification.intervention);
  const user = getLocalStorage(LS_USER_KEY);
  const status = [
    { status: 'initié', nom: 'initié', color: '' },
    { status: 'enCours', nom: 'en cours', color: '' },
    { status: 'acheve', nom: 'Fin', color: '' },
  ];
  const message =
    user.role == 'admin'
      ? "a soumis une demande d'interventon : "
      : "a soumis une Fiche de diagnostic pour l'intervention : ";

  const setStatusIntervention = async (e, newStatus) => {
    try {
      e.preventDefault();
      const { id, status } = intervention;
      const result = await axios({
        method: 'PATCH',
        url: `http://localhost:3500/api/intervention/updateIntervention/?token=${user.userToken}`,
        data: { id, status: newStatus },
      });
      const updatedIntervention = await result.data;
      setIntervention(updatedIntervention);
      console.log(updatedIntervention);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationById = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `http://localhost:3500/api/notification/getNotificationByid/${notification.id}/?token=${user.userToken}`,
      });
      const notif = await result.data;
      setNotification(notif);
      setIntervention(notif.intervention);
      console.log('notif dans  le : ', notif);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotificationById();
  }, []);

  return (
    <div className="container-fluid">
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
                document={<PdfDiagFile diagData={notification.diagnostic} />}
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
            {intervention.status === 'initié' && user.role === 'personnel' && (
              <span
                onClick={(e) => {
                  setStatusIntervention(e, 'enCours');
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
              {user.role === 'admin' && intervention.status === 'initié' && (
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
                    class={s.status == intervention.status ? 'active' : ''}
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
}

export default Notification;
