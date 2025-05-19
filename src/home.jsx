import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import axios from "axios";
import { serverUrl } from "./api/config";

import NavCategoryFlow from "./viewChunks/NavCategoryFlow";
import FlashSaleListing from "./viewChunks/FlashSale";
import TopStores from "./viewChunks/TopStores";
import Season from "./viewChunks/Season";
import NewArrivals from "./viewChunks/NewArrivals";
import HeaderUserIconDropDown from "./viewChunks/HeaderUserDropDown";
import ConfirmEmail from "./pages/confirmEmail";
import ProductDetail from "./viewChunks/ProductDetails";
import LoginForm from "./viewChunks/LoginForm";
import SignupForm from "./viewChunks/SignupForm";
import CartCounter from "./viewChunks/cartCounter";
import refreshCart from "./utils/refreshCart";
import UserCart from "./viewChunks/UserCart";
import SetDelivery from "./viewChunks/SetDelivery";
import ProductDetailModal from "./viewChunks/productDetailModal";
import ToastNotification from "./components/ToastNotification";

const renderChunks = () => {
    const containers = [
        { id: "cat199an6rr2e", component: <NavCategoryFlow /> },
        { id: "nsri2xe", component: <HeaderUserIconDropDown /> },
        { id: "19233hAzQw4x", component: <FlashSaleListing /> },
        { id: "41XQnmpy47", component: <TopStores /> },
        { id: "emttrye14559", component: <Season /> },
        { id: "46889dretr", component: <NewArrivals /> },
        { id: "294uuei", component: <ConfirmEmail /> },
        { id: "f1sub03", component: <ProductDetail /> },
        { id: "modal-login", component: <LoginForm /> },
        { id: "modal-register", component: <SignupForm /> },
        { id: "cart-counter", component: <CartCounter /> },
        { id: "hres214", component: <UserCart /> },
        { id: "hme19255", component: <SetDelivery /> },
        { id: "pqm21nzett6", component: <ProductDetailModal /> },
        { id: "jjwoopn8900nmp", component: <ToastNotification /> },
    ];

    containers.forEach(({ id, component }) => {
        const container = document.getElementById(id);
        if (container) {
            const root = createRoot(container);
            root.render(component);
        }
    });
};

const getAuthState = async () => {
    const token = window.localStorage.getItem("refreshToken") || "token";
    axios
        .post(
            `${serverUrl}/account/login/refresh/`,
            {
                refresh: token,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then((response) => {
            const accessToken = response.data.access;
            window.localStorage.setItem("accessToken", accessToken);
            window.__mp_user_xhrse_isTrue = true;
        })
        .catch((err) => {
            console.log(err);
            window.__mp_user_xhrse_isTrue = false;
        })
        .finally(() => {
            const _evnt = new CustomEvent("u_ath_st");
            document.dispatchEvent(_evnt);
        });
};

getAuthState();
renderChunks();
(async () => {
    await refreshCart();
})();
