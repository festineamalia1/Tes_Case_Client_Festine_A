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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay} from 'swiper/modules';

// import Barang from "../assets/images/barang1.jpg";

export default function Home() {

const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [dataBalance, setDataBalance] = useState([]);
  const [dataService, setDataService] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);

const TOKEN = localStorage.getItem('token')
console.log('TOKEN', TOKEN)
  const fetchDataProfile = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/profile`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
        // setIsLoading(false);
       setUserData(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  const fetchDataBalance = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/balance`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
        // setIsLoading(false);
       setDataBalance(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    const fetchDataBanner = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/banner`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
        // setIsLoading(false);
       setDataBanner(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    const fetchDataService = () => {
    // setIsLoading(true);
    axios
      .get(`${API}/services`, 
        {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
)
      .then(function (response) {
        // setIsLoading(false);
       setDataService(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


console.log("data benner", dataBanner?.data?.data)



  useEffect(() => {
    fetchDataProfile();
    fetchDataBalance();
    fetchDataService();
    fetchDataBanner();
  }, []);

  
  console.log("userData", userData?.data?.data?.first_name);

  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>
    <section id="profile-saldo">
       <ProfileSaldo
       firstName={userData?.data?.data?.first_name}
       lastName={userData?.data?.data?.last_name}
       foto={userData?.data?.data?.profile_image}
       balance={dataBalance?.data?.data?.balance}
       />
    </section>

    <section id="layanan">
      <div className="container">
        <div className="row mt-5">
            <div className="col">
            <div class="list-layanan">
              {dataService?.data?.data &&
                      dataService?.data?.data?.map((data, i) => (
              <CardLayanan
              fotoService={data?.service_icon}
              namaLayanan={data?.service_name}
              idLayanan={data?.service_code}
              tarifLayanan={data?.service_tariff}
              />
              ))}
                
            </div>
            </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            
            <Swiper
        slidesPerView={4.3}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper"
      >
         {dataBanner?.data?.data &&
                      dataBanner?.data?.data.map((data, i) => (
        <SwiperSlide> <img src={`${data?.banner_image}`} alt="banner" className="banner-image"/> </SwiperSlide>
          ))}
      </Swiper>
    
          </div>
        </div>
      </div>
    </section>
   
    </>
  );
}
