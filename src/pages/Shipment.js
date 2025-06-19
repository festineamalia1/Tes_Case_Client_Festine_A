import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
import CardLayanan from "../components/CardLayanan"
import TableShipment from "../components/TableShipment"
import ProfileSaldo from "../components/ProfileSaldo"
import ModalEdit from "../components/ModalEdit"
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
   const [dataTransporter, setDataTransporter] = useState([]);
   const [dataVehicle, setDataVehicle] = useState([]);
  const [show, setShow] = useState(false);


  const [idTransporter, setIdTransporter] = useState();
    const [asal, setAsal] = useState();
      const [tujuan, setTujuan] = useState();
       const [vehicle, setVehicle] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  


 
const navigate = useNavigate();


console.log("idTransporter", idTransporter)

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

    const fetchDataTransporter = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/transporters`
)
      .then(function (response) {
        // setIsLoading(false);
       setDataTransporter(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
    const fetchDataVehicle = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/vehicle`
)
      .then(function (response) {
        // setIsLoading(false);
       setDataVehicle(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


const handleTambah = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/shipments`,
        {

             loc_asal: asal,
      loc_tujuan: tujuan,
      id_transporter: idTransporter,
      id_vehicle: vehicle,
      create_time: "2025-06-17 19:12:50",
        id_user : 1
        }
      )
      .then(function (response) {
        console.log(response?.data?.data?.insertId);
        handleTambahStatus(response?.data?.data?.insertId)
        alert("tambah Data Berhasil");
         window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };

  const handleTambahStatus = (idNew) => {
    
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/log-status`,
        {
         id_shipment: idNew,
      update_time:"2025-06-17 19:12:50",
      status: "ongoing",
        id_user : 1
        }
      )
      .then(function (response) {
        console.log(response);
        alert("tambah Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };

   useEffect(() => {
      fetchDataShipment();
      fetchDataTransporter();
      fetchDataVehicle();
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
      <button type="button" class="btn btn-success"
      onClick={handleShow}
      >Tambah</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
        <div className="row mt-3">
      <TableShipment dataShipment={dataShipment} 
      dataTransporter={dataTransporter}
      dataVehicle={dataVehicle}
      />
    </div>
      </div>
       
    </section>

   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah data Shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
                    <div className="row">
                      <div className="col">
                        <label>Transporter</label>
                         <select class="form-select mt-2" id="floatingSelectDisabled" aria-label="Floating label disabled select example" 
                         value={idTransporter}
                         onChange={(e) => setIdTransporter(e.target.value)}>
                            <option selected >Open this select menu</option>
                               {dataTransporter?.data?.data &&
                      dataTransporter?.data?.data?.map((data, i) => (
                            <option value={data.id_transporter}>{data.nama}</option>
                            ))}
                          </select>
                      </div>
                     
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <label>Lokasi Asal</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Lokasi Asal"
                          value={asal}
                          onChange={(e) => setAsal(e.target.value)}
                        ></input>
                      </div>
                      <div className="col">
                        <label>Tujuan</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Lokasi Tujuan"
                          value={tujuan}
                          onChange={(e) => setTujuan(e.target.value)}
                        ></input>
                      </div>
                    </div>
                   <div className="row">
                      <div className="col">
                        <label>Jenis Kendaraan</label>
                         <select class="form-select mt-2" id="floatingSelectDisabled" aria-label="Floating label disabled select example"
                           value={vehicle}
                         onChange={(e) => setVehicle(e.target.value)}
                         >
                            <option selected>Open this select menu</option>
                               {dataVehicle?.data?.data &&
                      dataVehicle?.data?.data?.map((data, i) => (
                            <option value={data.id_vehicle}>{data.plat} {data.jenis_kendaraan}</option>
                            ))}
                          </select>
                      </div>
                     
                    </div>
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={(e) => handleTambah(e)}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
  
    </>
  );
}
