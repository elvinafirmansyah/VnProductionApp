import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api/api.js';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";

function HomeAdmin({token, user}) {
  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState(null);
  const [transaksi, setTransaksi] = useState(null);

  const [currentParam, setCurrentParam] = useSearchParams();
  const [size, setSize] = useState(parseInt(currentParam.get("size")) || 10);
  const [page, setPage] = useState(parseInt(currentParam.get("page")) || 1);
  const updateParams = new URLSearchParams();

  let URL_IMG = 'http://127.0.0.1:8000/storage/';

  const handleChange = (e) => {
    const int = parseInt(e.target.value)
    setSize(int)
    if (int) {
      updateParams.set("page", page);
      updateParams.set("size", int);
      setCurrentParam(updateParams);
    }
    getData();
  } 

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`transaksi?page=${page}&size=${size}`); 
      setTransaksi(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []); 

  const fetchPrevLink = (e, link) => {
    e.preventDefault();
    const params = new URL(link)
      .searchParams;
    const pageParams = parseInt(params.get("page"));
    setPage(pageParams);
    updateParams.set("page", pageParams);
    updateParams.set("size", pageParams);
    setCurrentParam(updateParams);
    getData();
  }
  
  useEffect(() => {
    getData();
    if (user?.role === "admin") {
      if (!updateParams.has("page")) updateParams.set("page", page);
      if (!updateParams.has("size")) updateParams.set("size", size);

      setCurrentParam(updateParams)
    }
  }, [getData])

  

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className='row gap-1'>
        <div className="row py-5 my-5 d-flex align-items-center text-center bg-body-tertiary">
          <h1 className="display-5 fw-bold text-body-emphasis">Beranda</h1>
          <p className="lead mb-4">Admin &gt; <Link to='/'>Beranda</Link></p>
        </div>
        <div>
          <div>
          <p className='mb-0'>Data</p>
          <form>
            <select className="form-select w-auto" aria-label="Default select example" name='size' onChange={handleChange} value={size}>
              <option value="10" defaultValue={10}>10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <input type="submit" name="submit" value="Submit" hidden></input>
          </form>
        </div>
        <table className="table table-striped table-striped-rows">
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
            {transaksi?.data?.map((_, idx) => {
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
                    {_?.status === "menunggu" && <Link to={`/transaksi/update/${_?.id}`} className="btn btn-warning">Update</Link>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
    {/* Pagination Link */}
    <ul className="pagination">
      {
        transaksi?.links?.map((link,index) => (
            <li key={index} className="page-item">
                <button style={{cursor: 'pointer'}} className={`page-link ${link?.active ? 'text-success' : ''}`} onClick={(e) => fetchPrevLink(e, link?.url)}>
                    {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                </button>
            </li>
        ))
      }
      </ul>
    </div>
  )
}

export default HomeAdmin;