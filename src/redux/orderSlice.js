import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState:{
        currentOrder:[],
        isFetching: false,
        isSuccess: false,
        isError: false,
        msg:""
    },
    reducers:{
        createOrderStart:(state)=>{
            state.isFetching = true;
            state.isSuccess = false;
            state.isError = false;
        },
        createOrderSuccess:(state, action)=>{
            state.isFetching = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = action.payload;
        },
        createOrderError:(state)=>{
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = true;
        },
        getUserOrderStart:(state)=>{
            state.isFetching = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getUserOrderSuccess:(state,action)=>{
            state.isFetching = false;
            state.isSuccess = true;
            state.isError = false;
            state.currentOrder = action.payload;
        },
        getUserOrderError:(state)=>{
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = true;
        }
    }
})

export const {createOrderStart, 
            createOrderSuccess, 
            createOrderError,
            getUserOrderStart,
            getUserOrderSuccess,
            getUserOrderError} = orderSlice.actions;
export default orderSlice.reducer;