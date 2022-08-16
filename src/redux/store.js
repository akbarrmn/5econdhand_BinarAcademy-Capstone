import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product" 
import authReducer from "./auth" 
import wishlistReducer from "./wishlist" 
import tawarReducer from "./tawar" 
import transaksiReducer from "./transaksi"
import notifReducer from "./notif"
import userReducer from "./users"


const rootReducer = {
    wishlist: wishlistReducer,
    product: productReducer,
    auth: authReducer,
    tawar: tawarReducer,
    transaksi:transaksiReducer,
    notif: notifReducer,
    users: userReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;