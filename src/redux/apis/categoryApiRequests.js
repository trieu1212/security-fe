import axios from 'axios';
import { getAllCategoryError, getAllCategoryStart, getAllCategorySuccess } from '../categorySlice';

export const getAllCategory = async(dispatch)=>{
    dispatch(getAllCategoryStart())
    try {
        const res = await axios.get('https://sercurity-sql-be.onrender.com/api/category')
        dispatch(getAllCategorySuccess(res.data))
    } catch (error) {
     dispatch(getAllCategoryError())   
    }
}