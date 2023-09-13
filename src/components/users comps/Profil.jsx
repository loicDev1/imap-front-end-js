import React, { useEffect, useState } from 'react';
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  formatDate,
  ROLES,
} from '../../helpers/utils';
import axios from 'axios';

function Profil() {
  const [user, setUser] = useState(
    getLocalStorage('detailsUser') || getLocalStorage(LS_USER_KEY)
  );

  const currentUserToken = getLocalStorage(LS_USER_KEY).userToken;

  const [detailsUser, setdetailsUser] = useState(
    getLocalStorage('detailsUser')
  );

  const [selectedRole, setSelectedRole] = useState(user.role);
  const [isDisabled, setisDisabled] = useState(detailsUser && true);

  useEffect(() => {
    localStorage.setItem('detailsUser', false);
  }, []);

  const saveProfile = async () => {
    try {
      const result = await axios({
        method: 'PATCH',
        url: `http://localhost:3500/api/user/update/?token=${currentUserToken}`,
        data: { ...user },
      });
      const userData = await result.data;
      setUser(userData);
      alert('User updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const setUpdatedUser = (event) => {
    user[event.target.name] = event.target.value;
  };

  const toggleBtnSave = () => {
    if (detailsUser) {
      return user.role == selectedRole;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">
            {' '}
            {detailsUser
              ? "Details de L'utilisateur"
              : 'Profil Utilisateur'}{' '}
          </h1>
        </div>

        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="font-weight-bold">
                  {firstLetterUc(user.nom) + ' ' + firstLetterUc(user.prenom)}
                </span>
                <span className="text-black-50">{user.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      name="nom"
                      disabled={detailsUser}
                      //value={user.nom}
                      defaultValue={user.nom}
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
                      disabled={detailsUser}
                      //value={user.nom}
                      defaultValue={user.prenom}
                      onChange={setUpdatedUser}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Service</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Service"
                      value={firstLetterUc(user.service)}
                      name="service"
                      disabled={true}
                    />
                  </div>
                  {detailsUser ? (
                    <div className="col-md-12">
                      <label className="labels">Role</label>
                      <select
                        onChange={(e) => {
                          setUpdatedUser(e);
                          setisDisabled(toggleBtnSave());
                        }}
                        className="form-control"
                        name="role"
                        id=""
                      >
                        {ROLES.map((role) => {
                          return <option value={role}> {role} </option>;
                        })}
                      </select>
                    </div>
                  ) : (
                    <div className="col-md-12">
                      <label className="labels">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Role"
                        value={firstLetterUc(user.role)}
                        name="role"
                        disabled={true}
                      />
                    </div>
                  )}
                  {/* <div className="col-md-12">
                    <label className="labels">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Postcode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Area</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email id"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Education</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="education"
                      value=""
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="country"
                      value=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">State/Region</label>
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      placeholder="state"
                    />
                  </div>*/}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience">
                  <span>Edit Experience</span>
                  <span className="border px-3 p-1 add-experience">
                    <i className="fa fa-plus"></i>&nbsp;Experience
                  </span>
                </div>
                <br />
                <div className="col-md-12">
                  <label className="labels">Date de service</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="experience"
                    value={formatDate(user.createdAt)}
                    disabled={true}
                  />
                </div>{' '}
                <br />
                <div className="col-md-12">
                  <label className="labels">
                    Date de derniere Modification{' '}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="additional details"
                    value={formatDate(user.updatedAt)}
                    disabled={true}
                  />
                </div>
                <div className="col-md-12" style={{ marginTop: '18px' }}>
                  <button
                    className="btn btn-primary profile-button form-control"
                    type="button"
                    onClick={saveProfile}
                    disabled={isDisabled}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;
