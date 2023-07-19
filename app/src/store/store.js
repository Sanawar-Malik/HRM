import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { getDefaultNormalizer } from "@testing-library/react";
import { userAuthapi } from "../services/userAuthApi";
import authReducer from "../featuers/authSlice";
export const store = configureStore({
  reducer: {
    [userAuthapi.reducerPath]: userAuthapi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthapi.middleware),
});
setupListeners(store.dispatch)
