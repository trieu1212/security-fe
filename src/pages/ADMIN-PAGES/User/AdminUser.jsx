import React, { useEffect } from 'react'
import {createAxios} from '../../../services/axiosJWT'
import {useDispatch, useSelector} from 'react-redux'
import {loginSuccess} from '../../../redux/authSlice'
import UserModal from '../../../components/ADMIN-COMPONENTS/UserModal/UserModal'
const AdminUser = () => {
  const [title, setTitle] = React.useState('')
  const [userId, setUserId] = React.useState(0)
  const [show, setShow] = React.useState(false)
  const [users, setUsers] = React.useState([])
  const user =useSelector((state)=>state.auth?.login?.currentUser)
  const dispatch = useDispatch()
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  useEffect(()=>{
      const getAllUser = async()=>{
        const res = await axiosJWT.get(`https://sercurity-sql-be.onrender.com/api/user/${user?.id}`,{
          headers:{
            Authorization: `Bearer ${user?.accessToken}`
          }
        })
        setUsers(res.data)
      }
      getAllUser()
  },[show])
  const handleEdit = (id) =>{
    setTitle('Sửa người dùng')
    setUserId(id)
    setShow(true)
  }
  const handleDelete =  (id) =>{
    setTitle('Xóa người dùng')
    setUserId(id)
    setShow(true)
  }
  const handleAdd = () =>{
    setTitle('Thêm người dùng')
    setShow(true)
  }
  return (
    <>
      <h1 style={{ textAlign:"center" }}>Quản lý người dùng</h1>
      <button className='btn btn-success' onClick={handleAdd}>Thêm người dùng mới</button>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>{
            return(
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Người dùng"}</td>
                <td>
                  <button className='btn btn-danger mx-2' onClick={()=>handleDelete(user.id)}>Xóa</button>
                  <button className='btn btn-warning' onClick={()=>handleEdit(user.id)}>Sửa</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <UserModal show={show} setShow={setShow} title={title} userId={userId} />
    </>
  )
}

export default AdminUser