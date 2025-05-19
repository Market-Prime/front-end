import React, { useState } from "react";
import ApiClient from "../api";
import publishNotification from "../utils/publishNotification";
import ReactLoading from "react-loading";

const SignupForm = () => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const signup = async () => {
        setIsLoading(true);
        await ApiClient.signup(formData)
            .then((data) => {
                publishNotification({
                    notificationType: "success",
                    messageTitle: "Registration successful",
                    autoClose: true,
                    timeToAutoClose: 1000,
                });
                publishNotification({
                    notificationType: "caution",
                    messageTitle:
                        "We've sent a verification email. Kindly check your inbox to continue.",
                    autoClose: true,
                    timeToAutoClose: 10000,
                });
                let redirectTo = "/s?q=trending";
                const params = new URLSearchParams(window.location.search);
                if (params.has("redirect")) redirectTo = params.get("redirect");
                setTimeout(() => {
                    window.location.href = redirectTo;
                }, 500);
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
                <p className="head">Welcome to Market Prime</p>
                <p className="pre">Input your details to create an account</p>
            </div>
            <div className="input-group">
                <div className="input-cont flx-col">
                    <label for="email">Email</label>
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
                    <label for="phone_number">Phone</label>
                    <div className="input-context flx items-center">
                        <input
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            className="brdls bgls"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    phone_number: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="input-group">
                <div className="input-cont flx-col">
                    <label for="first_name">First Name</label>
                    <div className="input-context flx items-center">
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="brdls bgls"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    first_name: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="input-cont flx-col">
                    <label for="last_name">Last Name</label>
                    <div className="input-context flx items-center">
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="brdls bgls"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    last_name: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="input-group">
                <div className="input-cont flx-col">
                    <label for="password">Password</label>
                    <div className="input-context flx items-center">
                        <input
                            type="text"
                            name="password"
                            className="brdls bgls"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="input-cont flx-col">
                    <label for="confirm_password">Confirm Password</label>
                    <div className="input-context flx items-center">
                        <input
                            type="text"
                            name="confirm_password"
                            className="brdls bgls"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    confirm_password: e.target.value,
                                });
                            }}
                        />
                    </div>
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
                <button
                    disabled={isLoading}
                    className="disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        signup();
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

export default SignupForm;
