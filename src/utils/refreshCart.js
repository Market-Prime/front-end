import ApiClient from "../api/index.js";
import { clearOffCarts, setOffCartItem } from "../db/index.js";

const dispatchCartUpdate = () => {
    const _evnt = new CustomEvent("cart_updated");
    window.dispatchEvent(_evnt);
};

const refreshCart = async () => {
    if (window.__mp_user_xhrse_isTrue) {
        await ApiClient.getCartItems()
            .then(async (data) => {
                const preparedData = data.map((item) => ({
                    product_item: item.product_item,
                    qty: item.qty,
                }));
                await clearOffCarts();
                await setOffCartItem(preparedData);
            })
            .catch((err) => {})
            .finally(dispatchCartUpdate);
    } else {
        dispatchCartUpdate();
    }
};

export default refreshCart;
