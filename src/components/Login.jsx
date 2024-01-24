import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../src/img/logo hgy.png'
import { config } from '../config';
import {
  setLocalStorage,
  getLocalStorage,
  LS_USER_KEY,
} from '../helpers/utils';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nom, setNom] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      const result = await axios({
        method: 'POST',
        data: { nom, password },
        url: `${config.baseUrl}/admins/login/`,
      });
      const { data } = result;
      if (data.response?.error) throw new Error(data.response.error);
      //dispatch(setUser(data));
      
      // if (getLocalStorage(LS_USER_KEY)) {
      //   return navigate('/allreadyLoggedIn');
      // } else {
      //   setLocalStorage(LS_USER_KEY, data);
      // }
      setLocalStorage(LS_USER_KEY, {...data , role : 'admin'})
      navigate('/dashboard/users');

      // switch (data.role) {
      //   case 'admin':
      //     navigate('/dashboard/users');
      //     break;
      //   case 'personnel':
      //     navigate('/dashboard/interventions');
      //     break;
      //   default:
      //     break;
      // }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row" style={{padding:'15px'}}>
                {/* <div className="col-lg-6 d-none d-lg-block">
                  <img width={450} src={logo} alt="" />
                </div> */}
                <div className="">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Login</h1>
                      <span style={{ color: 'red' }}> {error} </span>
                    </div>
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group" style={{ marginTop: '12px' }}>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="nom"
                          onChange={(event) => setNom(event?.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={(event) => setPassword(event?.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        className="btn  btn-user btn-block persoposi"
                        type="submit"
                        disabled={isLoading}
                        style={{backgroundColor:'#ef7900',color:'#fff'}}
                      >
                        Login
                        {isLoading && <span className="loaderperso"></span>}
                      </button>
                    </form>
                    <div className="text-center">
                      <Link className="small" to={'forgotPassword'}>
                        Forgot Password?
                      </Link>
                    </div>
                    {/* <div className="text-center">
                      <a className="small" href="register.html">
                        Create an Account!
                      </a>
                    </div> */}
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

export default Login;
