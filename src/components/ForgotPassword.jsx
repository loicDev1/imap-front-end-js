import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../src/img/logo hgy.png'

import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError('');
      const result = await axios({
        method: 'POST',
        data: { email },
        url: 'http://localhost:3500/api/user/resetPassword',
      });
      const data = await result.data;
      if (data?.cause?.code) throw new Error(data.cause.code);
      setIsLoading(false);
      alert('un mailbox reset password vous a été envoyé');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
            <div className="row" style={{padding:'15px'}}>
                <div className="col-lg-6 d-none d-lg-block">
                  <img width={450} src={logo} alt="" />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Reset Password</h1>
                      <span style={{ color: 'red' }}> {error} </span>
                    </div>
                    <form className="user" onSubmit={resetPassword}>
                      <div className="form-group" style={{ marginTop: '12px' }}>
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="email Address..."
                          onChange={(event) => setEmail(event?.target.value)}
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
                        className="btn btn-primary btn-user btn-block persoposi"
                        type="submit"
                        disabled={isLoading || !email}
                      >
                        Reset password
                        {isLoading && <span className="loaderperso"></span>}
                      </button>
                    </form>
                    <div className="text-center">
                      <Link className="small" to={'/'}>
                        Login
                      </Link>
                    </div>
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

export default ForgotPassword;
