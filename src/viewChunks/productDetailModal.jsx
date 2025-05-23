/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { setOffCartItem } from "../db";
import ApiClient from "../api";
import refreshCart from "../utils/refreshCart";
import { FaStar } from "react-icons/fa";
import ProductItemSelector from "../components/ProductItemSelector";
import AddToCart from "../components/AddToCartUtil";
import publishNotification from "../utils/publishNotification";

const ProductDetailModal = () => {
    const [productId, setProductId] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [productItems, setProductItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [onFinalSelection, setOnFinalSelection] = useState(false);

    const [noVariationNumberToAdd, setNoVariationNumberToAdd] = useState(0);
    const [variationNumberToAdd, setVariationNumberToAdd] = useState(0);

    const productHasNoVariation =
        productItems.length == 1 && productItems[0].variation_data.length == 0;

    const closeProductDetailModal = () => {
        setProductId(null);
        setProductDetails(null);
        setProductItems([]);
        setFilteredItems([]);
        setNoVariationNumberToAdd(0);
        setVariationNumberToAdd(0);

        document.getElementById("add-to-cart-modal-cont").style.display =
            "none";
    };

    useEffect(() => {
        const handleLoadModalProductDetails = (e) => {
            const { pId } = e.detail;
            setProductId(pId);
        };
        window.addEventListener(
            "loadModalProductDetails",
            handleLoadModalProductDetails
        );
        return () => {
            window.removeEventListener(
                "loadModalProductDetails",
                handleLoadModalProductDetails
            );
        };
    }, []);

    const loadProductDetails = useCallback(() => {
        setIsProductLoading(true);
        ApiClient.getProductDetails(productId)
            .then((data) => {
                setProductDetails(data);
                setImages([data?.product.base_image, ...(data?.images || [])]);
                setProductItems(data.items);
            })
            .catch(() => {})
            .finally(() => {
                setIsProductLoading(false);
            });
    }, [productId]);

    useEffect(() => {
        if (productId) loadProductDetails();
    }, [productId, loadProductDetails]);

    const uploadToCart = async (items) => {
        /**
         * items structure
         * [
         *  {
         *      product_item: (ID of product item),
         *      qty: quantity of product to add to cart
         *  }
         * ]
         */
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
                    closeProductDetailModal();
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
                closeProductDetailModal();
            });
            await refreshCart();
        }
    };

    const addToCartNoVariation = () => {
        if (!noVariationNumberToAdd) return;
        uploadToCart([
            {
                product_item: productItems[0].id,
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

    if (isProductLoading) return <div>Loading...</div>;

    return (
        <div className="p-2">
            <p className="text-sm font-semibold mb-3">Add to your cart</p>
            <div className="grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] gap-4 items-center">
                <div className="h-fit flex md:grid md:grid-cols-1 gap-2 md:gap-4 bg-white rounded-md overflow-hidden p-2 shadow-md">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 overflow-y-auto md:overflow-x-auto max-h-60 md:max-h-full snap-y md:snap-x">
                        {images.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`flex-shrink-0 aspect-square w-20 md:w-24 bg-gray-50 max-md:max-w-full bg-center bg-contain bg-no-repeat ${
                                    selectedImage === i
                                        ? "border-blue-500 border"
                                        : ""
                                }`}
                                style={{
                                    backgroundImage: `url('${
                                        item?.image || item
                                    }')`,
                                }}
                            ></button>
                        ))}
                    </div>

                    <div
                        className="w-full aspect-square rounded-sm bg-gray-50 bg-center bg-contain bg-no-repeat"
                        style={{
                            backgroundImage: `url('${
                                images[selectedImage]?.image ||
                                images[selectedImage]
                            }')`,
                        }}
                    ></div>
                </div>
                <div className="w-full rounded-md shadow-md bg-white p-2 md:p-4 h-fit">
                    <div className="flex items-center justify-end">
                        <p className="text-xs flex gap-0 items-center">
                            <FaStar fill="#FFC633" />
                            {parseFloat(
                                ProductDetailModal?.product?.rating || 0
                            )}{" "}
                            Ratings
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="">
                            {productDetails?.product.name.length > 30
                                ? productDetails?.product.name.slice(0, 30) +
                                  "..."
                                : productDetails?.product.name}
                        </p>
                        <p className="text-sm font-semibold text-blue-900">
                            NGN {parseFloat(productDetails?.product.price || 0)}
                        </p>
                        <p className="text-xs">
                            {productDetails?.product.description.length > 150
                                ? productDetails?.product.description.slice(
                                      0,
                                      150
                                  ) + "..."
                                : productDetails?.product.description}
                        </p>
                        {productItems.length == 1 ? (
                            <>
                                {!productHasNoVariation && (
                                    <div className="bg-gray-100 rounded-md p-1 flex flex-wrap gap-1">
                                        {productItems[0].variation_data.map(
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
                                    maxQty={productItems[0].qty}
                                    setNumberToAdd={setNoVariationNumberToAdd}
                                    decreaseQtyBtnDisableCondition={
                                        noVariationNumberToAdd <= 0
                                    }
                                    increaseQtyBtnDisableCondition={
                                        noVariationNumberToAdd >=
                                        productItems[0].qty
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
                                    productItems={productItems}
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
            </div>
        </div>
    );
};

export default ProductDetailModal;
