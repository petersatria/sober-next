import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postUserLogin = createAsyncThunk("userLogin/postUserLogin", async({username, password}, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/loginData", {
            username,password
        })
        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        if(error.response.data){
            return thunkAPI.rejectWithValue(error.response.data)
        }
        return thunkAPI.rejectWithValue("Something Wrong In Server")
    }
})

const authenticationSlice = createSlice({
    name: "auth",
    initialState: {
        userInformation : {},
        isLoggedIn: false,
        isLoading: false
    },
    reducers: {
        getUserData: (state, action) => {
            state.userInformation = action.payload;
        },
        isUserLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload.loading
        }

    },
    extraReducers: {
        [postUserLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [postUserLogin.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [postUserLogin.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})

export const {getUserData, isUserLoggedIn, isLoading} = authenticationSlice.actions;
export default authenticationSlice.reducer;