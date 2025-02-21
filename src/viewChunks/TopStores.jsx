import React, { useEffect, useState } from "react";
import StoreCard from "../components/listings/StoreCard";

const TopStores = () => {
    const [TopStoresData, setTopStoresData] = useState([]);

    useEffect(() => {
        if (window.__TOP_STORES_DATA__) {
            setTopStoresData(window.__TOP_STORES_DATA__);
        }
    }, [window.__TOP_STORES_DATA__]);


    return (
        <>
            {TopStoresData.map((item) => (
                <StoreCard data={item} />
            ))}
        </>
    );
};
export default TopStores;
