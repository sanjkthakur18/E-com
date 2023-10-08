import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_URL } from '../utils/apiURL';
import { STATUS } from '../utils/status';

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
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    users: [],
    userStatus: STATUS.IDLE,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.userStatus = STATUS.LOADING;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.users = action.payload;
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
                state.users = action.payload;
                state.userStatus = STATUS.SUCCEEDED;
                if (state.userStatus === STATUS.SUCCEEDED) {
                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('firstname', action.payload.firstname);
                    toast.info('Logged in successfully.');
                }
            })
            .addCase(loginUser.rejected, (state) => {
                state.userStatus = STATUS.ERROR;
                const errorResponse = action.payload.response;
                if (errorResponse && errorResponse.status === 404) {
                    state.isLoggedIn = false;
                    toast.error('User Does Not Exist.');
                } else if (errorResponse && errorResponse.status === 401) {
                    toast.error('Wrong Password.');
                } else {
                    toast.error('An error occurred during login.');
                }
            })
    }
});

export const selectUserStatus = (state) => state.auth.userStatus;
export default authSlice.reducer;