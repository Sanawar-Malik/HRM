import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userAuthapi } from "../services/userAuthApi";
import authReducer from "../featuers/authSlice";
import userReducer from "../featuers/userSlice.js";
import empDetail from "../services/empDetailSlice";
export const store = configureStore({
  reducer: {
    app: empDetail,
    [userAuthapi.reducerPath]: userAuthapi.reducer,

    auth: authReducer,
    user: userReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthapi.middleware),


});
setupListeners(store.dispatch)
