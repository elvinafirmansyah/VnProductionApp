// import logo from './logo.svg';
// import './App.css';
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useCallback, useEffect, useState } from "react";
import Login from "./components/Login";
import api from "./api/api";
import { get } from "jquery";
import Register from "./components/Register";
import Sponsor from "./components/Sponsor";
import LoginAdmin from "./components/admin/LoginAdmin";
import HomeAdmin from "./components/admin/HomeAdmin";
import UpdateTransaksi from "./components/admin/UpdateTransaksi";
import TransaksiSaya from "./components/TransaksiSaya";
import Transaksi from "./components/Transaksi";
import Notif from "./components/Notif";
import CreateSponsor from "./components/admin/CreateSponsor";
import SponsorAdmin from "./components/admin/Sponsor";

// localStorage.removeItem("SPONSORAPI_TOKEN");

function App() {

  const [token, setToken] = useState(localStorage.getItem("SPONSORAPI_TOKEN"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const setTokenData = (token) => {
    setToken(token);
    if (token) {
      localStorage.setItem("SPONSORAPI_TOKEN", token);
    } else {
      localStorage.removeItem("SPONSORAPI_TOKEN", token);
    }
  }

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/user'); 
      setUser(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  });
  
  useEffect(() => {
    if (!token) {
      navigate('/login'); 
      return;
    }
    getUser(); 
  }, [token]); 
  

  const style = {
    "height": "100vh"
  }
  
  if (loading) {
    return <div className="d-flex align-items-center justify-content-center" style={style}>Loading...</div>
  }

  return (
    <>
      <Navbar user={user} token={token} setTokenData={setTokenData} />
      <div className="container-lg py-4">
        <Routes>
          {user?.role === "user" ? (
            <>
              <Route path="/" element={<Home token={token} />} />
              <Route path="/transaksisaya" element={<TransaksiSaya token={token} />} />
              <Route path="/transaksi/:transaksi_id" element={<Transaksi token={token} />} />
              <Route path="/pemberitahuan" element={<Notif token={token} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomeAdmin token={token} user={user} />} />
              <Route path="/transaksi/update/:transaksi_id" element={<UpdateTransaksi token={token} />} />
              <Route path="/createsponsor" element={<CreateSponsor token={token} />} />
              <Route path="/sponsor" element={<SponsorAdmin token={token} />} />
            </>
          )}
          <Route path="/register" element={<Register setTokenData={setTokenData} />} />
          <Route path="/login" element={<Login setTokenData={setTokenData} />} />
          <Route path="/login/admin" element={<LoginAdmin setTokenData={setTokenData} />} />
          <Route path="/sponsor/:id" element={<Sponsor token={token} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
