import { Modal, Button, Image } from "react-bootstrap";

export default function ModalOnpurchase({
  enrollCourse,
  setCurrentTransactionState,
  setTransactionState,
  currentTransactionState,
}) {
  return (
    <>
      <Modal.Body className="text-center">
        <Image
          className="text-center"
          style={{ maxHeight: "300px", maxWidth: "300px" }}
          src="/qrtest.png"
        />
      </Modal.Body>
      <Modal.Footer className="text-center">
        <Button
          variant="success"
          onClick={async () => {
            await enrollCourse();
            setCurrentTransactionState((prevState) => prevState + 1);
            setTransactionState((prevState) => ({
              ...prevState,
              [currentTransactionState]: {
                now: 33,
                active: false,
                disabled: true,
              },
              [currentTransactionState + 1]: {
                now: prevState[currentTransactionState].now + 33.33,
                active: true,
                disabled: false,
              },
            }));
          }}
        >
          ชำระเงิน
        </Button>
      </Modal.Footer>
    </>
  );
}
