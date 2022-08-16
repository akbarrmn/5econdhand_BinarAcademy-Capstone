import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://be-kel1.herokuapp.com/wishlist`,
        {headers: {
            Authorization: token,
        }})
        return response.data;
    }
);

export const postWishlist = createAsyncThunk(
    'wishlist/postWishlist',
    async (data) => {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: "POST",
            data: data,
            url:`https://be-kel1.herokuapp.com/wishlist`,
            headers: {
                Authorization: token,
            }
        })
        return response.data;
    }
);

export const deleteWishlist = createAsyncThunk(
    'wishlist/deleteWishlist',
    async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: "DELETE",
            url:`https://be-kel1.herokuapp.com/wishlist/${id}`,
            headers: {
                Authorization: token,
            }
        })
        return response.data;
    }
);


const initialState = {
    loading: false,
    error: null,
    wishlist: {},
    productId:null,
    message:'',
    success: false

}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSuccess: (state, action) => {
            state.success = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
    },
    extraReducers: {

        // Fetching Wishlist
        [fetchWishlist.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [fetchWishlist.fulfilled]: (state, action) => {
            return { ...state, wishlist: action.payload.data, message: action.payload.message, success: action.payload.success}
        },
        [fetchWishlist.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

         // Post Wishlist
         [postWishlist.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [postWishlist.fulfilled]: (state, action) => {
            return { ...state }
        },
        [postWishlist.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Delete Wishlist
        [deleteWishlist.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [deleteWishlist.fulfilled]: (state, action) => {
            return { ...state }
        },
        [deleteWishlist.rejected]: (state, action) => {
            console.log('delete rejected')
            return { ...state, error: action.error }
        },

    }
})
export const { setLoading } = wishlistSlice.actions;
export default wishlistSlice.reducer;