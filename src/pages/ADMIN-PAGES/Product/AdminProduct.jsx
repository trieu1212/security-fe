import React, { useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from "react-paginate";
import ProductModal from '../../../components/ADMIN-COMPONENTS/ProductModal/ProductModal';
const AdminProduct = () => {
  const [show,setShow] = React.useState(false)
  const [title,setTitle] = React.useState('')
  const [products, setProducts] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [productId, setProductId] = React.useState(0);
  useEffect(()=>{
    const getAllProduct = async()=>{
      const res = await axios.get(`http://localhost:7000/api/product/?limit=2&page=${currentPage}`)
      setTotalPages(res.data.totalPages)
      setProducts(res.data.product)
    }
    getAllProduct()
  },[currentPage,show])
  const handlePageClick = async(e) => {
    setCurrentPage(+e.selected+1);
  };
  const handleAdd = () =>{
    setTitle('Thêm sản phẩm')
    setShow(true)
  }
  const handleEdit = (id) =>{
    setTitle('Sửa sản phẩm')
    setShow(true)
    setProductId(id)
  }
  const handleDelete = (id) =>{
    setTitle('Xóa sản phẩm')
    setShow(true)
    setProductId(id)
  }
  const formatPrice = (price) =>{
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
  return (
    <>
      <h1 style={{ textAlign:"center" }}>Tất cả sản phẩm</h1>
      <button className='btn btn-success mb-2' onClick={handleAdd}>Thêm sản phẩm mới</button>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Hình ảnh</th>
            <th>Trạng thái</th>
            <th>Danh mục sản phẩm</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index)=>{
            return(
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td><img src={product.image} alt={product.title} style={{width:"100px"}}/></td>
                <td>{product.inStock ? 'Còn hàng' : 'Hết hàng'}</td>
                <td>{product.Category.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <button className='btn btn-primary mx-2' onClick={()=>handleEdit(product.id)}>Sửa</button>
                  <button className='btn btn-danger' onClick={()=>handleDelete(product.id)}>Xóa</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ProductModal show={show} setShow={setShow} title={title} productId={productId} />
      <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
    </>
  )
}

export default AdminProduct