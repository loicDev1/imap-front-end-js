import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../config';
import {
  ROLES,
  USERS_SERVICES,
  getLocalStorage,
  LS_USER_KEY,
} from '../helpers/utils';
import { COMPACT_DENSITY_FACTOR } from '@mui/x-data-grid/hooks/features/density/useGridDensity';


function AddIncident() {
  const currentUser = getLocalStorage(LS_USER_KEY);
  const [createdUser, setCreatedUser] = useState({
    role: ROLES[0],
    service: USERS_SERVICES[0],
  });
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entrepriseData, setEntData] = useState({});

  // const createUser = async () => {
  //   setError('');
  //   setIsLoading(true);
  //   try {
  //     const result = await axios({
  //       method: 'POST',
  //       url: `http://localhost:3500/api/admin/registerUser/?token=${currentUser.userToken}`,
  //       data: { ...createdUser },
  //     });
  //     const data = await result.data;
  //     if (data.cause?.code) throw new Error(data.cause?.code);
  //     setIsLoading(false);
  //     alert('User registered successfully');
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     if (error?.response?.data?.message) {
  //       setError(error?.response?.data?.message);
  //     } else {
  //       setError(error?.message);
  //     }
  //   }
  // };

  const createCompagnie = async () => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${config.baseUrl}/entreprises/register/`,
        data: entrepriseData,
      });
      const data = await result.data;
      setMessage('')
      alert('Entreprise registered successfully');
    } catch (error) {
      setMessage(error.response?.data?.error || error.message)
    }
  };

  const setEntrepriseData = (event) => {
    entrepriseData[event.target.name] = event.target.value;
  };

  return (
    <div className="container-fluid">
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">
        Ajouter un type d'incident
      </h1>
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
          { message }
        </div>
        <div className="">
          <div className="col-md" style={{ paddingBottom: '20px' }}>
            
            <div className="">
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    name="nom"
                    onChange={setEntrepriseData}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="surname"
                    name="password"
                    onChange={setEntrepriseData}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">contact</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="contact"
                    name="contact"
                    onChange={setEntrepriseData}
                  />
                </div>

                {/* <div className="col-md-12">
                  <label className="labels">Service</label>
                  <select
                    type="text"
                    className="form-control"
                    placeholder="Service"
                    name="service"
                    onChange={setEntrepriseData}
                    defaultValue={USERS_SERVICES[0]}
                  >
                    {USERS_SERVICES.map((service, index) => {
                      return (
                        <option key={index} value={service}>
                          {' '}
                          {service}{' '}
                        </option>
                      );
                    })}
                  </select>
                </div> */}
                <div className="col-md-12" style={{ marginTop: '18px' }}>
                  <button
                    className="btn btn-primary profile-button form-control"
                    type="button"
                    onClick={createCompagnie}
                    disabled={isLoading}
                  >
                    Ajouter
                    {isLoading && <span className="loaderperso2"></span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddIncident