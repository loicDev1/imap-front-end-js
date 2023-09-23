import React from 'react';

function Notification() {
  const notification = JSON.parse(localStorage.getItem('notification'));
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
              <a className="dropdown-item" href="#">
                Fiche de diagnostic
              </a>
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
            } a votre service...`}
          </div>
          <h5 style={{ margin: '10px 0px' }}>
            {' '}
            Description de l'intervention{' '}
          </h5>
          <div style={{ marginBottom: '10px' }}> {notification.intervention.description} </div>
          <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-download fa-sm text-white-50"></i>
            Generer La demande
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
