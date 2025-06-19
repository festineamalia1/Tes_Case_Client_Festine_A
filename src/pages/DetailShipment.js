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

// import Barang from "../assets/images/barang1.jpg";

export default function DetailShipment() {
  const param = useParams()
const location = useLocation();
  console.log("param", param.id)
  const [detailShipment, setDetailShipment] = useState([]);
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
  
  console.log("detailShipment", detailShipment)
  


      useEffect(() => {
        fetchDetailShipment();
        
      
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
        {detailShipment?.data?.data?.[0]?.loc_asal} -   {detailShipment?.data?.data?.[0]?.loc_tujuan}
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
          <div className="col ">
      
     </div>
     
        </div>
      </div>
    </section>
   
    </>
  );
}
