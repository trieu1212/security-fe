import { createSlice } from "@reduxjs/toolkit"; 

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            currentUser:null,//access,refresh
            isFetching:false,
            isError:false,
            isSuccess:false
        },
        register:{
            isFetching:false,
            isError:false,
            isSuccess:false
        },
    },
    reducers:{
        loginStart: (state) =>{
            state.login.isFetching = true;
            state.login.isError = false;
            state.login.isSuccess = false;
        },
        loginSuccess: (state,action) =>{
            state.login.isFetching = false;
            state.login.isError = false;
            state.login.isSuccess = true;
            state.login.currentUser = action.payload;
        },
        loginError:(state,action) =>{
            state.login.isFetching = false;
            state.login.isError = true;
            state.login.isSuccess = false;
        },
        registerStart:(state) =>{
            state.register.isFetching = true;
            state.register.isError = false;
            state.register.isSuccess = false;
        },
        registerSuccess:(state) =>{
            state.register.isFetching = false;
            state.register.isError = false;
            state.register.isSuccess = true;
        },
        registerError:(state,action) =>{
            state.register.isFetching = false;
            state.register.isError = true;
            state.register.isSuccess = false;
        },
        logout:(state) =>{
            state.login.currentUser=null
        },
    }
})

export const {loginStart,
            loginSuccess,
            loginError,
            registerError,
            registerStart,
            registerSuccess,
            logout,} = authSlice.actions;
export default authSlice.reducer;