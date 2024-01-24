import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import './style/sb-admin-2.css';
import './style/sb-admin-2.min.css';

import './style/tablestyleperso.css';
import './style/owl.carousel.min.css';
import './style/bootstrap.min.css.map';
import './style/bootstrap.min.css.map';
import './style/profil.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GlobalReports from './components/GlobalReports';
import Intervention from './components/Intervention';
import AllreadyLoggedIn from './components/AllreadyLoggedIn';
import Users from './components/users comps/Users';
import AddUser from './components/users comps/AddUser';
import Profil from './components/users comps/Profil';
import Setting from './components/users comps/Setting';
import SuivieIntervention from './components/SuivieIntervention';
import { Provider } from 'react-redux';
import { store } from './redux/redux';
import App from './App';
import Content from './components/Content';
import UserReport from './components/users comps/UserReport';
import DetailsUser from './components/users comps/DetailsUser';
import ForgotPassword from './components/ForgotPassword';
import AddInterventions from './components/interventions comps/AddInterventions';
import Notification from './components/Notification';
import AllNotifications from './components/AllNotifications';
import Diagnostic from './components/Diagnostic';
import Incidents from './components/Incidents';
import Compagnie from './components/Compagnie';
import SuivieIncidents from './components/SuivieIncidents';
import AddIncident from './components/AddIncident'
import AddCompagnie from './components/AddCompagnie';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
// library.add(fab, faCheckSquare, faCoffee)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/allreadyLoggedIn',
    element: <AllreadyLoggedIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'incidents',
        element: <Incidents />,
      },
      {
        path: 'incidents/addIncident',
        element: <AddIncident />,
      },
      {
        path: 'compagnie',
        element: <Compagnie />,
      },
      {
        path: 'compagnie/addCompagnie',
        element: <AddCompagnie />,
      },
      {
        path: 'users/addUser',
        element: <AddUser />,
      },
      {
        path: 'users/reports',
        element: <UserReport />,
      },
      {
        path: 'users/notification/:id',
        element: <Notification />,
      },
      {
        path: 'users/notifications',
        element: <AllNotifications />,
      },
      {
        path: 'users/details/:id',
        element: <DetailsUser />,
      },
      {
        path: 'users/notification/:id/diagnostic',
        element: <Diagnostic />,
      },
      {
        path: 'users/notifications/diagnostic',
        element: <Diagnostic />,
      },
      {
        path: 'interventions',
        element: <Intervention />,
      },
      {
        path: 'interventions/new',
        element: <AddInterventions />,
      },
      {
        path: 'reports',
        element: <GlobalReports />,
      },
      {
        path: 'profil',
        element: <Profil />,
      },
      {
        path: 'setting',
        element: <Setting />,
      },
      {
        path: 'suivieIntervention',
        element: <SuivieIntervention />,
      },
      {
        path: 'suivieIncidents',
        element: <SuivieIncidents />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
