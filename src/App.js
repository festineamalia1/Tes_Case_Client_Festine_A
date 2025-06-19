import "./App.css";

import { API, setAuthToken } from "config/api";
import Switch from "react-bootstrap/esm/Switch";
import PrivateRoute from "./components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.css';
 import { HashRouter , Route, BrowserRouter, Routes } from "react-router-dom";
//  import 'bootstrap-icons/font/bootstrap-icons.css';
import LandingPage from "pages/LandingPage";
import Home from "pages/Home";
import TopUp from "pages/Shipment";
import DetailShipment from "pages/DetailShipment";
import Transaksi from "pages/Transaksi";
import AkunPage from "pages/AkunPage";
import './tailwind.css'
function App() {
  return (
    <div className="App">
 <HashRouter >
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
         <Route exact path="/home" element={<Home/>} /> 
  <Route exact path="/shipment" element={<TopUp/>} /> 
  <Route exact path="/detail-shipment/:id" element={<DetailShipment/>} /> 
  <Route exact path="/transaksi" element={<Transaksi/>} /> 
  <Route exact path="/akun-page" element={<AkunPage/>} /> 
  
          
        </Routes>

      </HashRouter>
    </div>
  );
}

export default App;
