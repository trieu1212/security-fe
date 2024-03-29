// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import "./HomeComment.css";
// import star from "../../assets/images/star.png";
// import avata1 from "../../assets/images/avata1.jpg";
// import avata2 from "../../assets/images/avata2.jpg";
// import next from "../../assets/images/next.png";
// import prev from "../../assets/images/prev.png";
// const HomeComment = () => {
//   const [translateY, setTranslateY] = useState(0);
//   const [commentListHeight, setCommentListHeight] = useState(0);
//   const [commentIndex, setCommentIndex] = useState(0);
//   const commentListRef = useRef(null);
//   const commentHeight = 400; // Chiều cao của mỗi comment

//   useEffect(() => {
//     // Lấy chiều cao của phần tử comment list khi component được render
//     setCommentListHeight(commentListRef.current.scrollHeight);
//   }, []);

//   const handleNextClick = () => {
//     // Kiểm tra xem có đủ comment để di chuyển không
//     if (commentListHeight > commentHeight * (commentIndex + 1)) {
//       setCommentIndex((prevIndex) => prevIndex + 1);
//       setTranslateY((prevTranslateY) => prevTranslateY - commentHeight);
//     } else {
//       setCommentIndex(0);
//       setTranslateY(0);
//     }
//   };

//   const handlePrevClick = () => {
//     // Kiểm tra xem có đủ comment để di chuyển không
//     if (commentIndex > 0) {
//       setCommentIndex((prevIndex) => prevIndex - 1);
//       setTranslateY((prevTranslateY) => prevTranslateY + commentHeight);
//     } else {
//       setCommentIndex(1);
//       setTranslateY(-commentListHeight + commentHeight);
//     }
//   };
//   return (
//     <>
//       <div id="comment">
//         <h2>NHẬN XÉT CỦA KHÁCH HÀNG</h2>
//         <div id="comment-body">
//           <div class="prev" onClick={handlePrevClick}>
//             <Link to="#">
//               <img src={prev} alt="" />
//             </Link>
//           </div>
//           <ul
//             id="list-comment"
//             ref={commentListRef}
//             style={{ transform: `translateY(${translateY}px)` }}
//           >
//             <li className={`item ${commentIndex === 0 ? 'active' : ''}`}>
//               <div class="avatar">
//                 <img src={avata1} alt="" />
//               </div>
//               <div class="stars">
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//               </div>
//               <div class="name">Quốc Triệu</div>

//               <div class="text">
//                 <p>
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industry's
//                   standard dummy text ever since the 1500s, when an unknown
//                   printer took a galley of type and scrambled it to make a type
//                   specimen book.
//                 </p>
//               </div>
//             </li>
//             <li className={`item ${commentIndex === 1 ? 'active' : ''}`}>
//               <div class="avatar">
//                 <img src={avata2} alt="" />
//               </div>
//               <div class="stars">
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//                 <span>
//                   <img src={star} alt="" />
//                 </span>
//               </div>
//               <div class="name">Bích Trâm</div>

//               <div class="text">
//                 <p>
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industry's
//                   standard dummy text ever since the 1500s, when an unknown
//                   printer took a galley of type and scrambled it to make a type
//                   specimen book.
//                 </p>
//               </div>
//             </li>
//           </ul>
//           <div class="next" onClick={handleNextClick}>
//             <Link to="#">
//               <img src={next} alt="" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomeComment;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeComment.css";
import star from "../../assets/images/star.png";
import avata1 from "../../assets/images/avata1.jpg";
import avata2 from "../../assets/images/avata2.jpg";
import next from "../../assets/images/next.png";
import prev from "../../assets/images/prev.png";

const HomeComment = () => {
  const [translateY, setTranslateY] = useState(0);
  const [commentListHeight, setCommentListHeight] = useState(0);
  const [commentIndex, setCommentIndex] = useState(0);
  const commentListRef = useRef(null);

  useEffect(() => {
    setCommentListHeight(commentListRef.current.scrollHeight);
  }, []);

  const handleNextClick = () => {
    const newCommentIndex = (commentIndex + 1) % 2; // Tính chỉ số của comment kế tiếp
    setCommentIndex(newCommentIndex);
    setTranslateY(-commentListHeight / 2 * newCommentIndex); // Di chuyển translateY dựa trên chỉ số comment
  };

  const handlePrevClick = () => {
    const newCommentIndex = (commentIndex - 1 + 2) % 2; // Tính chỉ số của comment trước đó
    setCommentIndex(newCommentIndex);
    setTranslateY(-commentListHeight / 2 * newCommentIndex); // Di chuyển translateY dựa trên chỉ số comment
  };

  return (
    <>
      <div id="comment">
        <h2>NHẬN XÉT CỦA KHÁCH HÀNG</h2>
        <div id="comment-body">
          <div className="prev" onClick={handlePrevClick}>
            <Link to="#">
              {/* <img src={prev} alt="" /> */}
            </Link>
          </div>
          <ul
            id="list-comment"
            ref={commentListRef}
            style={{ transform: `translateY(${translateY}px)` }}
          >
            <li className={`item ${commentIndex === 0 ? 'active' : ''}`}>
              <div className="avatar">
                <img src={avata1} alt="" />
              </div>
              <div className="stars">
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
              </div>
              <div className="name">Quốc Triệu</div>

              <div className="text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
            {/* <li className={`item ${commentIndex === 1 ? 'active' : ''}`}>
              <div className="avatar">
                <img src={avata2} alt="" />
              </div>
              <div className="stars">
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
              </div>
              <div className="name">Bích Trâm</div>

              <div className="text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li> */}
          </ul>
          <div className="next" onClick={handleNextClick}>
            <Link to="#">
              {/* <img src={next} alt="" /> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComment;
