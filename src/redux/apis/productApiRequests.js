import axios from 'axios';
import { getAllProductError, getAllProductStart, getAllProductSuccess, getHomeProductError, getHomeProductStart, getHomeProductSuccess, getOneProductError, getOneProductStart, getOneProductSuccess } from '../productSlice';

export const getAllProduct = async(dispatch,limit,page,categoryId) =>{
    dispatch(getAllProductStart());
    try {
        if(categoryId){
            const res = await axios.get(`https://sercurity-sql-be.onrender.com/api/product/?limit=${limit}&page=${page}&categoryId=${categoryId}`);
            dispatch(getAllProductSuccess(res.data))
        }
        else{
            const res = await axios.get(`https://sercurity-sql-be.onrender.com/api/product/?limit=${limit}&page=${page}`);
            dispatch(getAllProductSuccess(res.data))
        }
    } catch (error) {
        dispatch(getAllProductError())
    }
}

export const getOneProduct = async(dispatch,id) =>{
    dispatch(getOneProductStart());
    try {
        const res = await axios.get(`https://sercurity-sql-be.onrender.com/api/product/${id}`)
        dispatch(getOneProductSuccess(res.data))
    } catch (error) {
        dispatch(getOneProductError())
    }
}

export const getHomeProduct = async(dispatch,limit) =>{
    dispatch(getHomeProductStart())
    try {
        const res = await axios.get(`https://sercurity-sql-be.onrender.com/api/product/?limit=${limit}`)
        dispatch(getHomeProductSuccess(res.data))
    } catch (error) {
        dispatch(getHomeProductError())
    }
}