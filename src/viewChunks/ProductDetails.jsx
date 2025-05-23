/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { setOffCartItem } from "../db";
import ApiClient from "../api";
import refreshCart from "../utils/refreshCart";
import { FaStar } from "react-icons/fa";
import AddToCart from "../components/AddToCartUtil";
import publishNotification from "../utils/publishNotification";
import ProductItemSelector from "../components/ProductItemSelector";
import { FiShare2 } from "react-icons/fi";
import { MdOutlineReport } from "react-icons/md";

const ProductDetail = () => {
    const [isUploading, setIsUploading] = useState(false);

    const [product, setProduct] = useState();
    const [items, setItems] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(0);

    const [filteredItems, setFilteredItems] = useState([]);
    const [onFinalSelection, setOnFinalSelection] = useState(false);

    const [noVariationNumberToAdd, setNoVariationNumberToAdd] = useState(0);
    const [variationNumberToAdd, setVariationNumberToAdd] = useState(0);

    const productHasNoVariation =
        items.length == 1 && items[0].variation_data.length == 0;

    useEffect(() => {
        const data = window.__CURRENT_PRODUCT__;
        console.log(data);
        if (data) {
            const { product, items, images } = data;
            setProduct(product);
            setItems(items);
            setImages([product?.base_image, ...images]);
        }
    }, []);

    const uploadToCart = async (items) => {
        setIsUploading(true);
        if (window.__mp_user_xhrse_isTrue) {
            await ApiClient.addItemsToCart({ items })
                .then(async () => {
                    await refreshCart();
                    publishNotification({
                        notificationType: "success",
                        messageTitle: "Product added to cart successfully!",
                        autoClose: true,
                        timeToAutoClose: 5000,
                    });
                })
                .catch((err) => {
                    publishNotification({
                        notificationType: "alert",
                        messageTitle:
                            "Unable to add product to cart, Please try again",
                        autoClose: false,
                    });
                    console.log(err);
                })
                .finally(() => {
                    setIsUploading(false);
                });
        } else {
            await setOffCartItem(items).finally(() => {
                setIsUploading(false);
                publishNotification({
                    notificationType: "success",
                    messageTitle: "Product added to cart successfully!",
                    autoClose: true,
                    timeToAutoClose: 5000,
                });
                publishNotification({
                    notificationType: "caution",
                    messageBody: "Please Login to get a better experience",
                    autoClose: true,
                    timeToAutoClose: 3000,
                });
            });
            await refreshCart();
        }
    };

    const addToCartNoVariation = () => {
        if (!noVariationNumberToAdd) return;
        uploadToCart([
            {
                product_item: items[0].id,
                qty: noVariationNumberToAdd,
            },
        ]);
    };

    const addToCartVariation = () => {
        if (filteredItems.length != 1) return;
        uploadToCart([
            {
                product_item: filteredItems[0].id,
                qty: variationNumberToAdd,
            },
        ]);
    };

    if (!window.__CURRENT_PRODUCT__) {
        return <div>Inavlid product id</div>;
    }

    return (
        <div>
            <section className="bg-[#E5EEFF] space-y-4">
                <div className="p-2"></div>
                <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_0.25fr] p-2 gap-8">
                    <div className="grid w-full grid-cols-1 md:grid-cols-[0.4fr_0.6fr] gap-4 p-2">
                        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md space-y-2 w-full">
                            <div
                                className="w-full bg-gray-50 rounded-lg aspect-square relative bg-center bg-contain bg-no-repeat"
                                style={{
                                    backgroundImage: `url('${
                                        images[selectedImage]?.image ||
                                        images[selectedImage]
                                    }')`,
                                }}
                            ></div>
                            <div className="p-2 mx-auto w-full items-center overflow-x-auto">
                                {images.map((item, i) => (
                                    <button
                                        className={`w-10 h-10 bg-gray-100 rounded-full bg-center bg-no-repeat bg-contain flex-shrink-0 ${
                                            selectedImage == i &&
                                            "bg-blue-600 border border-blue-600"
                                        }`}
                                        style={{
                                            backgroundImage: `url('${
                                                item?.image || item
                                            }')`,
                                        }}
                                        key={i}
                                        onClick={() => {
                                            setSelectedImage(i);
                                        }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow-md border w-full">
                            <div className="p-1 flex gap-3 items-center">
                                <button className="p-1 flex gap-2 text-[10px] font-semibold rounded-sm items-center text-slate-950 hover:bg-slate-100">
                                    <FiShare2 />
                                    Share
                                </button>
                                <button className="p-1 flex gap-2 text-[10px] font-semibold rounded-sm items-center text-slate-950 hover:bg-slate-100">
                                    <MdOutlineReport />
                                    Report
                                </button>
                            </div>
                            <div className="flex items-center justify-end">
                                <p className="text-xs flex gap-0 items-center">
                                    <FaStar fill="#FFC633" />
                                    {parseFloat(product?.rating || 0)} Ratings
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold">{product?.name}</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-semibold text-blue-950">
                                        NGN {parseFloat(product?.price || 0)}
                                    </p>
                                </div>

                                <p className="text-xs">
                                    {product?.description.length > 300
                                        ? product?.description.slice(0, 300) +
                                          "..."
                                        : product?.description}
                                </p>
                            </div>
                            {items.length == 1 ? (
                                <>
                                    {!productHasNoVariation && (
                                        <div className="bg-gray-100 rounded-md p-1 flex flex-wrap gap-1">
                                            {items[0].variation_data.map(
                                                (entry) => (
                                                    <span
                                                        key={entry.variation}
                                                        className="rounded-sm text-[10px] p-1 bg-slate-200"
                                                    >
                                                        {entry.variation_name}:{" "}
                                                        {entry.option_value}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                    <AddToCart
                                        numberToAdd={noVariationNumberToAdd}
                                        maxQty={items[0].qty}
                                        setNumberToAdd={
                                            setNoVariationNumberToAdd
                                        }
                                        decreaseQtyBtnDisableCondition={
                                            noVariationNumberToAdd <= 0
                                        }
                                        increaseQtyBtnDisableCondition={
                                            noVariationNumberToAdd >=
                                            items[0].qty
                                        }
                                        addToCartBtnDisableCondition={
                                            noVariationNumberToAdd <= 0 ||
                                            isUploading
                                        }
                                        addToCartFunction={addToCartNoVariation}
                                        isUploading={isUploading}
                                    />
                                </>
                            ) : (
                                <>
                                    <ProductItemSelector
                                        productItems={items}
                                        setFilteredItems={setFilteredItems}
                                        onFinalSelection={setOnFinalSelection}
                                    />
                                    <AddToCart
                                        numberToAdd={variationNumberToAdd}
                                        maxQty={filteredItems[0]?.qty}
                                        setNumberToAdd={setVariationNumberToAdd}
                                        decreaseQtyBtnDisableCondition={
                                            variationNumberToAdd <= 0
                                        }
                                        increaseQtyBtnDisableCondition={
                                            !onFinalSelection ||
                                            variationNumberToAdd >=
                                                filteredItems[0]?.qty
                                        }
                                        addToCartBtnDisableCondition={
                                            !onFinalSelection ||
                                            variationNumberToAdd <= 0 ||
                                            isUploading
                                        }
                                        addToCartFunction={addToCartVariation}
                                        isUploading={isUploading}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <aside className="w-full p-2 rounded-md bg-white shadow-md h-fit">
                        <div className="bg-gray-100 rounded-md p-2 space-y-2">
                            <div className="flex gap-2">
                                <div className="rounded-full w-14 h-14 bg-gray-50"></div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
            <section></section>
        </div>
    );
};

export default ProductDetail;
