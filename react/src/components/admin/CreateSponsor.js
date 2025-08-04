import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { error } from 'jquery';


function CreateSponsor({token}) {
  const [form, setForm] = useState({
    'nama': 'Paket Diamond Sponsorship',
    'harga': '300000',
    'benefit': '',
    'provider_transfer': '',
    'rekening_transfer': '',
  })

  const [benefits, setBenefits] = useState([
    "Post Sosial Media Iklan", "Dibuatkan Banner Gratis"
  ]);
  const [providers, setProviders] = useState([
    {
      "nama": "BCA",
      "rekening_transfer": "59524961984",
    }
  ]);
  const [errors, setErrors] = useState(null);

  const [loading, setLoading] = useState(false);
  
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({...form, 
      [name]: value
    });
  } 

  const createTransaksi = (e) => {
    e.preventDefault();

    const formData = {
        "nama": form.nama,
        "harga": form.harga,
        "benefits": benefits,
        "provider_transfers": providers
    }

    api.post(`sponsor/create`, formData).then(({data}) => {
      if (data.error) {
        setErrors(data.error)
        console.log(data.error)
        return;
      }
      navigate('/sponsor')
      console.log(data);
    }).catch((e) => {
      console.log(e);
    })
  }

  const createBenefit = (e) => {
    e.preventDefault();
    benefits.push(form.benefit);
    setForm({...form, "benefit": ""});
  }

  const createProviderTransfer = (e) => {
    e.preventDefault();

    if (isNaN(parseInt(form.rekening_transfer))) {
      alert("Rekening harus number!!")
      return;
    }

    let providerObj = {
      "nama": form.provider_transfer,
      "rekening_transfer": form.rekening_transfer,
    }

    console.log(providerObj);
    providers.push(providerObj);

    setForm({...form, "provider_transfer": "", "rekening_transfer": ""});
  }


  useEffect(() => {
    // getTransaksi();
  }, []);

  const style = {
    "width": "18rem"
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* jumbotron */}
      <div className="row py-5 my-5 d-flex align-items-center text-center bg-body-tertiary">
        <h1 className="display-5 fw-bold  text-body-emphasis">Sponsor Form</h1>
        <p className="lead mb-4">User &gt; <Link to='/createsponsor'>Create Sponsor</Link></p>
      </div>
      {/* form */}
      <div className="col-md-12">
          <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                <h5 className="mb-0">Buat Sponsor</h5>
              </div>
              <div className="card-body">
                  {/* Fitur */}
                  <form onSubmit={createBenefit} className='mb-2 row d-flex justify-content-center align-items-center'>
                    <div className='col-lg-10'>
                    {errors?.benefits && <p className='text-danger'>Kolom fitur harus diisi!</p>}
                      <label htmlFor="benefit" className='fw-bold '>Fitur</label>
                      <input type="text" className="form-control w-100" id="benefit" name="benefit" value={form.benefit} onChange={handleChange}/>
                    </div>
                    <div className='col-lg-2'>
                      <button type='submit' className='btn btn-primary w-100'>Tambah</button>
                    </div>
                  </form>
                  {benefits.length > 0 && (
                    <div className="mb-3">
                      <label htmlFor="harga" className='fw-bold '>List Fitur</label>
                      <ul className="list-group">
                        {benefits?.map((b, idx) => (
                          <li key={idx} className="list-group-item">{idx + 1}. {b}</li>
                        ))}
                      </ul>
                  </div>
                  )}
                  {/* layanan Transfer */}
                  {errors?.provider_transfers && <p className='text-danger'>Kolom provider transfer harus diisi!</p>}
                  <label htmlFor="provider_transfer" className='fw-bold '>Provider Transfer / Penyedia Layanan Transfer</label>
                  <form onSubmit={createProviderTransfer} className='mb-2 row d-flex justify-content-center align-items-center bg-body-tertiary mx-1 p-2'>
                    <div className='col-lg-10'>
                      <div className='mb-2'>
                        <label htmlFor="provider_transfer" className=''>Nama</label>
                        <input type="text" className="form-control w-100" id="provider_transfer" name="provider_transfer" required value={form.provider_transfer} onChange={handleChange}/>
                      </div>

                      <div className='mb-2'>
                        <label htmlFor="provider_transfer" className=''>No. Rekening</label>
                        <input type="text" className="form-control w-100" id="rekening_transfer" name="rekening_transfer" required value={form.rekening_transfer} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className='col-lg-2'>
                      <button type='submit' className='btn btn-primary w-100'>Tambah</button>
                    </div>
                  </form>
                  {providers.length > 0 && (
                    <div className="mb-3">
                      <label htmlFor="harga" className='fw-bold '>List Provider Transfer</label>
                      <ol class="list-group list-group-numbered">
                        {providers?.map((b, idx) => (
                          <li class="list-group-item d-flex justify-content-between align-items-start" key={idx}>
                            <div class="ms-2 me-auto" key={idx}>
                              <div class="fw-bold">{b.nama}</div>
                              {b.rekening_transfer}
                            </div>
                          </li>
                        ))}
                        
                      </ol>
                  </div>
                  )}
                  {/* Form Nama dan Harga */}
                  <form onSubmit={createTransaksi}>
                      <div className="mb-3">
                      {errors?.nama && <p className='text-danger'>Kolom nama harus diisi!</p>}
                          <label htmlFor="nama" className='fw-bold '>Nama</label>
                          <input type="text" className="form-control" id="nama" name="nama" value={form.nama} onChange={handleChange}/>
                      </div>


                      <div className="mb-3">
                      {errors?.harga && <p className='text-danger'>Kolom harga harus diisi!</p>}
                          <label htmlFor="harga" className='fw-bold '>Harga</label>
                          <input type="text" className="form-control" id="harga" name="harga" value={form.harga} onChange={handleChange}/>
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

export default CreateSponsor;