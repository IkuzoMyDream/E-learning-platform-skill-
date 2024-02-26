import { Modal, Button } from "react-bootstrap";

export default function ModalPurchaseFinished({ setIsShowTransactionModal }) {
  return (
    <>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => setIsShowTransactionModal(false)}
        >
          ปิด
        </Button>
      </Modal.Footer>
    </>
  );
}
