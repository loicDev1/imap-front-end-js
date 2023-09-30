import React, { useState } from 'react';
import axios from 'axios';
import { ROLES, getLocalStorage, LS_USER_KEY, socket } from '../helpers/utils';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDiagFile from './PdfDiagFile';

function Diagnostic() {
  const currentUser = getLocalStorage(LS_USER_KEY);
  const currentNotification = JSON.parse(
    localStorage.getItem('currentNotification')
  );
  console.log('currentNotification : ', currentNotification);
  const [diagnostic, setDiagnostic] = useState({
    problematique: '',
    analyse: '',
    perspective: '',
    materiel: [],
    imateriel: [],
    humain: [],
  });
  const [diagnosticDb, setdiagnosticDb] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendDiagnosticSockect = async (data) => {
    console.log(data);
    socket.emit('notifyIntervention', {
      sender: currentUser.id,
      receiver: currentNotification.sender.id,
      diagnostic: data.id,
      intervention: currentNotification.intervention.id,
    });
  };

  const setUpdatedDiagnostic = (event) => {
    event.preventDefault();
    if (event.target.type === 'textarea') {
      diagnostic[event.target.name] = event.target.value;
      setDiagnostic({ ...diagnostic });
    } else {
      const value = event.target.previousSibling.value;
      if (value) {
        diagnostic[event.target.previousSibling.name].push({
          id: diagnostic[event.target.previousSibling.name].length + 1,
          value,
          type: event.target.previousSibling.name,
        });
        setDiagnostic({ ...diagnostic });
        event.target.previousSibling.value = '';
      }
    }
  };

  const removeItem = (event, item) => {
    //event.stopPropagation();
    const props = event.target.attributes.name.nodeValue;
    //console.log(event.target.parentNode.attributes.name.nodeValue);
    diagnostic[props] = diagnostic[props].filter((e) => e.id !== item.id);
    setDiagnostic({ ...diagnostic });
  };

  const submitDiagnostic = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      diagnostic.materiel = removeId(diagnostic.materiel);
      diagnostic.imateriel = removeId(diagnostic.imateriel);
      diagnostic.humain = removeId(diagnostic.humain);
      const result = await axios({
        method: 'POST',
        url: `http://localhost:3500/api/admin/createDiagnostic/?token=${currentUser.userToken}`,
        data: { ...diagnostic },
      });
      const data = await result.data;
      if (!data) throw new Error('Invalid');
      setdiagnosticDb(data);
      setIsLoading(false);
      sendDiagnosticSockect(data);
      alert('le diagnostic a été soumit au personnel avec succes');
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeId = (array) => {
    return array.map((e) => {
      delete e.id;
      return e;
    });
  };

  return (
    <div className="container-fluid">
      <form
        action=""
        onSubmit={(e) => {
          submitDiagnostic(e);
        }}
      >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Fiche de diagnostic</h1>

          <div className="col-md-3" style={{ marginLeft: '10px' }}>
            {diagnosticDb && (
              <PDFDownloadLink
                document={<PdfDiagFile diagData={diagnosticDb} />}
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

          <div className="col-md-3" style={{ marginRight: '112px' }}>
            <input
              className="btn btn-primary profile-button form-control"
              disabled={isLoading}
              type="submit"
              value={!isLoading ? 'Soumetre le diagnostic' : ''}
            />
            {isLoading && <span className="loaderperso2"></span>}
          </div>
        </div>

        <div
          className="container-fluid"
          style={{ width: '80%', paddingTop: '10px' }}
        >
          <div
            className="container rounded bg-white  mb-5"
            style={{ paddingTop: '10px' }}
          >
            <div
              style={{
                color: 'red',
                width: '100%',
                height: '25px',
                padding: '0px 10px',
                overflow: 'auto',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: 'red',
                  width: '100%',
                  height: '25px',
                  padding: '0px 10px',
                  overflow: 'auto',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            </div>
            <div className="">
              <div className="col-md" style={{ paddingBottom: '20px' }}>
                <div className="">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Problematique</label>
                      <textarea
                        type="text"
                        required={true}
                        className="form-control"
                        placeholder="problematique"
                        name="problematique"
                        onChange={setUpdatedDiagnostic}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Analyse</label>
                      <textarea
                        type="text"
                        required={true}
                        className="form-control"
                        placeholder="analyse"
                        name="analyse"
                        onChange={setUpdatedDiagnostic}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Mise en perspective</label>
                      <textarea
                        type="text"
                        required={true}
                        className="form-control"
                        placeholder="perspective"
                        name="perspective"
                        onChange={setUpdatedDiagnostic}
                      />
                    </div>
                    <div className="col-md-12">
                      <div>
                        <label className="labels">Resources Materieles</label>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <input
                            style={{ width: '70%' }}
                            type="text"
                            className="form-control"
                            placeholder=" entrer une resource"
                            name="materiel"
                          />
                          <button
                            onClick={setUpdatedDiagnostic}
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                          >
                            Ajouter
                          </button>
                        </div>
                        <div style={{ margin: '5px', padding: '5px' }}>
                          {diagnostic.materiel.map((e, index) => {
                            return (
                              <a
                                key={index}
                                className="btn btn-success btn-icon-split"
                                style={{ margin: '3px' }}
                              >
                                <span key={index} className="icon text-white">
                                  <i
                                    name="materiel"
                                    onClick={(event) => {
                                      removeItem(event, e);
                                    }}
                                    className="fas fa-trash"
                                  ></i>
                                </span>
                                <span name="description" className="text">
                                  {' '}
                                  {e.value}{' '}
                                </span>
                              </a>
                            );
                          })}{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <label className="labels">Resources Imaterieles</label>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <input
                            style={{ width: '70%' }}
                            type="text"
                            className="form-control"
                            placeholder=" entrer une resource"
                            name="imateriel"
                          />
                          <button
                            onClick={setUpdatedDiagnostic}
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                          >
                            Ajouter
                          </button>
                        </div>
                        <div style={{ margin: '5px', padding: '5px' }}>
                          {diagnostic.imateriel.map((e, index) => {
                            return (
                              <a
                                key={index}
                                className="btn btn-warning btn-icon-split"
                                style={{ margin: '3px' }}
                              >
                                <span key={index} className="icon text-white">
                                  <i
                                    name="imateriel"
                                    onClick={(event) => {
                                      removeItem(event, e);
                                    }}
                                    className="fas fa-trash"
                                  ></i>
                                </span>
                                <span className="text"> {e.value} </span>
                              </a>
                            );
                          })}{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <label className="labels">Resources Humaines</label>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <input
                            style={{ width: '70%' }}
                            type="text"
                            className="form-control"
                            placeholder=" entrer une resource"
                            name="humain"
                          />
                          <button
                            onClick={setUpdatedDiagnostic}
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                          >
                            Ajouter
                          </button>
                        </div>
                        <div style={{ margin: '5px', padding: '5px' }}>
                          {diagnostic.humain.map((e, index) => {
                            return (
                              <a
                                key={index}
                                className="btn btn-danger btn-icon-split"
                                style={{ margin: '3px' }}
                              >
                                <span className="icon text-white">
                                  <i
                                    key={index}
                                    name="humain"
                                    onClick={(event) => {
                                      removeItem(event, e);
                                    }}
                                    className="fas fa-trash"
                                  ></i>
                                </span>
                                <span className="text"> {e.value} </span>
                              </a>
                            );
                          })}{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '20px' }}>
                      <input
                        className="btn btn-primary profile-button form-control"
                        disabled={isLoading}
                        type="submit"
                        value={'Soumetre le diagnostic'}
                      />
                      {isLoading && <span className="loaderperso2"></span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Diagnostic;
