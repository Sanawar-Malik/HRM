import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./localStorage";

export const addWorker = createAsyncThunk('addWorker', async (formdata, access_token) => {
  try {
    const config = {
      headers: {
        'Authorization': `bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post("http://127.0.0.1:8000/api/emp/", formdata, config);
    return response.data;
  } catch (error) {
    throw Error('Error sending data');

  }
}
);
// export const addworker = createAsyncThunk("addworker", async (data, { rejectWithValue }) => {
//   const { access_token } = getToken();
//   const response = await fetch("http://127.0.0.1:8000/api/emp/", {
//     method: "POST",
//     headers: {
//       'authorization': `Bearer ${access_token}`,
//       "Content-Type": 'multipart/form-data',
//     },
//     body: JSON.stringify(data)
//   });
//
//   try {
//     const result = await response.json();
//     console.log("result", result)
//     return result;
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

export const showEmp = createAsyncThunk("showEmp", async (args, { rejectWithValue }) => {
  const { access_token } = getToken();
  const response = await fetch("http://127.0.0.1:8000/api/emp/", {
    method: "GET",
    headers: {
      'authorization': `Bearer ${access_token}`,
    }
  });
  try {
    const result = await response.json();
    console.log("result", result)
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});





export const empDetail = createSlice({
  name: "empDetail",
  initialState: {
    workers: [],
    loading: false,
    token: null,
    error: null,
  },
  extraReducers: {
    [showEmp.pending]: (state) => {
      state.loading = true;
    },
    [showEmp.fulfilled]: (state, action) => {
      // const { access_token, user } = action.payload;
      // state.token = access_token;
      state.loading = false;
      state.workers = action.payload
    },
    [showEmp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.token = null;
    },

    [addWorker.pending]: (state) => {
      state.loading = true;
    },
    [addWorker.fulfilled]: (state, action) => {
      state.loading = false;
      state.workers.push(action.payload);

    },
    [addWorker.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
  },
});

export default empDetail.reducer;


