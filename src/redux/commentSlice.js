import {createSlice} from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'comment',
    initialState:{
        comments:[],
        isFetching:false,
        isSuccess:false,
        isError:false,
    },
    reducers:{
        //add comment
        addProductCommentStart:(state)=>{
            state.isFetching=true;
            state.isSuccess=false;
            state.isError=false;
        },
        addProductCommentSuccess:(state,action)=>{
            state.comments.push(action.payload)
            state.isFetching=false;
            state.isSuccess=true;
            state.isError=false;
        },
        addProductCommentError:(state)=>{
            state.isFetching=false;
            state.isSuccess=false;
            state.isError=true;
        },

        //get comment
        getProductCommentStart:(state)=>{
            state.isFetching=true;
            state.isSuccess=false;
            state.isError=false;
        },
        getProductCommentSuccess:(state,action)=>{
            state.comments=action.payload
            state.isFetching=false;
            state.isSuccess=true;
            state.isError=false;
        },
        getProductCommentError:(state)=>{
            state.isFetching=false;
            state.isSuccess=false;
            state.isError=true;
        },
        
        //delete comment
        deleteProductCommentStart:(state)=>{
            state.isFetching=true;
            state.isSuccess=false;
            state.isError=false;
        },
        deleteProductCommentSuccess:(state,action)=>{
            state.comments=state.comments.filter(comment=>comment.id!==action.payload)
            state.isFetching=false;
            state.isSuccess=true;
            state.isError=false;
        },
        deleteProductCommentError:(state)=>{
            state.isFetching=false;
            state.isSuccess=false;
            state.isError=true;
        }
    }
})

export const {addProductCommentStart,
            addProductCommentSuccess,
            addProductCommentError,
            getProductCommentStart,
            getProductCommentSuccess,
            getProductCommentError,
            deleteProductCommentStart,
            deleteProductCommentSuccess,
            deleteProductCommentError} = commentSlice.actions;
export default commentSlice.reducer;
