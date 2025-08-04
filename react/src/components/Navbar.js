import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IoMdNotifications } from "react-icons/io";

import api from '../api/api';

function Navbar({user, token, setTokenData}) {
  const navigate = useNavigate();
  // console.log(token)
  const logout = async (e) => {
    e.preventDefault();
    const { data } = await api.post("auth/user/logout");
    setTokenData(null);
    console.log(data.message);
    navigate('/login');
  }

  const logoutAsAdmin = async (e) => {
    e.preventDefault();
    const { data } = await api.post("auth/admin/logout");
    setTokenData(null);
    console.log(data.message);
    navigate('/login/admin');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-lg">
        <Link className="navbar-brand" to="/">Vn Production</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Beranda</Link>
                </li>
                {user?.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/sponsor">Sponsor</Link>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user?.user?.nama}
                  </Link>
                  {user?.role === "user" && (
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/transaksisaya">Transaksi Saya</Link></li>
                    </ul>
                  )}
                  {user?.role === "admin" && (
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/transaksisaya">Transaksi Saya</Link></li>
                    </ul>
                  )}
                </li>
                {user?.role === "user" && (
                  <li className="nav-item">
                    <Link className="rounded-circle btn py-2 btn-success position-relative" to='/pemberitahuan'>
                      <IoMdNotifications />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  {user?.role === "user" ? (
                    <Link className="nav-link" onClick={logout}>Logout</Link>
                  ) : (
                    <Link className="nav-link" onClick={logoutAsAdmin}>Logout</Link>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;