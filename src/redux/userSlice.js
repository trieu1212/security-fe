import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        allUser:null,
        isFetching:false,
        isError:false,
        isSuccess:false
    },
    reducers:{

    }
})