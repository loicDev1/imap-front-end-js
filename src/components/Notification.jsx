import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import PdfDiagFile from './PdfDiagFile';
import PdfFile from './PdfFile';
import { getLocalStorage, LS_USER_KEY } from '../helpers/utils';

function Notification() {
  const notification = JSON.parse(localStorage.getItem('notification'));
  const user = getLocalStorage(LS_USER_KEY);
  const message =
    user.role == 'admin'
      ? "a soumis une demande d'interventon : "
      : "a soumis une Fiche de diagnostic pour l'intervention : ";
  return (
    <div className="container-fluid">
      <div className="card shadow mb-4" style={{ marginTop: '80px' }}>
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6
            className="m-0 font-weight-bold text-primary"
            style={{ fontSize: '1.5em' }}
          >
            Notification
          </h6>
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
            } ${message} ${notification.intervention.titre} a votre service...`}
          </div>
          <h5 style={{ margin: '10px 0px' }}>
            {' '}
            Description de l'intervention{' '}
          </h5>
          <div style={{ marginBottom: '10px' }}>
            {' '}
            {notification.intervention.description}{' '}
          </div>
          {/* <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-download fa-sm text-white-50"></i>
            Generer La demandE
          </button> */}

          {user.role == 'admin' ? (
            <PDFDownloadLink
              document={
                <PdfFile
                  interventionData={notification.intervention}
                  userIntervention={notification.sender}
                  admin={user.role == 'admin'? true: false}
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
      </div>
    </div>
  );
}

export default Notification;
