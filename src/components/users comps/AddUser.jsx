import React, { useState } from 'react';
import axios from 'axios';
import { ROLES, getLocalStorage, LS_USER_KEY } from '../../helpers/utils';

function AddUser() {
  const currentUser = getLocalStorage(LS_USER_KEY);
  const [createdUser, setCreatedUser] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async () => {
    setError('');
    setIsLoading(true)
    try {
      const result = await axios({
        method: 'POST',
        url: `http://localhost:3500/api/admin/registerUser/?token=${currentUser.userToken}`,
        data: { ...createdUser },
      });
      const data = await result.data;
      if (data.cause?.code) throw new Error(data.cause?.code);
      setIsLoading(false)
      alert('User registered successfully');
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      } else {
        setError(error?.message);
      }
    }
  };

  const setUpdatedUser = (event) => {
    createdUser[event.target.name] = event.target.value;
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Ajouter un nouvel utilisateur</h1>
      </div>

      <div className="container-fluid" style={{ width: '80%',paddingTop:'10px' }}>
        <div className="container rounded bg-white  mb-5" style={{paddingTop:'10px' }}>
          <div
            style={{
              color: 'red',
              width: '100%',
              height: '25px',
              padding: '0px 10px',
              overflow:'auto',
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
                    <label className="labels">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      name="nom"
                      onChange={setUpdatedUser}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Prenom</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="surname"
                      name="prenom"
                      onChange={setUpdatedUser}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email"
                      name="email"
                      onChange={setUpdatedUser}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      onChange={setUpdatedUser}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Role</label>
                    <select
                      type="text"
                      className="form-control"
                      placeholder="Role"
                      name="role"
                      onChange={setUpdatedUser}
                    >
                      {ROLES.map((role) => {
                        return <option value={role}> {role} </option>;
                      })}
                    </select>
                  </div>
                  <div className="col-md-12" style={{ marginTop: '18px' }}>
                    <button
                      className="btn btn-primary profile-button form-control"
                      type="button"
                      onClick={createUser}
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
  );
}

export default AddUser;
