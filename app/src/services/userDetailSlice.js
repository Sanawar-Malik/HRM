import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";


// createAction.
export const loginuser = createAsyncThunk("loginuser", async (data, { rejectWithValue }) => {
  const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  try {
    const result = await response.json();
    console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});



export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [loginuser.pending]: (state) => {
      state.loading = true;
    },
    [loginuser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);

    },
    [loginuser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload.message;

    },
  },
});

export default userDetail.reducer;


