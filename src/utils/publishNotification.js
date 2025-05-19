const publishNotification = ({
    notificationType,
    messageTitle,
    messageBody,
    autoClose,
    timeToAutoClose,
}) => {
    const _evnt = new CustomEvent("publish_notification", {
        detail: {
            notificationType,
            messageTitle,
            messageBody,
            autoClose,
            timeToAutoClose,
        },
    });
    window.dispatchEvent(_evnt);
};


export default publishNotification;