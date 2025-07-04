import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { redirect } from "react-router";

// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API, BASE_URL } from "config/api";
const NavBar = (props) => {
  const [active, setActive] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  const handleMenu = (link) => {
    navigate(`/${link}`)
    setActive(true)
  }

  return (
    <>
      {/* isLoading || !chanels.chanels ? ( // <h1>Loading...</h1>
      ) : error ? ( // <h1>error {error.message} </h1>
       ) : */}
<nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center">
         <div class="logo mb-2 d-flex align-items-center justify-content-center"  onClick={() => navigate(`/shipment`)}> 
          <img src={require(`../assets/images/free_shipping.png`)} alt="Logo" className=" shipping-logo w-60 px-2"/> 
          SHIPMENT
          </div>

      </a>

      <div class="ms-auto">
        <ul class="navbar-nav flex-row gap-3">
        
          <li className="nav-item nav-link-nonactive">
            <div class="nav-link " 
            onClick={() => handleMenu(`/`)}>Logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(NavBar);