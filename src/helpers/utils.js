import { io } from 'socket.io-client';
import UnauthorizedComponent from '../components/UnauthorizedComponent';

export const LS_USER_KEY = 'user';

export const MOONTH = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'December',
];

export const ROLES = ['personnel', 'admin'];

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return undefined;
};

const isAuthorized = (key) => {
  if (localStorage.getItem(key)) {
    return true;
  }
  return false;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const protectComponentAcces = (component) => {
  // possibilité de faire un appel api pour verifier si le token est toujours valide
  // retourner UnauthorizedComponent  si le token nest pas valide
  // verifier aussi si le user est bloqueé
  if (isAuthorized(LS_USER_KEY)) {
    return component;
  } else {
    return <UnauthorizedComponent />;
  }
};

export const firstLetterUc = ([firstLeter, ...rest]) => {
  return firstLeter.toUpperCase() + rest.join('');
};

export const addZeroOrNo = (number) => {
  return number < 10 ? '0' + number : number;
};

export const formatDate = (date) => {
  return (
    addZeroOrNo(new Date(date).getUTCDate()) +
    ' ' +
    addZeroOrNo(MOONTH[new Date(date).getUTCMonth()]) +
    ' ' +
    new Date(date).getUTCFullYear()
  );
};

export const formatHours = (date) => {
  return (
    addZeroOrNo(new Date(date).getHours()) +
    'h : ' +
    addZeroOrNo(new Date(date).getMinutes()) +
    'mn : ' +
    addZeroOrNo(new Date(date).getSeconds()) +
    's'
  );
};


// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3500';
export const socket = io(URL);
