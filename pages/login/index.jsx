import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-5">Login Form</h2>
            <div className="text-center mb-5 text-dark">Made by WALID</div>
            <div className="card my-5">
              <form className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXnC3fwMwkbIt3ejGRIw3NmbDyUtgS5g2jA&usqp=CAU"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-color px-5 mb-5 w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                  Not Registered?{" "}
                  <a href="#" className="text-dark fw-bold">
                    {" "}
                    Create an Account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
