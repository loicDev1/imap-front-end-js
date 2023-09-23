import React, { useEffect, useState } from "react";
import { usePDF } from 'react-to-pdf';
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
  formatDate,
  formatHours,
} from "../helpers/utils";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

function GlobalReports() {
  const user = getLocalStorage(LS_USER_KEY);
  const [allLogsByuser, setallLogsByuser] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  const getAllLogsByUser = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `http://localhost:3500/api/user/logs/?token=${user.userToken}`,
      });
      const logs = await result.data;
      setallLogsByuser(logs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLogsByUser();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      width: 250,
    },
    {
      field: "typeOperation",
      headerName: "TYPE OPERATION",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "EFFECTUER LE",
      width: 150,
    },
    {
      field: "heure",
      headerName: "A",
      width: 140,
    },
    {
      field: "user",
      headerName: "PAR",
      width: 200,
    },
  ];

  const rows = allLogsByuser
    .map((row) => {
      return {
        id: row.id,
        description: row.description,
        typeOperation: row.typeOperation,
        createdAt: formatDate(row.createdAt),
        heure: formatHours(row.createdAt),
        user: firstLetterUc(row.user.nom) + " " + row.user.prenom,
      };
    })
    .reverse();
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Rapports Genereaux</h1>
          <button
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            onClick={() => toPDF()}
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </button>
        </div>

        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Earnings (Monthly)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $40,000
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
                      Earnings (Annual)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $215,000
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
                      Tasks
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          50%
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
                      Pending Requests
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
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

        <div className="table-responsive" ref={targetRef}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}

export default GlobalReports;
