import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Transaksi({token}) {
  const [loading, setLoading] = useState(false);
  const [transaksi, setTransaksi] = useState(null);

  const navigate = useNavigate();

  let URL_IMG = 'http://127.0.0.1:8000/storage/';

  const { transaksi_id } = useParams();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`transaksi/${transaksi_id}`); 
      setTransaksi(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []); 
  
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
        <table className="table">
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
          <h4>Bukti Pembayaran</h4>
          <Link data-bs-toggle="modal" data-bs-target="#modal_img">
            <img src={URL_IMG + transaksi?.bukti_pembayaran} alt={transaksi?.nama_bisnis} className='img-fluid mb-3 rounded-2' width={400} height={400} />
          </Link>
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
          
        </div>
      </div>
    </div>
  )
}

export default Transaksi;