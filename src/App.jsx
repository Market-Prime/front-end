import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import AOS from "aos";
import "aos/dist/aos.css";
import Checkout from "./pages/Checkout";
import VirtualTryOn from "./pages/VirtualTryOn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchFilter from "./pages/SearchFilter/SearchFilter";
import Emailverification from "./pages/Emailverification";
import EmailConfirmation from "./pages/EmailConfirmation";
import ProductDescription from "./pages/ProductDescription/ProductDescription";
import PaymentModal from "./pages/PaymentModal";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Product from "./pages/AdminDashboard/Product";
import Orders from "./pages/AdminDashboard/Orders";
import VendorsAccount from "./pages/VendorsPage/VendorsAccount";
import VendorsLogin from "./pages/VendorsPage/VendorsLogin";
import VendorsVerifyEmail from "./pages/VendorsPage/VendorsVerifiedEmail";
import FinalSection from "./pages/VendorsPage/FinalSection";
import VendorDashboard from "./pages/VendorsPage/VendorDashboard";
import Product2 from "./pages/VendorsPage/Product2";
import Content from "./pages/VendorsPage/Content";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Cart/Checkout" element={<Checkout />} />
        <Route path="/VirtualTryOn" element={<VirtualTryOn />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Emailverification" element={<Emailverification />} />
        <Route path="/EmailConfirmation" />
        <Route path="/Login/Register" element={<Signup />} />
        <Route path="/Cart/Checkout/PaymentModal" element={<PaymentModal />} />
        <Route
          path="/Cart/Checkout/PaymentModal/PaymentConfirmation"
          element={<PaymentConfirmation />}
        />
        <Route
          path="/Login/Register/Emailverification"
          element={<Emailverification />}
        />
        <Route
          path="/Login/Register/Emailverification/EmailConfirmation"
          element={<EmailConfirmation />}
        />
        <Route path="/Search" element={<SearchFilter />} />
        <Route path="/ProductDescription" element={<ProductDescription />} />

        {/* Dashboard Route with nested routes */}
        <Route path="/VendorDashboard" element={<VendorDashboard />}>
          <Route index element={<Content />} /> {/* Default content */}
          <Route path="Product" element={<Product2 />} />
          <Route path="Orders" element={<Orders />} />
        </Route>

        <Route path="/VendorsAccount" element={<VendorsAccount />} />
        <Route path="/VendorsLogin" element={<VendorsLogin />} />
        <Route path="/VendorsVerifiedEmail" element={<VendorsVerifyEmail />} />
        <Route path="/FinalSection" element={<FinalSection />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminDashboard/Product" element={<Product />} />
        <Route path="/AdminDashboard/Orders" element={<Orders />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
