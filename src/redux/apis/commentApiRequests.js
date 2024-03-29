import {
  addProductCommentError,
  addProductCommentStart,
  addProductCommentSuccess,
  deleteProductCommentError,
  deleteProductCommentStart,
  deleteProductCommentSuccess,
  getProductCommentError,
  getProductCommentStart,
  getProductCommentSuccess,
} from "../commentSlice";

import axios from "axios";
export const addCommentByUser = async (
  data,
  dispatch,
  axiosJWT,
  accessToken,
  userId
) => {
  dispatch(addProductCommentStart());
  try {
    const res = await axiosJWT.post(
      `https://sercurity-sql-be.onrender.com/api/comment/create/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addProductCommentSuccess(res.data));
  } catch (error) {
    dispatch(addProductCommentError());
  }
};

export const getProductComments = async (dispatch, id) => {
  dispatch(getProductCommentStart());
  try {
    const res = await axios.get(`https://sercurity-sql-be.onrender.com/api/comment/${id}`);
    dispatch(getProductCommentSuccess(res.data));
  } catch (error) {
    dispatch(getProductCommentError());
  }
};

export const deleteCommentByUser = async (
  commentId,
  dispatch,
  axiosJWT,
  accessToken,
  userId
) => {
  dispatch(deleteProductCommentStart());
  try {
    const res = await axiosJWT.delete(
      `https://sercurity-sql-be.onrender.com/api/comment/delete/${commentId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(deleteProductCommentSuccess(res.data));
  } catch (error) {
    dispatch(deleteProductCommentError());
  }
};
