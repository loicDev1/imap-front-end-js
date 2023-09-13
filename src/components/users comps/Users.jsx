import React, { useState, useEffect } from "react";
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
} from "../../helpers/utils";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

function Users() {
  const user = getLocalStorage(LS_USER_KEY);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `http://localhost:3500/api/admin/users/?token=${user.userToken}`,
      });
      const users = await result.data;
      setAllUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBlockedUser = async (id) => {
    try {
      const result = await axios({
        method: "PATCH",
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
    localStorage.setItem("detailsUser", JSON.stringify(user));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Utilisateurs</h1>
        <a className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fa fa-plus fa-sm text-white-50"></i>
          <Link className="nolinkstyle" to={"addUser"}>
            {" "}
            Ajouter{" "}
          </Link>
        </a>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Nombre utilisateurs
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
                    Utilisateurs Bloqués
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
                    Utilisateurs Verifiés
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
                          style={{ width: "50%" }}
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
                      allUsers.filter((user) => user.role === "admin").length
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
      </div>

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
              <th scope="col">Id</th>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Bloquer</th>
              <th scope="col">Option</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              return (
                <tr>
                  <td>
                    <label className="control control--checkbox">
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                  </td>
                  <td> {user.id} </td>
                  <td> {firstLetterUc(user.nom) + " " + user.prenom} </td>
                  <td>{user.email}</td>
                  <td>
                    {firstLetterUc(user.role)}
                    {/* <small className="d-block">
                      Far far away, behind the word mountains
                    </small> */}
                  </td>
                  <td>
                    {user.emailVerified ? (
                      <span style={{ color: "green" }}>
                        {" "}
                        Verifié{" "}
                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        {" "}
                        Non verifié{" "}
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                      </span>
                    )}
                  </td>
                  <td className="pl-0">
                    <div className="d-flex align-items-center">
                      <label className="custom-control ios-switch">
                        <input
                          type="checkbox"
                          checked={user.isBlocked}
                          className="ios-switch-control-input"
                          onChange={() => {
                            toggleBlockedUser(user.id);
                          }}
                        />
                        <span className="ios-switch-control-indicator"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <a
                      style={{ cursor: "pointer" }}
                      className="more"
                      onClick={() => {
                        detail(user);
                      }}
                    >
                      <Link to={`details/${user.id}`}>Details </Link>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
