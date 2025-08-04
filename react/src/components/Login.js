import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { error } from 'jquery';

function Login({setTokenData, token, user}) {
  const [form, setForm] = useState({
    'email': '',
    'password': '',
  })

  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({...form, 
      [name]: value
    });

  } 

  const login = (e) => {
    e.preventDefault();
    api.post('auth/user/login', form).then(({data}) => {
      if (data.error) {
        setErrors(data);
        return;
      }
      setTokenData(data.token)
      navigate('/')
      console.log(data);
    }).catch((e) => {
      console.log(e.response.data.errors)
      setErrors(e.response?.data?.errors || {});
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
          <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Login</h5>
              </div>
              <div className="card-body">
                  <form onSubmit={login}>
                      {errors?.error && <p className='text-danger'>{errors.error}</p>}
                      <div className="mb-2">
                          <label htmlFor="email">email</label>
                          <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
                          {errors?.email && <p className='text-danger'>{errors.email[0]}</p>}
                      </div>

                      <div className="mb-3">
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
                          {errors?.password && <p className='text-danger'>{errors.password[0]}</p>}
                      </div>

                      <p className='mb-3'><Link to="/login/admin" class="link-underline-primary">Login as Admin?</Link></p>

                      <button type="submit" className="btn btn-primary w-100">
                          Login
                      </button>
                  </form>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Login;