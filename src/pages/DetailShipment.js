import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
import CardLayanan from "../components/CardLayanan"
import ProfileSaldo from "../components/ProfileSaldo"
import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Button,
  Form,
  Table,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { API } from "config/api";
import axios from "axios";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StyledEngineProvider } from '@mui/material/styles';

// import Barang from "../assets/images/barang1.jpg";

  const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function DetailShipment() {
  const param = useParams()
const location = useLocation();
  console.log("param", param.id)

  const [detailShipment, setDetailShipment] = useState([]);
    const [detailStatus, setDetailStatus] = useState([]);
const TOKEN = localStorage.getItem('token')
  const fetchDetailShipment = () => {
      // setIsLoading(true);
      axios
        .get(`${API}/shipments/${param.id}`
  )
        .then(function (response) {
          // setIsLoading(false);
         setDetailShipment(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const fetchDetailShipmentStatus = () => {
      // setIsLoading(true);
      axios
        .get(`${API}/log-status/${param.id}`
  )
        .then(function (response) {
          // setIsLoading(false);
         setDetailStatus(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  console.log("detailStatus", detailStatus?.data?.data[detailStatus?.data?.data?.length - 1])
  


      useEffect(() => {
        fetchDetailShipment();
        fetchDetailShipmentStatus();
      
      }, []);

  return (
      <>
    <div className="container-fluid">
 <NavBar />
    </div>


    <section id="layanan">
      <div className="container">
        <div className="row mt-5">
           <div class="card">
  <div class="card-body">
    <div className="row py-3 ">
      <div className="col d-flex align-items-center justify-content-center">
            
          <div className="avatar-container" >
  <img src={require(`../assets/images/profile-photo.png`)} alt="Avatar" className="avatar-img"/>

</div>
      </div>
      <div className="col mt-3">
       <div className="row fw-semibold">
         Transporter
       </div>
       <div className="row fw-light">
        {detailShipment?.data?.data?.[0]?.nama}
       </div>
       <div className="row fw-semibold mt-3">
         Phone
       </div>
       <div className="row fw-light">
        {detailShipment?.data?.data?.[0]?.phone}
       </div>
        <div className="row fw-semibold mt-3">
        Rute
       </div>
       <div className="row fw-light">
        {detailShipment?.data?.data?.[0]?.loc_asal} - {detailShipment?.data?.data?.[0]?.loc_tujuan}
       </div>
      
      </div>
      <div className="col mt-3">
          <div className="row fw-semibold">
        Kendaraan
       </div>
       <div className="row fw-light">
        {detailShipment?.data?.data?.[0]?.jenis_kendaraan}
       </div>
        <div className="row fw-semibold mt-3">
        Start at
       </div>
       <div className="row fw-light">
        {detailShipment?.data?.data?.[0]?.create_time}
       </div>
      </div>
    </div>
  </div>
</div>

     

        </div>
               <div className="row mt-5">
                
          <div className="col d-flex align-items-center justify-content-center">
            <div className="row">
      <img src={require(`../assets/images/truck.png`)} alt="Avatar"  className={`icon-truck ${
        detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status !== 'on going'?
        `d-none`
        :''
      }`}/>
      </div>
      {
         detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status == 'on going'?
           <div className="row fw-semibold">
         
        {detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status}
     
      </div>
      :""
      }
    
     </div>
     <div className="col ">
    
          <div className="row d-flex align-items-center justify-content-center">
      <img src={require(`../assets/images/truck.png`)} alt="Avatar"  className={`icon-truck ${
        detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status !== 'on the way'?
        `d-none`
        :''
      }`}/>
      </div>
      {
         detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status == 'on the way'?
           <div className="row fw-semibold d-flex align-items-center justify-content-center">
         
        {detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status}
     
      </div>
      :""
      }
     </div>
     <div className="col d-flex align-items-center justify-content-center">
         <div className="row">
      <img src={require(`../assets/images/truck.png`)} alt="Avatar"  className={`icon-truck ${
        detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status !== 'complete'?
        `d-none`
        :''
      }`}/>
      </div> 
       {
         detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status == 'complete'?
           <div className="row fw-semibold">
         
        {detailStatus?.data?.data[detailStatus?.data?.data?.length - 1]?.status}
     
      </div>
      :""
      }
     </div>
     
        </div>
        <div className="row mt-3">
          <div className="col">
          
       <div class="progress">
          <div class="progress-bar" role="progressbar" style={{"width": "33%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-success" role="progressbar" style={{"width": "33%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-info" role="progressbar" style={{"width": "34%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    
     </div>
     
        </div>
      </div>
    </section>
   
    </>
  );
}
