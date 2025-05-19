import React from "react";

export const RatingStarFull = () => {
    return (
        <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
            />
        </svg>
    );
};

export const RatingStarHalf = () => {
    return (
        <svg
            width="9"
            height="17"
            viewBox="0 0 9 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.56595 16.9793L8.99999 13.956V0.255005L6.38079 5.89491L0.207535 6.6431L4.76203 10.8769L3.56595 16.9793Z"
                fill="#FFC633"
            />
        </svg>
    );
};

export const CartAdd = ({ size = "24px" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 5L19 12H7.37671M20 16H8L6 3H3M11.5 7L13.5 9M13.5 9L15.5 7M13.5 9V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const Cart = ({ size = 25 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={(24 * size) / 25}
            fill="none"
        >
            <path
                stroke="#E5EEFF"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.5 16 19 14.5 20.5 6"
            />
            <path
                stroke="#E5EEFF"
                strokeWidth={1.5}
                d="M6.5 6h16M6.5 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8.5 20h7"
            />
            <path
                stroke="#E5EEFF"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.5 2h3l3 14-1.368 2"
            />
        </svg>
    );
};

export const NotificationAlert = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
        >
            <path
                fill="#FF507A"
                fillRule="evenodd"
                d="M20 10c0 5.523-4.477 10-10 10H.994C.11 20-.332 18.923.292 18.293L2.25 16.32A9.959 9.959 0 0 1 0 10C0 4.477 4.477 0 10 0s10 4.477 10 10Zm-6.793-3.207a1 1 0 0 1 0 1.414L11.414 10l1.793 1.793a1 1 0 0 1-1.414 1.414L10 11.414l-1.793 1.793a1 1 0 0 1-1.414-1.414L8.586 10 6.793 8.207a1 1 0 0 1 1.414-1.414L10 8.586l1.793-1.793a1 1 0 0 1 1.414 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const NotificationCaution = () => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 10C20 15.5228 15.5228 20 10 20H0.993697C0.110179 20 -0.332289 18.9229 0.292453 18.2929L2.2495 16.3195C0.843343 14.597 1.21409e-08 12.397 1.21409e-08 10C1.21409e-08 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.99 6C10.99 5.44772 10.5446 5 9.99502 5C9.44549 5 9 5.44772 9 6V10C9 10.5523 9.44549 11 9.99502 11C10.5446 11 10.99 10.5523 10.99 10V6ZM9.99502 13C9.44549 13 9 13.4477 9 14C9 14.5523 9.44549 15 9.99502 15H10.005C10.5545 15 11 14.5523 11 14C11 13.4477 10.5545 13 10.005 13H9.99502Z"
                fill="#FFC400"
            />
        </svg>
    );
};

export const NotificationSuccess = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
        >
            <path
                fill="#31C440"
                fillRule="evenodd"
                d="M20 10c0 5.523-4.477 10-10 10H.994C.11 20-.332 18.923.292 18.293L2.25 16.32A9.959 9.959 0 0 1 0 10C0 4.477 4.477 0 10 0s10 4.477 10 10Zm-6.293-1.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                clipRule="evenodd"
            />
        </svg>
    );
};
