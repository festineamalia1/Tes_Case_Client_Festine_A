import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";

// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API } from "config/api";
const CardLayanan = ({dataShipment, dataTransporter, dataVehicle}) => {

  const [idTransporter, setIdTransporter] = useState();
    const [asal, setAsal] = useState();
     const [idEdit, setIdEdit] = useState();
      const [tujuan, setTujuan] = useState();
       const [vehicle, setVehicle] = useState();
  const target = useRef(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
  const handleEdit = (data) => {
    setShow(true)
    setIdEdit(data?.id_shipment)
    setAsal(data?.loc_asal)
    setTujuan(data?.loc_tujuan)
    setVehicle(data?.id_vehicle)
     setIdTransporter(data?.id_transporter)
  };

const handleEditData = ( e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/shipments/edit/${idEdit}`,
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
     
        alert("Edit Data Berhasil");
         window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };
 
  return (
    <>
      <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Nama Transporter</th>
          <th>Lokasi Asal</th>
          <th>Tujuan</th>
          <th>Phone</th>
          <th>Kendaraan</th>
          <th>Plat</th>
          <th>Status</th>
          <th>Create At</th>
           <th>Action</th>
        </tr>
      </thead>
      <tbody>
         {dataShipment?.data?.data &&
                      dataShipment?.data?.data?.map((data, i) => (
        <tr>
          <td>{i+1}</td>
          <td onClick={() => {navigate(`/detail-shipment/${data.id_shipment}`)}}>{data.nama}</td>
          <td>{data.loc_asal}</td>
          <td>{data.loc_tujuan}</td>
          <td>{data.phone}</td>
           <td>{data.jenis_kendaraan}</td>
           <td>{data.plat}</td>
            <td>{data.status}</td>
            <td>{data.create_time}</td>
            <td>
                            
                        
                           <button type="button" class="btn btn-warning"
                           onClick={() => handleEdit(data)}>Edit</button>
                         {" "}
                               <button type="button" class="btn btn-danger">Hapus</button>
                          </td>
        </tr>
        ))}
        
      </tbody>
    </Table>

       <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit data Shipment</Modal.Title>
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
              <Button variant="primary" 
               onClick={(e) => handleEditData(e)}
              >
                Tambah
              </Button>
            </Modal.Footer>
          </Modal>
     
          </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(CardLayanan);