import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    NotificationAlert,
    NotificationCaution,
    NotificationSuccess,
} from "./svgs";
import { GrFormClose } from "react-icons/gr";

const ToastNotification = () => {
    const [activeNotifications, setActiveNotifications] = useState([]);

    const closeNotification = (id) => {
        setActiveNotifications((prev) =>
            prev.filter((notif) => notif.id !== id)
        );
    };
    useEffect(() => {
        const handleNotification = (e) => {
            const {
                notificationType,
                messageTitle,
                messageBody,
                autoClose,
                timeToAutoClose,
            } = e.detail;
            const id = uuidv4();

            const newNotification = {
                id,
                notificationType,
                messageTitle,
                messageBody,
                autoClose,
                timeToAutoClose,
            };
            setActiveNotifications((prev) => {
                const notifications = [...prev, newNotification];
                return notifications.slice(-5);
            });

            if (autoClose) {
                const timer = setTimeout(() => {
                    closeNotification(id);
                }, timeToAutoClose);

                return () => clearTimeout(timer);
            }
        };

        window.addEventListener("publish_notification", handleNotification);

        return () => {
            window.removeEventListener(
                "publish_notification",
                handleNotification
            );
        };
    }, []);

    return (
        <div className="space-y-3">
            {activeNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className="bg-white relative overflow-hidden rounded shadow-md flex items-stretch animate-slide-in-2 min-w-80 max-md:max-w-96"
                >
                    <div
                        className={`p-1 ${
                            notification.notificationType === "alert"
                                ? "bg-[#FFDCE4]"
                                : notification.notificationType === "success"
                                ? "bg-[#DDF7E0]"
                                : "bg-[#FFF3CC]"
                        }`}
                    ></div>
                    <div className="w-full p-4 pt-6 flex items-start gap-2">
                        <div className="w-fit">
                            {notification.notificationType === "alert" ? (
                                <NotificationAlert />
                            ) : notification.notificationType === "success" ? (
                                <NotificationSuccess />
                            ) : (
                                <NotificationCaution />
                            )}
                        </div>

                        <div className="space-y-2 w-full">
                            <p className="text-bold text-sm">
                                {notification?.messageTitle}
                            </p>
                            <p className="text-sm">
                                {notification?.messageBody}
                            </p>
                        </div>
                    </div>
                    <button
                        className="absolute top-1 right-2 p-2"
                        onClick={() => {
                            closeNotification(notification.id);
                        }}
                    >
                        <GrFormClose />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastNotification;
