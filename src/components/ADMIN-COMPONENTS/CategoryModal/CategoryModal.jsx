import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../services/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import { toast } from "react-toastify";
function CategoryModal(props) {
  const { show, setShow, title, categoryId } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  const handleClose = () => {setShow(false); setName(""); setDescription("")};
  useEffect(() => {
    if (show && title === "Sửa danh mục sản phẩm") {
      const getCategory = async () => {
        const res = await axiosJWT.get(
          `http://localhost:7000/api/category/${categoryId}/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        setName(res.data.name);
        setDescription(res.data.description);
      };
      getCategory();
    } else return;
  }, [show, title, categoryId, user]);
  const handleAction = async () => {
    if (title === "Thêm danh mục sản phẩm") {
      const data = {
        name: name,
        description: description,
      };
      const res = await axiosJWT.post(
        `http://localhost:7000/api/category/create/${user?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      toast.success(res.data.message);
      setShow(false);
    } else if (title === "Xóa danh mục sản phẩm") {
      try {
        const response = await axiosJWT.delete(
          `http://localhost:7000/api/category/delete/${categoryId}/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
      } else {
          console.error("Error:", error);
          toast.error("Có lỗi xảy ra khi kết nối đến máy chủ.");
      } }finally {
        setShow(false);
      }
    } else if (title === "Sửa danh mục sản phẩm") {
      const data = {
        name: name,
        description: description,
      };
      const res = await axiosJWT.put(
        `http://localhost:7000/api/category/update/${categoryId}/${user?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      toast.success(res.data.message);
      setShow(false);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {title === "Thêm danh mục sản phẩm" ? (
            <>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Tên danh mục</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
            </>
          ) : null}
          {title === "Xóa danh mục sản phẩm" ? (
            <>
              <h3>Bạn có chắc là muốn xóa danh mục này không?</h3>
            </>
          ) : null}
          {title === "Sửa danh mục sản phẩm" ? (
            <>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Tên danh mục</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
            </>
          ) : null}
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
  );
}

export default CategoryModal;
