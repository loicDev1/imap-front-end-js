import React from 'react';
import { Link } from 'react-router-dom';
import { firstLetterUc, formatDate, formatHours } from '../helpers/utils';
import userProfile from '../img/user.png';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfFile from './PdfFile';

function AllNotifications() {
  const allNotifications = JSON.parse(localStorage.getItem('allNotifications'));
  return (
    <div className="container-fluid">
      <h1 className="h3 text-gray-800" style={{ marginBottom: '40px' }}>
        Toutes les Notifications
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
                      notification.sender.prenom + ' . Le ' + formatDate(notification.createdAt)+ ' . '+ formatHours(notification.createdAt).slice(0,3)}
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
                  <Link to={'diagnostic'} className="dropdown-item" >
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
                } a soumis une demande d'interventon : ${
                  notification.intervention.titre
                } a votre service...`}{' '}
              </div>
              <h5 style={{ margin: '10px 0px' }}>
                {' '}
                Description de l'intervention{' '}
              </h5>
              <div style={{marginBottom:'10px'}}> {notification.intervention.description} </div>
              <PDFDownloadLink
                document={
                  <PdfFile interventionData={notification.intervention} admin={true} />
                }
                filename="FORM.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                      <i className="fas fa-download fa-sm text-white-50"></i>
                      Loading...
                    </button>
                  ) : (
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                      <i className="fas fa-download fa-sm text-white-50"></i>
                      Generer La demande
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllNotifications;
