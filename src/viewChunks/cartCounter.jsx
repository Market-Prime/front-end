import React, { useEffect, useState } from "react";
import { getCartCount } from "../db";




const CartCounter = () => {
    const [cartNumber, setCartNumber] = useState(0);

    useEffect(() => {
        const handleUpdate = () => {
            getCartCount().then(setCartNumber);
        };

        handleUpdate(); //running this here to ensure cart update onmount of count counter

        window.addEventListener("cart_updated", handleUpdate);
        return () => {
            window.removeEventListener("cart_updated", handleUpdate);
        };
    }, []);

    return <>{cartNumber}</>;
};

export default CartCounter;
