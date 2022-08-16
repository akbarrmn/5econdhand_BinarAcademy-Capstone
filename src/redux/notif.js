import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchNotif = createAsyncThunk(
    'auth/fetchNotif',
    async () => {
        const token = localStorage.getItem('token')
         const response = await axios({
                method:"GET",
                url:"https://be-kel1.herokuapp.com/notif",
                headers:{
                    Authorization: token
                }
            })
        return response.data;
    }
);

export const deleteNotif = createAsyncThunk(
    'auth/deleteNotif',
    async (id) => {
        const token = localStorage.getItem('token')
         const response = await axios({
                method:"DELETE",
                url:`https://be-kel1.herokuapp.com/notif/${id}`,
                headers:{
                    Authorization: token
                }
            })
        return response.data;
    }
);
    

const initialState = {
    message: '',
    loading: false,
    success: null,
    error: '',
    notification: {}
}

const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
    },
    extraReducers: {
        // Fetch Notif
        [fetchNotif.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [fetchNotif.fulfilled]: (state, action) => {
            return { ...state, notification: action.payload.data}
        },
        [fetchNotif.rejected]: (state, action) => {
            return { ...state, message:action.payload.message, success:action.payload.success  }
        },

        // Delete Notif
        [deleteNotif.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [deleteNotif.fulfilled]: (state, action) => {
            return { ...state}
        },
        [deleteNotif.rejected]: (state, action) => {
            return { ...state, message:action.payload.message, success:action.payload.success  }
        },

    }
})

export const { setSuccess, setMessage } = notifSlice.actions;
export default notifSlice.reducer;