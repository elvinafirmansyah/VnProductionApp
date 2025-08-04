import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/api.js';
import { Link } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";

function TransaksiSaya({token}) {
  const [loading, setLoading] = useState(false);
  const [transaksi, setTransaksi] = useState(null);

  const [size, setSize] = useState(5);

  let URL_IMG = 'http://127.0.0.1:8000/storage/';

  const handleChange = (e) => {
    setSize(e.target.value);
    console.log(size);
  } 

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`transaksi_saya`); 
      // console.log(data.data);
      setTransaksi(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty array ensures the function is memoized correctly
  
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
          <h1 className="display-5 fw-bold text-body-emphasis">Transaksi Saya</h1>
          <p className="lead mb-4">User &gt; <Link to='/transaksisaya'>Transaksi Saya</Link></p>
        </div>
        <table className="table table-striped table-striped-rows ">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama User</th>
              <th scope="col">Nama Paket Sponsor</th>
              <th scope="col">Rekening Transfer</th>
              <th scope="col">Nama Bisnis</th>
              <th scope="col">Provider Transfer</th>
              <th scope="col">No. Rekening</th>
              <th scope="col">Email</th>
              <th scope="col">Bukti Pembayaran</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi?.length > 0 ? (
              (transaksi?.map((_, idx) => {
                return(
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{_?.user?.nama}</td>
                    <td>{_?.sponsor?.nama}</td>
                    <td>{_?.rekening_transfer}</td>
                    <td>{_?.nama_bisnis}</td>
                    <td>{_?.provider_transfer}</td>
                    <td>{_?.no_rekening}</td>
                    <td>{_?.email}</td>
                    <td>
                      <img src={URL_IMG + _?.bukti_pembayaran} alt={_?.nama_bisnis} className='img-fluid' width={140} height={140} />
                    </td>
                    <td>{_?.status}</td>
                    <td>
                      <Link to={`/transaksi/${_?.id}`} className="btn btn-primary">Lihat</Link>
                    </td>
                  </tr>
                )
              }))
            ) : (
              <tr>Tidak ada transaksi</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransaksiSaya;