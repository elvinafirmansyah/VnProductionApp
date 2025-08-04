import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";


function Sponsor({token}) {
  const [form, setForm] = useState({
    'provider_transfer': '',
    'email': '',
    'no_rekening': '',
    'nama_bisnis': '',
  })

  const [file, setFile] = useState()
  const [providerRekening, setProviderRekening] = useState(null);

  const [loading, setLoading] = useState(true);
  
  const [sponsor, setSponsor] = useState(null);
  const [transaksi, setTransaksi] = useState(null);
  
  const { id } = useParams();

  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const getData = useCallback(async () => {
    try {
      const { data } = await api.get(`sponsors/${id}`);
      setSponsor(data);
      console.log(data);
      setLoading(false);

      // const providerResp = await api.get(`provider_transfer/${}`)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  const getTransaksi = useCallback(async () => {
    try {
      const { data } = await api.get('transaksi_saya'); 
      setTransaksi(data);

      // console.log(transaksi)
    } catch (error) {
      console.error("Error fetching data transaksi:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({...form, 
      [name]: value
    });

    if (name === "provider_transfer") {
      const providerData = sponsor?.provider_transfers?.find((provider) => provider.nama === value);
      setProviderRekening(providerData.rekening_transfer)
    }
  } 

  const createTransaksi = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("provider_transfer", form.provider_transfer);
    formData.append("rekening_transfer", providerRekening);
    formData.append("no_rekening", form.no_rekening);
    formData.append("email", form.email);
    formData.append("nama_bisnis", form.nama_bisnis);


    console.log(formData)
    formData.append("bukti_pembayaran", file);

    api.post(`transaksi/${id}/create`, formData).then(({data}) => {
      navigate('/')
      console.log(data);
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(() => {
    getData();
    getTransaksi();
  }, [getData, getTransaksi]);

  const style = {
    "width": "18rem"
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* jumbotron */}
      <div className='row py-5 my-5 d-flex align-items-center'>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis">{sponsor?.nama}</h1>
          <div className="col-lg-6">
            <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div className="d-grid gap-2 d-sm-flex">
              <h3 type="button" className="px-4 gap-3 btn-success btn rounded-3 border-0">Oleh: {sponsor?.admin?.nama}</h3>
            </div>
          </div>
        </div>
        <div className='col-lg-6 '>

          <h2 className='fw-bold'>Fitur:</h2>
          <div className="list-group mb-3">
            {sponsor?.benefits?.map((benefit) => (
              <div key={benefit?.id}>
                <Link  to="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                  <div className="d-flex gap-2 w-100 align-items-center">
                      <FaCheckCircle className='text-success' />
                      <h6 className="mb-0">{benefit?.nama}</h6>
                  </div>
                </Link>
                </div>
              ))}
          </div>
        </div>

      </div>
      {/* form */}
      <div className="col-md-12">
          <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Mau Menjadi Mitra?</h5>
              </div>
              <div className="card-body">
                  <form onSubmit={createTransaksi}>
                      <div className='row mb-2'>
                        <div className="col-lg-8">
                          <label htmlFor="provider_transfer">Provider Transfer</label>
                          <select className="form-select" aria-label="Default select example" name='provider_transfer' onChange={handleChange}>
                          <option defaultValue={''} >Pilih Provider Transfer</option>
                          {sponsor?.provider_transfers?.map((provider) => (
                            <option key={provider?.id} value={provider?.nama}>{provider?.nama}</option>
                          ))}
                          </select>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="provider_rekening">Rekening Transfer</label>
                            <h4><span class="badge text-bg-light">{providerRekening}</span></h4>
                        </div>
                      </div>

                      <div className="mb-3">
                          <label htmlFor="password">No. Rekening</label>
                          <input type="text" className="form-control" id="no_rekening" name="no_rekening" onChange={handleChange}/>
                      </div>

                      <div className="mb-3">
                          <label htmlFor="nama_bisnis">Nama Bisnis</label>
                          <input type="text" className="form-control" id="nama_bisnis" name="nama_bisnis" onChange={handleChange}/>
                      </div>

                      <div className="mb-2">
                          <label htmlFor="email">Email</label>
                          <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
                      </div>

                      <div className="mb-2">
                          <label htmlFor="bukti_pembayaran">Bukti Pembayaran</label>
                          <input type="file" className="form-control" id="bukti_pembayaran" name="bukti_pembayaran" accept="image/*" onChange={handleFile}/>
                      </div>

                      <div className="mb-3">
                          <label htmlFor="total">Total</label>
                          <h4>Rp. {sponsor?.harga}</h4>
                      </div>

                      <button type="submit" className="btn btn-success w-100">
                          Buat
                      </button>
                  </form>
              </div>
          </div>
      </div> 

    </>
  )
}

export default Sponsor;