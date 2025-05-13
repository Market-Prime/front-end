import React, { useEffect, useState } from "react";
import { CartAdd } from "../svgs";
import RenderStars from "../RatingStarsGenerator";

const ProductListItem1 = ({ data }) => {
    return (
        <a
            href={`/product-detail?p-id=${data.id}`}
            className="p-1 hover:shadow-md"
        >
            <div className="flex flex-col pl1">
                <div
                    className="w-full bg-slate-200 bg-cover bg-no-repeat bg-center aspect-square rounded-md relative"
                    style={{
                        backgroundImage: `url(${data?.base_image})`,
                    }}
                >
                    {data.flash_deal && (
                        <div className="absolute top-1 left-1 flex-col flex items-start gap-1">
                            {data.flash_deal.deal_tags.map((flash_data) => (
                                <span
                                    className={`${
                                        flash_data.type == 0
                                            ? "text-red-400 bg-red-200/25"
                                            : "text-blue-400 bg-blue-200/25"
                                    } flex flex-col items-center justify-center backdrop-blur-sm px-1 rounded-lg  text-xs pl1-tag`}
                                >
                                    {flash_data.name}
                                </span>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className="p-1 rounded-md backdrop-blur-sm flex flex-col items-center justify-center absolute bottom-1 right-1 hover:shadow-md transition-all"
                    >
                        <CartAdd size="20px" />
                    </button>
                </div>
                <div className="flex flex-col gap-1 p-1">
                    <div>
                        <p className="name text-sm fnt-bold">{data.name}</p>
                        <p className="desc text-xs">
                            {data.description.substr(0, 45)}
                            {data.description.length >= 45 && "..."}
                        </p>
                    </div>
                    <div className="rating-cont">
                        {data.rating && <RenderStars rating={data.rating} />}
                    </div>
                    <div className="price-cont">
                        <p className="price">
                            <span className="text-xs">NGN</span>
                            <span className="txt-brand text-sm fnt-bold">
                                {data.price}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ProductListItem1;
