import React, { useState } from "react";
import ApiClient from "../api";
import publishNotification from "../utils/publishNotification";
import ReactLoading from "react-loading";

const LoginForm = () => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        setIsLoading(true);
        await ApiClient.login(formData)
            .then((data) => {
                if (!(data.access && data.refresh)) {
                    publishNotification({
                        notificationType: "alert",
                        messageTitle: "Unknown Error. Please try again",
                        autoClose: true,
                        timeToAutoClose: 10000,
                    });
                    return;
                }
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                if (data.user_class == 0) {
                    window.location.href = "https://admin.marketprime.io";
                    return;
                } else if (data.user_class == 2) {
                    window.location.href = "https://vendors.marketprime.io";
                    return;
                }
                publishNotification({
                    notificationType: "success",
                    messageTitle: "Login Sucessful. Please wait",
                    autoClose: true,
                    timeToAutoClose: 5000,
                });

                const currentPath = window.location.pathname;
                if (
                    !(
                        currentPath == "/account/login" ||
                        currentPath == "/account/login/"
                    )
                ) {
                    return window.location.reload();
                }
                let redirectTo = "/";
                const params = new URLSearchParams(window.location.search);
                if (params.has("redirect")) redirectTo = params.get("redirect");

                setTimeout(() => {
                    window.location.href = redirectTo;
                }, 300);
            })
            .catch((err) => {
                console.log(err);
                publishNotification({
                    notificationType: "alert",
                    messageTitle: err,
                    autoClose: true,
                    timeToAutoClose: 10000,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="txt flx-col items-center">
                <p className="head">Login to your account</p>
                <p className="pre">Input your details to login</p>
            </div>
            <div className="input-cont flx-col">
                <label htmlFor="email">Email</label>
                <div className="input-context flx items-center">
                    <input
                        type="email"
                        name="email"
                        id="login-email"
                        className="brdls bgls"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="input-cont flx-col">
                <label htmlFor="">Password</label>
                <div className="input-context flx items-center">
                    <input
                        type="password"
                        name="password"
                        id="login-password"
                        className="brdls bgls"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            });
                        }}
                    />
                    <button type="button" id="auth-pswd-toogle">
                        <i className="fa fa-eye"></i>
                    </button>
                </div>
            </div>
            <div className="auth-tc flx-col items-center justify-center">
                <p className="txt">
                    By continuing you agree to MarketPrime&apos;s
                </p>
                <p>
                    <a href="">Terms and Conditions</a>
                </p>
            </div>
            <div className="input-cont">
                <input
                    type="checkbox"
                    name="remme"
                    id="remme"
                    className="mr-2"
                />
                <label htmlFor="remme">Remember me</label>
            </div>
            <div className="input-cont">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    {isLoading ? (
                        <ReactLoading
                            type="spin"
                            height={20}
                            width={20}
                            className="mx-auto"
                        />
                    ) : (
                        <>Continue</>
                    )}
                </button>
            </div>
        </>
    );
};

export default LoginForm;
