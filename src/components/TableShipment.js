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
const CardLayanan = ({dataShipment}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  return (
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
        </tr>
        ))}
        
      </tbody>
    </Table>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(CardLayanan);