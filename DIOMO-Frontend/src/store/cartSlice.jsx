import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { loginUser, selectUserStatus } from "./authSlice";

export const addProdToCart = createAsyncThunk(
    'auth/cart/add',
    async (cartData, { getState, dispatch }) => {
        try {
            const userStatus = selectUserStatus(getState());

            if (userStatus === STATUS.SUCCEEDED) {
                const response = await axios.post(`${AUTH_URL}users/cart`, cartData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                return response.data;
            } else {
                console.log('User is not logged in');
                toast.error("You must be logged in to add items to the cart.");
                return null;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const initialState = {
    carts: [],
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.carts.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += item.quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.carts.push(item);
            }
        },

        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload;
            state.carts = state.carts.filter(item => item.id !== itemIdToRemove);
        },

        clearCart: (state) => {
            state.carts = [];
        },

        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);

            state.itemsCount = state.carts.length;
        },

        toggleCartQty: (state, action) => {
            const { id, type } = action.payload;
            const itemToUpdate = state.carts.find(item => item.id === id);

            if (itemToUpdate) {
                let tempQty = itemToUpdate.quantity;
                let tempTotalPrice = itemToUpdate.totalPrice;

                if (type === "INC") {
                    tempQty++;
                    if (tempQty === itemToUpdate.stock) tempQty = itemToUpdate.stock;
                    tempTotalPrice = tempQty * itemToUpdate.discountedPrice;
                }

                if (type === "DEC") {
                    tempQty--;
                    if (tempQty < 1) tempQty = 1;
                    tempTotalPrice = tempQty * itemToUpdate.discountedPrice;
                }

                const updatedItem = { ...itemToUpdate, quantity: tempQty, totalPrice: tempTotalPrice };
                const updatedCart = state.carts.map(item =>
                    item.id === id ? updatedItem : item
                );

                state.carts = updatedCart;
            }
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