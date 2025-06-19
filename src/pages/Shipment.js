import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
import CardLayanan from "../components/CardLayanan"
import TableShipment from "../components/TableShipment"
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

export default function Shipment() {


    const [dataShipment, setDataShipment] = useState([]);

  
  

 
const navigate = useNavigate();


console.log("dataBalance", dataShipment)

  const fetchDataShipment = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/shipments`
)
      .then(function (response) {
        // setIsLoading(false);
       setDataShipment(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };



   useEffect(() => {
      fetchDataShipment();
    }, []);

 
  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>
    <section id="shipment">
      <div className="container">
        <div className="row mt-5">
 <div class="card">
  <div class="card-body">
    <div className="row">
      <div className="col-md-10">
        <div className="input-group">
         <span className="input-group-text bg-white">
          <i class="bi bi-search"></i>
         </span>
         <input type="text" className="form-control border-start-0" placeholder="Cari Transporter"  />
       </div>
      </div>
      <div className="col d-flex  justify-content-end">
        <div className="col">
          <button type="button" class="btn btn-primary">Cari</button>
        </div>
         <div className="col">
      <button type="button" class="btn btn-success">Tambah</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
        <div className="row mt-3">
      <TableShipment dataShipment={dataShipment}/>
    </div>
      </div>
       
    </section>

   
   
    </>
  );
}
