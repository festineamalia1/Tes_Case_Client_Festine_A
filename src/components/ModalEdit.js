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
// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API } from "config/api";
const ModalEdit = ({show, handleClose}) => {
   const [idTransporter, setIdTransporter] = useState();
     const [asal, setAsal] = useState();
       const [tujuan, setTujuan] = useState();
        const [vehicle, setVehicle] = useState();

  return (
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
                         onChange={(e) => setIdTransporter(e.target.value)}
                         >
                            <option selected >Open this select menu</option>
                               {/* {dataTransporter?.data?.data &&
                      dataTransporter?.data?.data?.map((data, i) => (
                            <option value={data.id_transporter}>{data.nama}</option>
                            ))} */}
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
                               {/* {dataVehicle?.data?.data &&
                      dataVehicle?.data?.data?.map((data, i) => (
                            <option value={data.id_vehicle}>{data.plat} {data.jenis_kendaraan}</option>
                            ))} */}
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
          // onClick={(e) => handleTambah(e)}
          >
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(ModalEdit);