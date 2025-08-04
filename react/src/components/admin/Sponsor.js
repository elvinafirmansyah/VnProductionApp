import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api/api';
import { Link } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";

function SponsorAdmin({token}) {
  const [loading, setLoading] = useState(true);
  const [sponsors, setSponsors] = useState(null);

  const getData = useCallback(async () => {
    try {
      const { data } = await api.get('sponsors'); 
      setSponsors(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const destroy = (e, id) => {
    e.preventDefault();
    api.delete(`sponsor/${id}/delete`).then(({data}) => {
      console.log(data.message);
      getData();
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
      <div className="row py-5 my-5 d-flex align-items-center text-center bg-body-tertiary">
        <h1 className="display-5 fw-bold text-body-emphasis">Sponsor </h1>
        <p className="lead mb-4">Admin &gt; <Link to='/sponsor'>Beranda</Link></p>
        <div className='col-lg-12'>
          <Link className='btn btn-success' to='/createsponsor'>Buat</Link>
          </div>
      </div>
      
      <div className='row gap-2'>
        {sponsors?.map((sponsor) => (
          <div className='col-lg-3 col-md-4' key={sponsor?.id}>
            <div className="card border-0 bg-body-tertiary rounded-4 p-3" style={style}>
              <div className="card-body">
                <div className='d-flex justify-content-between'>
                  <h5 className="card-title fw-bold">{sponsor?.nama}</h5>
                  <p className="card-text">Rp. {sponsor?.harga}</p>
                </div>
                <p>Oleh: {sponsor?.admin?.nama}</p>
                <p className='fw-bold'>Fitur:</p>
                <div className="list-group mb-3">
                  {sponsor?.benefits?.map((benefit) => (
                    <div key={benefit?.id}>
                      <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        <div className="d-flex gap-2 w-100 align-items-center">
                            <FaCheckCircle />
                            <h6 className="mb-0">{benefit?.nama}</h6>
                        </div>
                      </Link>
                      </div>
                    ))}
                </div>
                <div className='d-flex gap-2'>
                  <Link to={`/sponsor/${sponsor?.id}`} className="btn btn-success">Lihat</Link>
                  <Link onClick={(e) => destroy(e, sponsor?.id)} className="btn btn-danger">Hapus</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SponsorAdmin;