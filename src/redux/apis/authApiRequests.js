import axios from 'axios';
import { loginError, loginStart, loginSuccess, logout, registerError, registerStart, registerSuccess } from '../authSlice';
import {clearUserCart} from '../cartSlice'
import { toast } from 'react-toastify';
export const loginUser =async (user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:7000/api/auth/login',user)
        dispatch(loginSuccess(res.data))
        toast.success('Đăng nhập thành công')
        navigate('/')
    } catch (error) {
        dispatch(loginError())
        toast.error('Đăng nhập thất bại')
        toast.error()
    }
}

export const registerUser = async (user,dispatch,navigate) =>{
    dispatch(registerStart())
    try {
        const res = await axios.post('http://localhost:7000/api/auth/register',user)
        dispatch(registerSuccess(res.data))
        toast.success('Đăng ký thành công')
        navigate('/login')
    } catch (error) {
        dispatch(registerError())
        toast.error('Đăng ký thất bại')
    }
}

export const logoutUser = async (axiosJWT,dispatch,navigate,accessToken,refreshToken) =>{
    try {
        const res = await axiosJWT.post('http://localhost:7000/api/auth/logout',refreshToken,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(logout(res.data))
        dispatch(clearUserCart())
        navigate('/')
        toast.success('Đăng xuất thành công')
    } catch (error) {
        console.log(error)
    }
}



