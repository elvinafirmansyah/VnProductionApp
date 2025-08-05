import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function UpdateTransaksi({token}) {
  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState(null);
  const [transaksi, setTransaksi] = useState(null);

  const [file, setFile] = useState()

  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  let URL_IMG = 'http://127.0.0.1:8000/storage/';

  const { transaksi_id } = useParams();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`transaksi/${transaksi_id}`); 
      setTransaksi(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []); 

  const konfirmasi = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foto", file);

    api.post(`transaksi/${transaksi_id}/update`, formData).then(({data}) => {
      navigate('/')
      console.log(data);
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
          <h1 className="display-5 fw-bold text-body-emphasis">Transaksi {transaksi_id}</h1>
          <p className="lead mb-4">Admin &gt; <Link to='/'>Beranda</Link></p>
        </div>
        <div className='d-flex flex-row sm:flex-column gap-4'>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">No. Transaksi</th>
                <th scope="col">Nama User</th>
                <th scope="col">Nama Paket Sponsor</th>
                <th scope="col">Rekening Transfer</th>
                <th scope="col">Nama Bisnis</th>
                <th scope="col">Provider Transfer</th>
                <th scope="col">No. Rekening</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{transaksi?.id}</th>
                <td>{transaksi?.user?.nama}</td>
                <td>{transaksi?.sponsor?.nama}</td>
                <td>{transaksi?.rekening_transfer}</td>
                <td>{transaksi?.nama_bisnis}</td>
                <td>{transaksi?.provider_transfer}</td>
                <td>{transaksi?.no_rekening}</td>
                <td>{transaksi?.email}</td>
                <td>{transaksi?.status}</td>
              </tr>
                
            </tbody>
          </table>
          <div>
            <div class="card">
              <div class="card-header">
                Bukti Pembayaran
              </div>
              <div class="card-body">
                <Link data-bs-toggle="modal" data-bs-target="#modal_img" className='hover:cursor-pointer'>
                  <img src={URL_IMG + transaksi?.bukti_pembayaran} alt={transaksi?.nama_bisnis} className='img-fluid mb-3 rounded-2' width={400} height={400} />
                </Link>
              </div>
            </div>
          </div>

        </div>
        
        <div className="modal fade" id="modal_img" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Bukti Pembayaran</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <TransformWrapper
                defaultScale={1}
                defaultPositionX={1}
                defaultPositionY={1}
              >
                <TransformComponent>
                  <img src={URL_IMG + transaksi?.bukti_pembayaran} alt={transaksi?.nama_bisnis} className='img-fluid mb-3' />
                </TransformComponent>
              </TransformWrapper>
              </div>
            </div>
          </div>
        </div>
        

        <div>
          
          <div className='card border-0 p-3 bg-body-tertiary my-3'>
            <div className="card-body">
              <h2>Konfirmasi</h2>
              <form onSubmit={konfirmasi}>
                  <div className="mb-2">
                      <label htmlFor="foto">Foto Bukti</label>
                      <input type="file" className="form-control" id="foto" name="foto" accept="image/*" onChange={handleFile}/>
                  </div>

                  <button type="submit" className="btn btn-warning w-100">
                      Konfirmasi
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateTransaksi;