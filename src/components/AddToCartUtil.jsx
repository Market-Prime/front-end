/* eslint-disable react/prop-types */
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Cart, DeliveryBike } from "./svgs";
import ReactLoading from "react-loading";

const AddToCart = ({
    numberToAdd = 0,
    maxQty = 0,
    setNumberToAdd = () => {},
    decreaseQtyBtnDisableCondition = true,
    increaseQtyBtnDisableCondition = true,
    addToCartBtnDisableCondition = true,
    addToCartFunction = () => {},
    isUploading = false,
}) => {
    return (
        <div className="space-y-2 items-center">
            <div className="flex gap-4 items-center justify-center">
                <p className="text-xs">Quantity</p>
                <div className="flex gap-2 items-center rounded-md">
                    <button
                        className="p-1 rounded-sm bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={decreaseQtyBtnDisableCondition}
                        onClick={() => {
                            if (numberToAdd > 0)
                                setNumberToAdd((prev) => prev - 1);
                        }}
                    >
                        <FaMinus className="text-xs" />
                    </button>
                    <p className="text-xs text-center w-fit font-semibold aspect-square text-blue-800 p-2 ">
                        {numberToAdd}
                    </p>
                    <button
                        className="p-1 rounded-sm bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={increaseQtyBtnDisableCondition}
                        onClick={() => {
                            if (numberToAdd <= maxQty)
                                setNumberToAdd((prev) => prev + 1);
                        }}
                    >
                        <FaPlus className="text-xs" />
                    </button>
                </div>
            </div>
            <div className="flex p-2 items-center justify-center">
                <button
                    onClick={addToCartFunction}
                    disabled={addToCartBtnDisableCondition}
                    className="flex items-center justify-center gap-1 w-full rounded-3xl p-2 bg-[#002366] text-white text-xs font-semibold text-center disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#002466dd]"
                >
                    {isUploading ? (
                        <ReactLoading
                            type="spin"
                            height={20}
                            width={20}
                            className="mx-auto"
                        />
                    ) : (
                        <>
                            <Cart /> Add to Cart
                        </>
                    )}
                </button>
            </div>
            <div className="flex items-center justify-center gap-2">
                <DeliveryBike />
                <p className="text-sm font-semibold text-green-600">Flexible Delivery Nationwide</p>
            </div>
        </div>
    );
};


export default AddToCart;