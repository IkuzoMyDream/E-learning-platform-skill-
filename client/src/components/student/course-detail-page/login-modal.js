import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginModal({ isShowLoginModal, setShowLoginModal }) {
  const navigate = useNavigate();
  const onBrandClick = () => {
    navigate("/login");
  };

  const onRegisterHit = () => {
    navigate("/signup");
  };

  return (
    <>
      <Modal
        show={isShowLoginModal}
        onHide={() => setShowLoginModal(false)}
        className="text-center"
      >
        <Modal.Header>
          <Modal.Title>มีรหัสนักเรียน SKILL++ หรือไม่?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Dialog onClick={onBrandClick}>
            <Button>เข้าสู่ระบบ</Button>
          </Modal.Dialog>
          <p>หรือ</p>
          <Modal.Dialog>
            <Button onClick={onRegisterHit}>สมัครสมาชิกใหม่</Button>
          </Modal.Dialog>
        </Modal.Body>
      </Modal>
    </>
  );
}
