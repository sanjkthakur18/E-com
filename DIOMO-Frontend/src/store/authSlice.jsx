import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_URL } from '../utils/apiURL';
import { STATUS } from '../utils/status';
import { addToCart } from './cartSlice';
import {getSingleProductStatus} from '../store/productSlice';

export const registerUser = createAsyncThunk('auth/registerUser', async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}users/register`, formData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}users/login`, formData);
        console.log(response.data);
        if (response.data) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('id', response.data._id);
            localStorage.setItem('firstname', response.data.firstname);
            // console.log(response.data);
            return response.data;
        } else {
            console.log('Response data is undefined');
            throw new Error('An error occurred during login');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.get(`${AUTH_URL}users/logout`, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const addProdToCart = createAsyncThunk('auth/add-to-cart', async (cart, { dispatch }) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('id');
        const state = getState();

        const productSingleStatus = getSingleProductStatus(state.product);

        if (productSingleStatus === STATUS.SUCCEEDED) {
            const response = await axios.post(`${AUTH_URL}users/cart`, {
                userId,
                items: [cart],
            }, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            dispatch(addToCart(response.data));
            console.log(response.data);

            return response.data;
        } else {
            alert("Warning");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    user: [],
    userStatus: STATUS.IDLE,
    cart: [],
    cartStatus: STATUS.IDLE,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLoggedIn: (state) => {
            state.isLoggedIn = true;
        },

        setUserLoggedOut: (state) => {
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.userStatus = STATUS.LOADING;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userStatus = STATUS.SUCCEEDED;
                toast.info('User Created Successfully.');
            })
            .addCase(registerUser.rejected, (state) => {
                state.userStatus = STATUS.ERROR;
                toast.error('User Already Exists.');
            })
            .addCase(loginUser.pending, (state) => {
                state.userStatus = STATUS.LOADING;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userStatus = STATUS.SUCCEEDED;
                if (state.userStatus === STATUS.SUCCEEDED) {
                    toast.info('Logged in successfully.');
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.userStatus = STATUS.ERROR;
                const errorResponse = action.error.message;

                if (errorResponse.includes('404')) {
                    toast.error('User Does Not Exist.');
                } else if (errorResponse.includes('401')) {
                    toast.error('Wrong Password.');
                } else {
                    toast.error('An error occurred during login.');
                }
            })
            .addCase(logoutUser.pending, (state) => {
                state.userStatus = STATUS.LOADING;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userStatus = STATUS.SUCCEEDED;
                toast.info('Logged Out Successfully')
            })
            .addCase(logoutUser.rejected, (state) => {
                state.userStatus = STATUS.ERROR;
            })
            .addCase(addProdToCart.pending, (state) => {
                state.cart = STATUS.LOADING;
            })
            .addCase(addProdToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.cartStatus = STATUS.SUCCEEDED;
                toast.info('Product has been added to cart');
            })
            .addCase(addProdToCart.rejected, (state, action) => {
                state.cartStatus = STATUS.ERROR;
            })
    }
});

export const { setUserLoggedIn, setUserLoggedOut } = authSlice.actions;
export const selectUserStatus = (state) => state.auth.userStatus;
export const selectCartStatus = (state) => state.auth.cartStatus;
export default authSlice.reducer;