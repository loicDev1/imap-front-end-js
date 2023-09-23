import React, { useState } from 'react';

function Diagnostic() {
  const [diagnostic, setDiagnostic] = useState({
    problematique: '',
    analyse: '',
    perspective: '',
    materiel: [{ id: 0, value: '' }],
    imateriel: [{ id: 0, value: '' }],
    humain: [{ id: 0, value: '' }],
  });

  const setUpdatedDiagnostic = (event) => {
    if (event.target.type === 'textarea') {
      diagnostic[event.target.name] = event.target.value;
      setDiagnostic({ ...diagnostic });
    } else {
      const value = event.target.previousSibling.value;
      if (value) {
        diagnostic[event.target.previousSibling.name].push({
          id: diagnostic[event.target.previousSibling.name].length + 1,
          value,
        });
        setDiagnostic({ ...diagnostic });
        event.target.previousSibling.value = '';
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Fiche de diagnostic</h1>
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
            {/* {error} */}
          </div>
          <div className="">
            <div className="col-md" style={{ paddingBottom: '20px' }}>
              <div className="">
                {/* <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nom</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    name="nom"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Prenom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    name="prenom"
                  />
                </div>
              </div> */}
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Problematique</label>
                    <textarea
                      type="text"
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
                        {diagnostic.materiel.map((e , index) => {
                          return (
                            <a
                            key={index}
                              class="btn btn-success btn-icon-split"
                              style={{ margin: '3px' }}
                            >
                              <span class="icon text-white">
                                <i class="fas fa-trash"></i>
                              </span>
                              <span class="text"> {e.value} </span>
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
                        {diagnostic.imateriel.map((e , index) => {
                          return (
                            <a
                            key={index}
                              class="btn btn-warning btn-icon-split"
                              style={{ margin: '3px' }}
                            >
                              <span class="icon text-white">
                                <i class="fas fa-trash"></i>
                              </span>
                              <span class="text"> {e.value} </span>
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
                        {diagnostic.humain.map((e , index) => {
                          return (
                            <a
                            key={index}
                              class="btn btn-danger btn-icon-split"
                              style={{ margin: '3px' }}
                            >
                              <span class="icon text-white">
                                <i class="fas fa-trash"></i>
                              </span>
                              <span class="text"> {e.value} </span>
                            </a>
                          );
                        })}{' '}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12" style={{ marginTop: '18px' }}>
                    <button
                      className="btn btn-primary profile-button form-control"
                      type="button"
                      disabled={false}
                    >
                      Ajouter
                      {/* {isLoading && <span className="loaderperso2"></span>} */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnostic;
