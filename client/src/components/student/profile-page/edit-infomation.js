import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Image,
  Modal,
} from "react-bootstrap";
import "./editinfo.css";
import { useEffect, useState } from "react";
import ax from "../../../utils/config/ax";
import config from "../../../config";

export default function EditInfomation({
  userInfomation,
  setUserInfomation,
  setIsEditInfomation,
  isInfoUpdated,
  setIsInfoUpdated,
  state,
}) {
  const [image, setImage] = useState(null);
  const [isShowConfirmedModal, setIsShowConfirmedModal] = useState(false);

  const handleSubmit = async (e) => {
    setIsInfoUpdated(false);
    // e.preventDefault();
    const formData = new FormData();
    try {
      if (image) {
        formData.append("files", image, image.name);

        const uploadImgResponse = await ax.post(
          `${config.serverAdminUrlPrefix}/api/upload/`,
          formData
        );
        const pictureId = uploadImgResponse.data[0].id;

        const response = await ax.put(`/users/${state.user.id}`, {
          firstname: userInfomation.firstname,
          lastname: userInfomation.lastname,
          phone_number: userInfomation.phoneNumber,
          email: userInfomation.email,
          about_me: userInfomation.aboutMe,
          avatar: pictureId,
        });
      } else {
        const response = await ax.put(`/users/${state.user.id}`, {
          firstname: userInfomation.firstname,
          lastname: userInfomation.lastname,
          phone_number: userInfomation.phoneNumber,
          email: userInfomation.email,
          about_me: userInfomation.aboutMe,
        });
      }
    } catch (err) {
    } finally {
      window.location.reload();
    }
  };

  useEffect(() => {
    // console.log(userInfomation);
    setIsEditInfomation(true);
  }, [userInfomation]);

  return (
    <>
      <h1 style={{ marginBottom: "85px" }}>.</h1>
      <Modal
        show={isShowConfirmedModal}
        // onHide={() => setIsEditInfomation((prevState) => !prevState)}
      >
        <Modal.Body>ท่านต้องการแก้ไขข้อมูลใช่หรือไม่?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleSubmit()}>
            แก้ไข
          </Button>
          <Button
            variant="danger"
            onClick={() => setIsShowConfirmedModal(false)}
          >
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Form>
          <Row className="my-3">
            <Col sm="12" className="text-center">
              <Image
                style={{
                  maxHeight: "150px",
                  maxWidth: "150px",
                  height: "150px",
                  width: "150px",
                  backgroundColor: "#C7C8CC",
                  borderRadius: "50%",
                }}
                src={userInfomation.avatarUrl}
              />
              <p>รูปโปรไฟล์</p>
              <Form.Control
                accept="image/*"
                type="file"
                Label="Upload Profile Picture"
                className="my-3"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setIsInfoUpdated(true);
                }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="6">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={userInfomation.firstname}
                onChange={(e) => {
                  setUserInfomation.setFirstname(e.target.value);
                  setIsInfoUpdated(true);
                }}
              />
            </Col>
            <Col>
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="surname"
                value={userInfomation.lastname}
                onChange={(e) => {
                  setUserInfomation.setLastName(e.target.value);
                  setIsInfoUpdated(true);
                }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="6">
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={userInfomation.phoneNumber}
                onChange={(e) => {
                  setUserInfomation.setPhonenumber(e.target.value);
                  setIsInfoUpdated(true);
                }}
              />
            </Col>
            <Col>
              <Form.Label>อีเมล</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={userInfomation.email}
                onChange={(e) => {
                  setUserInfomation.setEmail(e.target.value);
                  setIsInfoUpdated(true);
                }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="12">
              <Form.Label>เกี่ยวกับฉัน</Form.Label>
              <Form.Control
                rows="4"
                as="textarea"
                placeholder="เกี่ยวกับฉัน"
                value={userInfomation.aboutMe}
                style={{ resize: "none" }}
                onChange={(e) => {
                  setUserInfomation.setAboutMe(e.target.value);
                  setIsInfoUpdated(true);
                }}
              />
            </Col>
          </Row>
          <Row className="my-3 text-center">
            <Col>
              <Button
                disabled={!isInfoUpdated}
                onClick={() => setIsShowConfirmedModal(true)}
                // type="submit"
                variant="secondary"
              >
                แก้ไข
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => setIsEditInfomation(false)}
              >
                ยกเลิก
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
