import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_URL } from '../utils/apiURL';
import { STATUS } from '../utils/status';
// import { config } from '../utils/axiosConfig';

export const registerUser = createAsyncThunk('auth/registerUser', async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}users/register`, formData);
        localStorage.setItem('user', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}users/login`, formData);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('firstname', response.data.firstname);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

/* export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    try {
        const response = await axios.get(`${AUTH_URL}users/logout`, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}); */

const initialState = {
    user: [],
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
                // if (!loginToken) {
                //     toast.error("Session has been expired. Login again")
                // }
                // else if (errorResponse && errorResponse.status === 404) {
                //     toast.error('User Does Not Exist.');
                // } else if (errorResponse && errorResponse.status === 401) {
                //     toast.error('Wrong Password.');
                // } else {
                toast.error('An error occurred during login.');
                // }
            })
        /* .addCase(logoutUser.pending, (state) => {
            state.userStatus = STATUS.LOADING;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.userStatus = STATUS.SUCCEEDED;
            toast.info('Logged Out Successfully')
        })
        .addCase(logoutUser.rejected, (state) => {
            state.userStatus = STATUS.ERROR;
        }) */
    }
});

export const selectUserStatus = (state) => state.auth.userStatus;
export default authSlice.reducer;