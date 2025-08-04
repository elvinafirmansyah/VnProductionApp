import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api.js';

function Register({setTokenData, token, user}) {
  const [form, setForm] = useState({
    'nama': '',
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

  const register = (e) => {
    e.preventDefault();
    api.post('auth/user/register', form).then(({data}) => {
      
      if (data.error) {
        console.log(data.error)
        setErrors(data?.error || {});
        return;
      }
      
      setTokenData(data.token);
      navigate('/')
      // console.log(data);
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
          <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Register</h5>
              </div>
              <div className="card-body">
                  <form onSubmit={register}>
                      <div className="mb-2">
                          <label htmlFor="nama">Nama</label>
                          <input type="text" className="form-control" id="nama" name="nama" onChange={handleChange}/>
                          {errors?.nama && <p className='text-danger'>{errors.nama[0]}</p>}
                      </div>
                      <div className="mb-2">
                          <label htmlFor="email">Email</label>
                          <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
                          {errors?.email && <p className='text-danger'>{errors.email[0]}</p>}
                      </div>

                      <div className="mb-3">
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
                          {errors?.password && <p className='text-danger'>{errors.password[0]}</p>}
                      </div>

                      <button type="submit" className="btn btn-primary w-100">
                          Register
                      </button>
                  </form>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Register;