import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'product',
    initialState:{
        allProduct:null,
        homeProduct:null,
        oneProduct:null,
        isFetching:false,
        isError:false,
        isSuccess:false
    },
    reducers:{
        getAllProductStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
            state.isSuccess = false;
        },
        getAllProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.allProduct = action.payload;
        },
        getAllProductError:(state)=>{
            state.isFetching = false;
            state.isError = true;
            state.isSuccess = false;
        },
        getOneProductStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
            state.isSuccess = false;
        },
        getOneProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.oneProduct = action.payload;
        },
        getOneProductError:(state)=>{
            state.isFetching = false;
            state.isError = true;
            state.isSuccess = false;
        },
        getHomeProductStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
            state.isSuccess = false;
        },
        getHomeProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.homeProduct = action.payload;
        },
        getHomeProductError:(state)=>{
            state.isFetching = false;
            state.isError = true;
            state.isSuccess = false;
        }
    }
})
export const {getAllProductStart,
            getAllProductSuccess,
            getAllProductError,
            getOneProductStart,
            getOneProductSuccess,
            getOneProductError,
            getHomeProductStart,
            getHomeProductSuccess,
            getHomeProductError} = productSlice.actions
export default productSlice.reducer;