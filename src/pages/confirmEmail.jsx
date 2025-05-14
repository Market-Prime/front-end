import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import ApiClient from "../api";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const ConfirmEmail = () => {
    const [actionOnView, setActionOnView] = useState(0);

    const actionOnViewMap = {
        0: (
            <ReactLoading
                type="spin"
                color="#002366"
                className="mx-auto my-4"
            />
        ),
        1: (
            <IoIosCheckmarkCircleOutline className="mx-auto my-4 size-14 text-green-500" />
        ),
        2: (
            <div className="items-center justify-center flex">
                <button className="hover:shadow-md rounded-md py-1 px-4 mx-auto my-4">
                    Resend verification link
                </button>
            </div>
        ),
    };

    const textOnViewMap = {
        0: "Verifying your email.",
        1: "Verification Success",
        2: "Verification Failed",
    };

    const token = window.__CONFIRMATION_TOKEN__;

    useEffect(() => {
        const confirmEmail = async (token) => {
            await ApiClient.confirmEmail({ token })
                .then((data) => {
                    localStorage.setItem("accessToken", data?.access);
                    localStorage.setItem("refreshToken", data?.refresh);
                    toast.success(
                        data.message || "Email Verified, Please wait",
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                            style: { backgroundColor: "#0aa80a" },
                        }
                    );
                    setActionOnView(1);
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                })
                .catch((err) => {
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                        style: { backgroundColor: "#ea5454" },
                    });
                    setActionOnView(2);
                });
        };
        token && confirmEmail(token);
    }, [token]);
    return (
        <div className="flex flex-col items-center justify-center confirm-em">
            <ToastContainer />
            <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-full m-auto w-full py-10">
                <img
                    src="/static/images/logo.png"
                    alt="MarketPrime Logo"
                    className="text-center mx-auto rounded-xl w-9"
                />
                <h5 className="text-2xl text-center mt-5 font-semibold">
                    {textOnViewMap[actionOnView]}
                </h5>
                {actionOnView == 0 && (
                    <p className="mt-3 text-center w-2/3 mx-auto">
                        Please wait
                    </p>
                )}
                {actionOnViewMap[actionOnView]}
            </div>
        </div>
    );
};
export default ConfirmEmail;
