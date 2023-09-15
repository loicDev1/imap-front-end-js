import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ROLES, getLocalStorage, LS_USER_KEY , socket } from '../../helpers/utils';

function AddInterventions() {
  const currentUser = getLocalStorage(LS_USER_KEY);
  const [createdIntervention, setCreatedIntervention] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const sendInterventionSockect = () => {
    socket.emit('notifyIntervention' , {
        sender: currentUser.id,
        receiver: 2,
        content: "Notification envoyé !",
      })
  }

  const postIntervention = async () => {
    setError('');
    setIsLoading(true);
    try {
      const result = await axios({
        method: 'POST',
        url: `http://localhost:3500/api/intervention/create/?token=${currentUser.userToken}`,
        data: { ...createdIntervention },
      });
      const data = await result.data;
      if (data.cause?.code) throw new Error(data.cause?.code);
      setIsLoading(false);
      sendInterventionSockect()
      alert('User registered successfully');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      } else {
        setError(error?.message);
      }
    }
  };

  const setUpdatedUser = (event) => {
    createdIntervention[event.target.name] = event.target.value;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">
            Creer une intervention
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
              {error}
            </div>
            <div className="">
              <div className="col-md" style={{ paddingBottom: '20px' }}>
                <div className="">
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Titre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="titre de l'intervention"
                        name="titre"
                        onChange={setUpdatedUser}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="description de l'intervention..."
                        name="description"
                        onChange={setUpdatedUser}
                      />
                    </div>
                    <div className="col-md-12" style={{ marginTop: '18px' }}>
                      <button
                        className="btn btn-primary profile-button form-control"
                        type="button"
                        onClick={postIntervention}
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
    </>
  );
}

export default AddInterventions;
