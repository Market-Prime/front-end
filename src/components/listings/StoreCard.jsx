import React from "react";

const StoreCard = ({ data }) => {
    return (
        <div className="rounded-md hover:shadow-md p-2 flex items-center gap-2 bg-white">
            <div
                className="bg-cover w-16 bg-no-repeat bg-center aspect-square relative rounded-sm"
                style={{
                    backgroundImage: `url(${data?.store_splash_image})`,
                }}
            >
                <img
                    src={data.store_logo}
                    alt=""
                    className="w-8 h-8 rounded-full absolute top-1/2 -right-2"
                />
            </div>
            <div className="flex flex-col justify-between p-1 h-full">
                <p className="font-semibold text-sm">{data.business_name}</p>
                <p className="flex gap-1">
                    {data.niches.map((niche) => (
                        <span className="rounded-lg text-xs">
                            {niche}
                        </span>
                    ))}
                </p>
            </div>
            <a
                href=""
                className="flex items-center gap-2 text-blue-600 justify-center font-bold px-1 text-sm "
            >
                Browse
            </a>
        </div>
    );
};

export default StoreCard;
