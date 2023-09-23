import React, { useEffect, useState } from 'react';
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
  formatDate,
  formatHours,
} from '../helpers/utils';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

function Intervention() {
  const user = getLocalStorage(LS_USER_KEY);
  const [allIntervention, setAllIntervention] = useState([]);

  const getAllIntervention = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `http://localhost:3500/api/intervention/?token=${user.userToken}`,
      });
      const intervention = await result.data;
      setAllIntervention(intervention);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIntervention();
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'titre',
      headerName: 'TITRE',
      width: 250,
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      width: 250,
    },
    {
      field: 'status',
      headerName: 'STATUT',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'EFFECTUER LE',
      width: 150,
    },
    {
      field: 'user',
      headerName: 'PAR',
      width: 200,
    },
    {
      field: 'heure',
      headerName: 'A',
      width: 140,
    },
  ];

  const rows = allIntervention
    .map((row) => {
      return {
        id: row.user.id,
        titre: row.titre,
        description: row.description,
        status: row.status,
        user: firstLetterUc(row.user.nom) + ' ' + row.user.prenom,
        createdAt: formatDate(row.createdAt),
        heure: formatHours(row.createdAt),
      };
    })
    .reverse();
  console.log(rows);
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Gerer Interventions</h1>

          {user.role === 'personnel' && (
            <a className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fa fa-plus fa-sm text-white-50"></i>
              <Link className="nolinkstyle" to={'new'}>
                {' '}
                Creer une intervention{' '}
              </Link>
            </a>
          )}
        </div>

        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Interventions Soumis
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {addZeroOrNo(rows.length)}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
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
                      Interventions Initiées
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {addZeroOrNo(
                        rows.filter((row) => row.status === 'initié').length
                      )}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                      Interventions en cours
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {addZeroOrNo(
                            rows.filter((row) => row.status === 'enCours')
                              .length
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          {/* <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: '50%' }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
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
                      Interventions Achevées
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {
                        addZeroOrNo(
                          rows.filter((row) => row.status === 'acheve').length
                        )
                      }
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <DataGrid
            rows={
              user.role === 'personnel'
                ? rows.filter((row) => row.id == user.id).map((row) => row)
                : rows
            }
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}

export default Intervention;
