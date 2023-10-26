import { createSlice } from "@reduxjs/toolkit";
import { getProductSingle, getSingleProductStatus } from "./productSlice";
import { STATUS } from '../utils/status';

const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data));
}

const initialState = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isItemInCart = state.carts.find(
                (item) => item.productId === action.payload.productId
            );

            const singleProductStatus = getSingleProductStatus(state);

            if (singleProductStatus === STATUS.SUCCEEDED) {
                if (isItemInCart) {
                    state.carts = state.carts.map((item) => {
                        if (item.productId === action.payload.productId) {
                            const tempQty = item.quantity + 1;
                            const tempTotalPrice = tempQty * item.product.discountedPrice;
                            return {
                                ...item,
                                quantity: tempQty,
                                totalPrice: tempTotalPrice
                            };
                        } else {
                            return item;
                        }
                    });
                } else {
                    const newCartItem = {
                        productId: action.payload.productId,
                        quantity: 1,
                        product: {
                            title: getProductSingle(state).title,
                            brand: getProductSingle(state).brand,
                            rating: getProductSingle(state).rating,
                            category: getProductSingle(state).category,
                            price: getProductSingle(state).price,
                            discountedPrice: getProductSingle(state).discountedPrice,
                        },
                        cartTotal: getProductSingle(state).discountedPrice,
                        discountedPrice: getProductSingle(state).discountedPrice,
                    };

                    state.carts.push(newCartItem);
                    storeInLocalStorage(state.carts);
                }
            }
        },

        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter(item => item.id !== action.payload);
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        clearCart: (state) => {
            state.carts = [];
            storeInLocalStorage(state.carts);
        },

        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice
            }, 0);

            state.itemsCount = state.carts.length;
        },

        toggleCartQty: (state, action) => {
            const tempCart = state.carts.map(item => {
                if (item.id === action.payload.id) {
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if (action.payload.type === "INC") {
                        tempQty++;
                        if (tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    if (action.payload.type === "DEC") {
                        tempQty--;
                        if (tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        setCartMessageOn: (state) => {
            state.isCartMessageOn = true;
        },

        setCartMessageOff: (state) => {
            state.isCartMessageOn = false;
        }
    }
});

export const { addToCart, setCartMessageOff, setCartMessageOn, getCartTotal, toggleCartQty, clearCart, removeFromCart } = cartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;

export default cartSlice.reducer;