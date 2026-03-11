import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HerbalLoader from "./components/HerbalLoader.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Labtest from "./pages/Labtest.jsx";
import Collector from "./pages/Collector.jsx";
import Admin from "./pages/Admin.jsx";
import Manufacturer from "./pages/Manufacturer.jsx";
import OilsPortal from "./pages/OilsPortal.jsx";
import CosmeticsPortal from "./pages/CosmeticsPortal.jsx";
import AyurvedaPortal from "./pages/AyurvedaPortal.jsx";


function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <HerbalLoader onComplete={() => setLoading(false)} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Labtest" element={<Labtest />} />
          <Route path="/Manufacturer" element={<Manufacturer />} />
          <Route path="/Collector" element={<Collector />} />
          <Route path="/Admin" element={<Admin />} />

          {/* Category Portal Routes */}
          <Route path="/portal/oils" element={<OilsPortal />} />
          <Route path="/portal/cosmetics" element={<CosmeticsPortal />} />
          <Route path="/portal/ayurveda" element={<AyurvedaPortal />} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
