import React, { useState, useEffect } from 'react';
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
} from '../helpers/utils';
import axios from 'axios';
import { config } from '../config';
import { Link, Outlet } from 'react-router-dom';

function Compagnie() {
  const user = getLocalStorage(LS_USER_KEY);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${config.baseUrl}/entreprises/list/`,
      });
      const users = await result.data;
      console.log(users);
      setAllUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBlockedUser = async (id) => {
    try {
      const result = await axios({
        method: 'PATCH',
        url: `http://localhost:3500/api/admin/blockedUser/${id}/?token=${user.userToken}`,
      });
      const userData = await result.data;
      if (userData) {
        const usersUpdate = allUsers.map((user) => {
          return user.id == userData.id ? userData : user;
        });
        setAllUsers(usersUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detail = (user) => {
    localStorage.setItem('detailsUser', JSON.stringify(user));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Compagnies</h1>
        <a className="d-none d-sm-inline-block btn btn-sm shadow-sm" style={{backgroundColor:'#ef7900'}}>
          <i className="fa fa-plus fa-sm text-white-50"></i>
          <Link className="nolinkstyle" to={'addCompagnie'}>
            {' '}
            Ajouter une compagnie{' '}
          </Link>
        </a>
      </div>
      {/* <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Nombre compagnies
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {addZeroOrNo(allUsers.length)}
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    class="fa fa-users fa-2x text-gray-300"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    compagnies Bloqués
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {addZeroOrNo(
                      allUsers.filter((user) => user.isBlocked).length
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    class="fa fa-user-times fa-2x text-gray-300"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    compagnies Verifiés
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {addZeroOrNo(
                          allUsers.filter((user) => user.emailVerified).length
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: '50%' }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fa-solid fa-user-check fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Nombres D'admin
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {addZeroOrNo(
                      allUsers.filter((user, index) => user.role === 'admin').length
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fa-solid fa-lock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="table-responsive">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">
                <label className="control control--checkbox">
                  <input type="checkbox" className="js-check-all" />
                  <div className="control__indicator"></div>
                </label>
              </th>
              <th scope="col">id</th>
              <th scope="col">Nom</th>
              <th scope="col">Contact</th>
              {/* <th scope="col">Details</th> */}
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <label className="control control--checkbox">
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                  </td>
                  <td> {user.id} </td>
                  <td> {firstLetterUc(user.nom)} </td>
                  <td> {firstLetterUc(user.contact)} </td>
                  {/* <td>
                    <a
                      style={{ cursor: 'pointer' }}
                      className="more"
                      onClick={() => {
                        detail(user);
                      }}
                    >
                      <Link to={`details/${user.id}`}>Details </Link>
                    </a>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compagnie;
