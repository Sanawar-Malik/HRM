import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userDetail from "../services/userDetailSlice";
export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
