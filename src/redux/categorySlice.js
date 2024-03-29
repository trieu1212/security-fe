import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name:'category',
    initialState:{
        categories:[],
        isFetching : false,
        isError : false,
        isSuccess: false
    },
    reducers:{
        getAllCategoryStart:(state)=>{
            state.isFetching = true
            state.isError = false
            state.isSuccess = false
        },
        getAllCategorySuccess:(state,action)=>{
            state.categories = action.payload
            state.isFetching = false
            state.isSuccess = true
        },
        getAllCategoryError:(state)=>{
            state.isFetching = false
            state.isError = true
        }
    }
})

export const {getAllCategoryStart,
            getAllCategorySuccess,
            getAllCategoryError} = categorySlice.actions
export default categorySlice.reducer