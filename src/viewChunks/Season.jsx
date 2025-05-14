import React, { useEffect, useState } from "react";

const Season = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p11.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p12.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p13.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p14.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p15.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p16.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p17.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p18.jpeg",
                url: "#",
            },
            {
                store_name: "MarketPrime Official",
                image: "/assets/images/p19.jpeg",
                url: "#",
            },
        ]);
    }, []);

    return (
        <div className="for-the-season relative">
            <img
                src="/assets/images/cmas1.png"
                alt=""
                className="absolute"
                id="cmas1"
            />
            <img
                src="/assets/images/cmas2.png"
                alt=""
                className="absolute"
                id="cmas2"
            />
            <div className="head flex flex-col gap-3">
                <p className="fnt-integral">For The Season</p>
                <p className="fnt-medium text-lg">Save up to 20% off!</p>
            </div>
            <div className="no-scrollbar content">
                <div className="no-scrollbar flex gap-2" id="focr2119ta">
                    {data.map((_d, i) => (
                        <div
                            key={i}
                            className="fts-item flex shadow-md relative hover:shadow-lg"
                        >
                            <div
                                className="img bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${_d.image}')`,
                                }}
                            ></div>
                            <div className="actions absolute top-0 left-0 w-full h-full flex items-end justify-end">
                                <div className="flex flex-col items-end p-2 gap-2 w-full">
                                    <p className="text-white fnt-bold text-xs">
                                        {_d.store_name}
                                    </p>
                                    <a
                                        href={_d.url}
                                        className="brdls hover:shadow-md flex items-center justify-center"
                                    >
                                        <i className="fa fa-arrow-right fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fts-cta flex items-center justify-center m-2">
                <a href="">See Deals</a>
            </div>
        </div>
    );
};

export default Season;
