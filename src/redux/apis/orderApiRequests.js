import { createOrderError, createOrderStart, createOrderSuccess, getUserOrderError, getUserOrderStart, getUserOrderSuccess } from "../orderSlice"
import { toast } from "react-toastify"
export const createOrder = async(data,dispatch,navigate,axiosJWT,accessToken,userId)=>{
    dispatch(createOrderStart())
    try {
        const res = await axiosJWT.post(`http://localhost:7000/api/order/create/${userId}`,data,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(createOrderSuccess(res.data))
        navigate('/')
        toast.success('Đặt hàng thành công')
    } catch (error) {
        dispatch(createOrderError())
        toast.error('Đặt hàng thất bại')
    }
}

export const getUserOrder = async(dispatch,axiosJWT,accessToken,userId)=>{
    dispatch(getUserOrderStart())
    try {
        const res = await axiosJWT.get(`http://localhost:7000/api/order/${userId}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getUserOrderSuccess(res.data))
    } catch (error) {
        dispatch(getUserOrderError())
    }
}