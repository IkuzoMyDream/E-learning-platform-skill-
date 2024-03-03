import { Modal, Button } from "react-bootstrap";

export default function LoginModal({ isShowLoginModal, setShowLoginModal }) {
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
          <Modal.Dialog>
            <Button>เข้าสู่ระบบ</Button>
          </Modal.Dialog>
          <p>หรือ</p>
          <Modal.Dialog>
            <Button>สมัครสมาชิกใหม่</Button>
          </Modal.Dialog>
        </Modal.Body>
      </Modal>
    </>
  );
}
