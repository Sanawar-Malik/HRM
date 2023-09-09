import { createSlice } from "@reduxjs/toolkit";
import { defaults } from "autoprefixer";


const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  gender: "",
  address: "",
  phone: "",
  image: "",
}

export const userSlice = createSlice({
  name: "user_profile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      state.address = action.payload.address
      state.phone = action.payload.phone
      state.gender = action.payload.gender
      state.image = action.payload.image
    },
    unsetUserProfile: (state, action) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      state.address = action.payload.address
      state.phone = action.payload.phone
      state.gender = action.payload.gender
      state.image = action.payload.image
    },

  }
})

export const { setUserProfile, unsetUserProfile } = userSlice.actions
export default userSlice.reducer
