import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (profile) => {
        const token = localStorage.getItem('token')
        const response = await axios({
            method: "PUT",
            data: profile,
            url: "https://be-kel1.herokuapp.com/users/profile",
            headers: {
                Authorization: token
            }
        })
        return response.data;
    }
);


const initialState = {
    messageUser: '',
    successUser: null,
    error: ''
}

const usersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSuccessUser: (state, action) => {
            state.successUser = action.payload
        },
        setMessageUser: (state, action) => {
            state.messageUser = action.payload
        },
    },
    extraReducers: {
        // Update User
        [updateUser.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [updateUser.fulfilled]: (state, action) => {
            return { ...state, messageUser: action.payload.success ? action.payload.message : 'Gagal update profile', successUser: action.payload.success }
        },
        [updateUser.rejected]: (state, action) => {
            return { ...state, messageUser: action.payload.message, successUser: action.payload.success }
        },

    }
})

export const { setUserLogin, setUserProfile, setSuccessUser, setMessageUser } = usersSlice.actions;
export default usersSlice.reducer;