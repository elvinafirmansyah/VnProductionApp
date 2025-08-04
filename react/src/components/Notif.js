import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/api.js';
import { Link, useNavigate } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";

function Notif({token}) {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);

  const navigate = useNavigate();

  let URL_IMG = 'http://127.0.0.1:8000/storage/';

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`pemberitahuan`); 
      // console.log(data.data);
      setNotif(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const destroy = async (e, id) => {
    e.preventDefault();
    api.delete(`pemberitahuan/${id}/delete`).then(({data}) => {
      console.log(data);
      navigate('/pemberitahuan')
    }).catch((e) => {
      console.log(e);
    })
  }
  
  useEffect(() => {
    getData();
  }, [getData])
  
  const style = {
    "width": "18rem"
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className='row gap-1'>
        <div className="row py-5 my-5 d-flex align-items-center text-center bg-body-tertiary">
          <h1 className="display-5 fw-bold text-body-emphasis">Pemberitahuan</h1>
          <p className="lead mb-4">User &gt; <Link to='/pemberitahuan'>Pemberitahuan</Link></p>
        </div>
        <table className="table table-striped table-striped-rows ">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">No. Transaksi</th>
              <th scope="col">Nama</th>
              <th scope="col">Nama Bisnis Anda</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Foto Bukti</th>
              <th scope="col">Status Tranasksi</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {notif?.length > 0 && notif[0] !== null ? (
              (notif?.map((_, idx) => {
                return(
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{_?.transaksi_id}</td>
                    <td>{_?.nama}</td>
                    <td>{_?.transaksi?.nama_bisnis}</td>
                    <td>{_?.deskripsi}</td>
                    <td>
                      <img src={URL_IMG + _?.foto_bukti} alt={_?.nama} className='img-fluid' width={140} height={140} />
                    </td>
                    <td>{_?.transaksi?.status}</td>
                    <td>
                      <Link onClick={(e) => destroy(e, _?.id)} className="btn btn-danger">Delete</Link>
                    </td>
                  </tr>
                )
              }))
            ) : (
              <tr>Tidak ada notif</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notif;