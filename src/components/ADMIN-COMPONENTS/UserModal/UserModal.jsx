import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from 'react-redux'
import {loginSuccess} from '../../../redux/authSlice'
import {createAxios} from '../../../services/axiosJWT'
import { toast } from 'react-toastify';
const UserModal = (props) => {
    const {show, setShow, title, userId} = props
    const [username, setUsername] = React.useState('')
    const [isAdmin, setIsAdmin] = React.useState(0)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const user =useSelector((state)=>state.auth?.login?.currentUser)
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
    const handleClose = () =>{
        setUsername('')
        setEmail('')
        setIsAdmin(false)
        setShow(false)
    }
    const handleAction = async() =>{
        if(title === 'Xóa người dùng'){
            try {
                const response = await axiosJWT.delete(`http://localhost:7000/api/user/delete/${userId}`,{
                headers:{
                    Authorization: `Bearer ${user?.accessToken}`
                }
            })
            toast.success(response.data.message)
            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    toast.error(error.response.data.message)
                }
                else{
                    console.log(error)
                    toast.error('Đã có lỗi xảy ra bên phía máy chủ')
                }
            }
            finally{
                setShow(false)
            }
        }
        else if(title === 'Sửa người dùng'){
            const data ={
                username,
                isAdmin
            }
            try {
                const res = await axiosJWT.put(`http://localhost:7000/api/user/update/${userId}`,data,{
                    headers:{
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                toast.success(res.data.message)
                setShow(false)
            } catch (error) {
                console.log(error)
            }
        }
        else if(title === 'Thêm người dùng'){
            const data = {
                username,
                email,
                password,
                isAdmin
            }
             await axiosJWT.post(`http://localhost:7000/api/user/create/${user?.id}`,data,{
                headers:{
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }) 
            toast.success("Thêm người dùng thành công")
            setShow(false)
        }
    }
    useEffect(()=>{
        if(title === 'Sửa người dùng'){
            const getUser = async()=>{
                const res = await axiosJWT.get(`http://localhost:7000/api/user/${userId}/${user?.id}`,{
                    headers:{
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                setUsername(res.data.username)
                setIsAdmin(res.data.isAdmin)
                setEmail(res.data.email)
            }
            getUser()
        }
    },[show, title, userId])
  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {title === 'Thêm người dùng' ? (
                <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                    value={username} 
                    className="form-control" 
                    id="username" 
                    placeholder="Nhập tên người dùng"
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    value={email} 
                    className="form-control" 
                    id="email" 
                    placeholder="Nhập email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    value={password} 
                    className="form-control" 
                    id="password" 
                    placeholder="Nhập password"
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group ">
                    <label htmlFor="">Chức vụ</label>
                    <select value={isAdmin} onChange={(e)=>setIsAdmin(e.target.value)} className='form-control'>
                        <option value={true}>Admin</option>
                        <option value={false}>Người dùng</option>
                    </select>
                </div>
            </form>
            ):""}
            {title === 'Xóa người dùng' ? 'Bạn có chắc chắn muốn xóa người dùng này không?' : ''}
            {title === 'Sửa người dùng' ? (
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                    value={username} 
                    className="form-control" 
                    id="username" 
                    placeholder="Nhập tên người dùng"
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    value={email} 
                    disabled={true} 
                    className="form-control" 
                    id="email" 
                    placeholder="Nhập email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group ">
                    <label htmlFor="">Chức vụ</label>
                    <select value={isAdmin} onChange={(e)=>setIsAdmin(e.target.value)} className='form-control'>
                        <option value={1}>Admin</option>
                        <option value={0}>Người dùng</option>
                    </select>
                </div>
            </form>
            ) : ''}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserModal