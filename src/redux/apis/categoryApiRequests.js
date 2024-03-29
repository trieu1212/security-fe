import axios from 'axios';
import { getAllCategoryError, getAllCategoryStart, getAllCategorySuccess } from '../categorySlice';

export const getAllCategory = async(dispatch)=>{
    dispatch(getAllCategoryStart())
    try {
        const res = await axios.get('http://localhost:7000/api/category')
        dispatch(getAllCategorySuccess(res.data))
    } catch (error) {
     dispatch(getAllCategoryError())   
    }
}