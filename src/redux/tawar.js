import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTawar = createAsyncThunk(
    'tawar/fetchTawar',
    async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://be-kel1.herokuapp.com/tawar`,
        {headers: {
            Authorization: token,
        }})
        return response.data;
    }
);

export const fetchTawarBuyer = createAsyncThunk(
    'tawar/fetchTawarBuyer',
    async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://be-kel1.herokuapp.com/tawar/user/buy`,
        {headers: {
            Authorization: token,
        }})
        return response.data;
    }
);

export const fetchTawarSeller = createAsyncThunk(
    'tawar/fetchTawarSeller',
    async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://be-kel1.herokuapp.com/tawar/user/sell`,
        {headers: {
            Authorization: token,
        }})
        return response.data;
    }
);

export const fetchDetailTawar = createAsyncThunk(
    'tawar/fetchDetailTawar',
    async (id) => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://be-kel1.herokuapp.com/tawar/${id}`,
        {headers: {
            Authorization: token,
        }})
        return response.data;
    }
);

export const postTawar = createAsyncThunk(
    'tawar/postTawar',
    async (data) => {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: "POST",
            data: data,
            url:`https://be-kel1.herokuapp.com/tawar`,
            headers: {
                Authorization: token,
            }
        })
        return response.data;
    }
)
;
export const deleteTawar = createAsyncThunk(
    'tawar/deleteTawar',
    async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: "DELETE",
            url:`https://be-kel1.herokuapp.com/tawar/${id}`,
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
    tawar: {},
    tawarSeller: {},
    detailTawar: {},
    message:'',
    success: false

}

const tawarSlice = createSlice({
    name: 'tawar',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setLoadingDetail: (state, action) => {
            state.loadingDetail = action.payload
        },
        setSuccess: (state, action) => {
            state.success = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
    },
    extraReducers: {

        // Fetching Tawar for Buyer
        [fetchTawarBuyer.pending]: (state, action) => {
            return { ...state, error: null, }
        },
        [fetchTawarBuyer.fulfilled]: (state, action) => {
            return { ...state, tawar: action.payload.data }
        },
        [fetchTawarBuyer.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Fetching Tawar all
        [fetchTawar.pending]: (state, action) => {
            return { ...state, error: null, }
        },
        [fetchTawar.fulfilled]: (state, action) => {
            return { ...state, tawar: action.payload.data }
        },
        [fetchTawar.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Fetching Tawar for Seller
        [fetchTawarSeller.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [fetchTawarSeller.fulfilled]: (state, action) => {
            return { ...state, tawarSeller: action.payload.data }
        },
        [fetchTawarSeller.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Fetching Detail Tawar
        [fetchDetailTawar.pending]: (state, action) => {
            return { ...state, error: null }
        },
        [fetchDetailTawar.fulfilled]: (state, action) => {
            return { ...state, detailTawar: action.payload.data }
        },
        [fetchDetailTawar.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Post Tawar
        [postTawar.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [postTawar.fulfilled]: (state, action) => {
            return { ...state, message: 'Harga tawarmu berhasil dikirim ke penjual', success: action.payload.success}
        },
        [postTawar.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Delete Tawar
        [deleteTawar.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [deleteTawar.fulfilled]: (state, action) => {
            return { ...state, message: action.payload.success ? 'Berhasil menghapus penawaran' : action.payload.message, success: action.payload.success}
        },
        [deleteTawar.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

         
    }
})
export const { setLoading,setLoadingDetail, setSuccess ,setMessage } = tawarSlice.actions;
export default tawarSlice.reducer;