import { toast } from "react-toastify";
import {
  addUserCartError,
  addUserCartStart,
  addUserCartSuccess,
  deleteProductFromCartError,
  deleteProductFromCartStart,
  deleteProductFromCartSuccess,
  getUserCartError,
  getUserCartStart,
  getUserCartSuccess,
  updateProductQuantityError,
  updateProductQuantityStart,
  updateProductQuantitySuccess,
  updateUserCartError,
  updateUserCartStart,
  updateUserCartSuccess,
} from "../cartSlice";


export const getUserCart = async (dispatch, axiosJWT, accessToken, userId) => {
  dispatch(getUserCartStart());
  try {
    const res = await axiosJWT.get(`https://sercurity-sql-be.onrender.com/api/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserCartSuccess(res.data));
  } catch (error) {
    dispatch(getUserCartError());
  }
};

export const addUserCart = async (
  data,
  dispatch,
  axiosJWT,
  accessToken,
  userId
) => {
  dispatch(addUserCartStart());
  try {
    const res = await axiosJWT.post(
      `https://sercurity-sql-be.onrender.com/api/cart/create/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addUserCartSuccess(res.data));
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
  } catch (error) {
    dispatch(addUserCartError());
    toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
  }
};

export const updateUserCart = async (
  data,
  dispatch,
  accessToken,
  axiosJWT,
  userId
) => {
  dispatch(updateUserCartStart());
  try {
    const res = await axiosJWT.put(
      `https://sercurity-sql-be.onrender.com/api/cart/update/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(updateUserCartSuccess(res.data));
  } catch (error) {
    dispatch(updateUserCartError());
  }
};

export const deleteUserCart = async (productId,dispatch,axiosJWT,accessToken,userId)=>{
  dispatch(deleteProductFromCartStart())
  try {
    const res = await axiosJWT.delete(`https://sercurity-sql-be.onrender.com/api/cart/delete/${userId}/${productId}`,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    dispatch(deleteProductFromCartSuccess(res.data))
    toast.success("Xóa sản phẩm khỏi giỏ hàng thành công")
  } catch (error) {
    dispatch(deleteProductFromCartError())
    toast.error("Xóa sản phẩm khỏi giỏ hàng thất bại")
  }
}

export const updateProductQuantity=async (data,dispatch,axiosJWT,accessToken,userId)=>{
  dispatch(updateProductQuantityStart())
  try {
    const res = await axiosJWT.put(`https://sercurity-sql-be.onrender.com/api/cart/update/${userId}`,data,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    dispatch(updateProductQuantitySuccess(res.data))
    toast.success("Cập nhật số lượng sản phẩm thành công")
  } catch (error) {
    dispatch(updateProductQuantityError())
    toast.error("Cập nhật số lượng sản phẩm thất bại")
  }
}
