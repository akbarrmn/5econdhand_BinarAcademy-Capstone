import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const authLogin = createAsyncThunk(
    'auth/Login',
    async (user) => {
         const response = await axios({
                method:"POST",
                data: user,
                url:"https://be-kel1.herokuapp.com/login"
            })
        return response.data;
    }
);

export const authRegister = createAsyncThunk(
    'auth/Register',
    async (user) => {
         const response = await axios({
                method:"POST",
                data: user,
                url:"https://be-kel1.herokuapp.com/register"
            })
        return response.data;
    }
);

const initialState = {
    userProfile: {},
    message: '',
    success: null,
    error: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
        setSuccessAuth: (state, action) => {
            state.success = action.payload
        },
        setMessageAuth: (state, action) => {
            state.message = action.payload
        },
    },
    extraReducers: {
        // Login
        [authLogin.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [authLogin.fulfilled]: (state, action) => {
            if (action.payload.success) {
                localStorage.setItem("token", action.payload.data.test.access_token)
            } 
            return { ...state, message: action.payload.success? action.payload.message : 'Email atau Password Salah', success:action.payload.success }
        },
        [authLogin.rejected]: (state, action) => {
            return { ...state, message:action.payload.message, success:action.payload.success  }
        },

        // Register
        [authRegister.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [authRegister.fulfilled]: (state, action) => {
            return { ...state, message:action.payload.message, success:action.payload.success }
        },
        [authRegister.rejected]: (state, action) => {
            return { ...state, error: action.error, success:action.payload.success }
        },

    }
})

export const { setUserLogin, setUserProfile,setSuccessAuth, setMessageAuth } = authSlice.actions;
export default authSlice.reducer;