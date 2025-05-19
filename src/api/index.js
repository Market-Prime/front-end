import axios from "axios";
import { serverUrl } from "./config.js";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const prepareData = (payload, formData = new FormData(), parentKey = "") => {
    Object.keys(payload).forEach((key) => {
        const value = payload[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (
            value instanceof File ||
            (typeof File !== "undefined" && value instanceof Blob)
        ) {
            formData.append(formKey, value);
        } else if (typeof value === "object" && value !== null) {
            prepareData(value, formData, formKey);
        } else {
            formData.append(formKey, value);
        }
    });
    return formData;
};

const extractErrorMessage = (error) => {
    const errorData =
        error && error.response && error.response.data
            ? error.response.data
            : null;
    let errorMessage =
        (errorData && errorData.error) ||
        (errorData && errorData.detail) ||
        (errorData && errorData.message) ||
        error.message ||
        "An unexpected error occurred.";
    if (typeof errorMessage != String) {
        errorMessage = JSON.stringify(errorMessage);
    }
    return errorMessage;
};

const handleRequest = async (request) => {
    try {
        const response = await request;
        return response.data;
    } catch (err) {
        throw extractErrorMessage(err);
    }
};

const ApiController = () => {
    const apiClient = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
    });

    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                config.headers["Content-Type"] = "application/json";
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        (response) => response,

        async (error) => {
            const originalRequest = error.config;
            if (
                error &&
                error.response &&
                error.response.status === 401 &&
                window.__mp_user_xhrse_isTrue &&
                originalRequest &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            if (token) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            return apiClient(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;
                try {
                    const response = await axios.post(
                        `${serverUrl}/account/login/refresh/`,
                        {
                            refresh:
                                localStorage.getItem("refreshToken") || "token",
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.data && response.data.access) {
                        localStorage.setItem(
                            "accessToken",
                            response.data.access
                        );
                    }
                    const token = localStorage.getItem("accessToken");
                    processQueue(null, token);
                    isRefreshing = false;
                    if (token) {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    isRefreshing = false;
                    window.location.href = `/account/login?redirect=${window.location.pathname}`;
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return {
        login: async (payload) => {
            try {
                const response = await axios.post(
                    `${serverUrl}/account/login`,
                    prepareData(payload),
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorMessage(error);
            }
        },
        signup: async (payload) => {
            try {
                const response = await axios.post(
                    `${serverUrl}/account/register/`,
                    prepareData(payload),
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorMessage(error);
            }
        },
        confirmEmail: async (payload) => {
            try {
                const response = await axios.post(
                    `${serverUrl}/account/confirm/`,
                    prepareData(payload),
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.log(error);
                throw extractErrorMessage(error);
            }
        },
        addItemsToCart: (payload) =>
            handleRequest(
                apiClient.post("/account/carts/", prepareData(payload))
            ),
        getCartItems: () => handleRequest(apiClient.get("/account/carts/")),
        deleteCartItem: (pid) =>
            handleRequest(apiClient.delete(`/account/carts/?pid=${pid}`)),
        getProductDetails: (pid) =>
            handleRequest(apiClient.get(`/products/${pid}/`)),
        getProductItem: (id) =>
            handleRequest(apiClient.get(`/product-item/${id}/`)),
    };
};

export default ApiController();
