import React, { useEffect, useState } from 'react';
import { usePDF } from 'react-to-pdf';
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
  formatDate,
  formatHours,
} from '../../helpers/utils';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfFile from '../PdfFile';

function UserReport() {
  const user = getLocalStorage(LS_USER_KEY);
  const [allLogsByuser, setallLogsByuser] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  const getAllLogsByUser = async () => {
    try {
      const result = await axios({
        method: 'GET',
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
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      width: 250,
    },
    {
      field: 'typeOperation',
      headerName: 'TYPE OPERATION',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'EFFECTUER LE',
      width: 180,
    },
    {
      field: 'heure',
      headerName: 'A',
      width: 140,
    },
    {
      field: 'user',
      headerName: 'PAR',
      width: 200,
    },
  ];

  const rows = allLogsByuser
    .filter((row) => {
      if (row?.user?.id === user?.id) {
        return {
          id: row?.id,
          description: row.description,
          typeOperation: row.typeOperation,
          createdAt: formatDate(row.createdAt),
          heure: formatHours(row.createdAt),
          user: 'Moi', //firstLetterUc(row.user.nom) + " " + row.user.prenom,
        };
      }
    })
    .reverse();

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Rapports Utilisateur</h1>
          <button
            className="d-none d-sm-inline-block btn btn-sm  shadow-sm"
            onClick={() => toPDF()}
            style={{backgroundColor:'#ef7900',color:'#fff'}}
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </button>
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

export default UserReport;
