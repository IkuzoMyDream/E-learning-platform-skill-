import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";

export default function TransactionButton({
  isLoggedIn,
  isPurchased,
  isCarted,
  userId,
  courseId,
}) {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddCart = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else if (!isPurchased) {
      addCourseToCart();
    }
  };

  const addCourseToCart = async () => {
    try {
      await ax.post(conf.postCart, {
        data: { course: courseId, owner: userId },
      });
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/cart");
    }
  };

  return (
    <>
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        className="text-center"
      >
        <Modal.Header>
          <Modal.Title>มีรหัสนักเรียน SKILL++ หรือไม่?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Dialog>
            <Button>เข้าสู่ระบบ</Button>
          </Modal.Dialog>
          <p>หรือ</p>
          <Modal.Dialog>
            <Button>สมัครสมากชิกใหม่</Button>
          </Modal.Dialog>
        </Modal.Body>
      </Modal>
      {isLoggedIn && isPurchased ? (
        <Button
          variant="secondary"
          onClick={() => navigate(`/course/${courseName}/study`)}
        >
          เรียน
        </Button>
      ) : isCarted ? (
        <Button variant="secondary" onClick={() => navigate("/cart")}
          /*style={{
            outline:"none",
            cursor:"pointer",
            border:"none",
            padding:"0.9rem 2rem",
            margin:"0",
            fontFamily:"inherit",
            fontSize:"inherit",
            position:"relative",
            display:"inline-block",
            letterSpacing:"0.5rem",
            fontWeight:"700",
            fontSize:"17px",
            borderRadius:"500px",
            overflow:"hidden",
            background:"#66ff66",
            color: "ghostwhite",
          }}*/
        >
          <span>
            ชำระเงิน
          </span>
        </Button>
      ) : (
        <Button onClick={handleAddCart}>เพิ่มลงตะกร้า</Button>
      )}
    </>
  );
}
