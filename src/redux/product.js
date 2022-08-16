import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async ({ clicked, searched, page }) => {
        const all = clicked === 'Semua' ? '' : clicked
        const response = await axios.get(`https://be-kel1.herokuapp.com/AllProducts?tab=${page}&cat=${all}&search=${searched}`)

        return response.data
    }
);

export const fetchProductsUser = createAsyncThunk(
    'product/fetchProductsUser',
    async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://be-kel1.herokuapp.com/product/user`, {
            headers: { Authorization: token }

        })
        return response.data.data.products;
    }
);

export const fetchProductDetail = createAsyncThunk(
    'product/fetchProductDetail',
    async (id) => {
        const response = await axios.get(`https://be-kel1.herokuapp.com/product/${id}`);
        return response.data.data.product;
    }
);

export const fetchProductSold = createAsyncThunk(
    'product/fetchProductSold',
    async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://be-kel1.herokuapp.com/product/user/sold`, {
            headers: { Authorization: token }
        })
        return response.data;
    }
);

export const postProducts = createAsyncThunk(
    'product/postProducts',
    async (product) => {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: "POST",
            data: product,
            url: `https://be-kel1.herokuapp.com/product/`,
            headers: {
                Authorization: token,
            }
        })
        return response.data;
    }
);


export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ product, id }) => {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: "PUT",
            data: product,
            url: `https://be-kel1.herokuapp.com/product/${id}`,
            headers: {
                Authorization: token,
            }
        })
        return response.data;
    }
);

export const publishProduct = createAsyncThunk(
    'product/publishProduct',
    async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios(
            {
                method: "POST",
                url: `https://be-kel1.herokuapp.com/product/publish/${id}`,
                headers: {
                    Authorization: token,
                }
            })
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        const token = localStorage.getItem('token');
        const response = await axios(
            {
                method: "DELETE",
                url: `https://be-kel1.herokuapp.com/product/${id}`,
                headers: {
                    Authorization: token,
                }
            })
        return response.data;
    }
);


const initialState = {
    loading: false,
    error: {},
    user: {},
    products: {},
    detailProduct: {},
    productSold: {},
    productUser: {},
    searched: '',
    message: '',
    success: true,
    tab: 1,
}

const productSlice = createSlice({
    name: 'produk',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSearch: (state, action) => {
            state.searched = action.payload
        },
        setDetail: (state, action) => {
            state.detailProduct = action.payload
        },
        setMessageProduct:  (state, action) => {
            state.message = action.payload
        },
        
    },
    extraReducers: {

        // Fetching Product
        [fetchProducts.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [fetchProducts.fulfilled]: (state, action) => {
            return { ...state, products: action.payload.data.product, tab: action.payload.tab }
        },
        [fetchProducts.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Fetching Product User
        [fetchProductsUser.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [fetchProductsUser.fulfilled]: (state, action) => {
            return { ...state, productUser: action.payload }
        },
        [fetchProductsUser.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Publish Product
        [publishProduct.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [publishProduct.fulfilled]: (state, action) => {
            return { ...state, message: action.payload.message, success: action.payload.success }
        },
        [publishProduct.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Fetching Product Detail
        [fetchProductDetail.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [fetchProductDetail.fulfilled]: (state, action) => {
            return { ...state, detailProduct: action.payload }
        },
        [fetchProductDetail.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Fetching Product Sold
        [fetchProductSold.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [fetchProductSold.fulfilled]: (state, action) => {
            return { ...state, productSold: action.payload.data }
        },
        [fetchProductSold.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Post Product
        [postProducts.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [postProducts.fulfilled]: (state, action) => {
            return { ...state, message: action.payload.message, success: action.payload.success }
        },
        [postProducts.rejected]: (state, action) => {
            return { ...state, error: action.payload, message: action.payload.message, success: action.payload.success }
        },

        // Update Product
        [updateProduct.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [updateProduct.fulfilled]: (state, action) => {
            return { ...state, message: action.payload.message, success: action.payload.success }
        },
        [updateProduct.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },

        // Delete Product
        [deleteProduct.pending]: (state, action) => {
            return { ...state, loading: true, error: null }
        },
        [deleteProduct.fulfilled]: (state, action) => {
            return { ...state, message: action.payload.message, success: action.payload.success }
        },
        [deleteProduct.rejected]: (state, action) => {
            return { ...state, error: action.error }
        }
    }
})
export const { setLoading, setSearch,setMessageProduct, setDetail } = productSlice.actions;
export default productSlice.reducer;