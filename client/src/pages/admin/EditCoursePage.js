import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import ax from "../../utils/config/ax";
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';


export default function EditCoursePage() {

  const { courseId } = useParams();
  const [courseImg, setCourseImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [name_teacher, setNameTeacher] = useState();
  const [mail_teacher, setEmailTeacher] = useState();
  const [previewVdo, setPreviewVdo] = useState();
  const [categories, setCategories] = useState();
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    price: "",
    name_teacher: "",
    mail_teacher: "",
    previewVdo: null,
    courseImg: null,
    categories: [],
    chapters: [],
  });
  const [chapters, setChapters] = useState([
    {
      chapter: 1,
      name: "บทที่ 1: ",
      description: "",
      duration: "",
      subchapters: [
        // {
        //   subchapter: 1,
        //   name: "",
        //   description: "",
        //   duration: "",
        // },
      ],
    },
  ]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPreviewVdo = new FormData();
    formPreviewVdo.append("files", previewVdo, previewVdo.name);

    const formCourseImg = new FormData();
    formCourseImg.append("files", courseImg, courseImg.name);

    try {
      const uploadPictureResponse = await ax.put("/upload", formCourseImg);
      const uploadPreviewVdoResponse = await ax.put("/upload", formPreviewVdo);
      const courseImgId = uploadPictureResponse.data[0].id;
      const previewVdoId = uploadPreviewVdoResponse.data[0].id;
      const postCourseResponse = await ax.put("/courses", {
        data: {
          name: name,
          description: description,
          name_teacher: name_teacher,
          mail_teacher: mail_teacher,
          price: price,
          categories: { connect: [...selectedCategoriesId] },
          preview: previewVdoId,
          picture: courseImgId,
        },
      });

      const courseId = postCourseResponse.data.data.id;

      // add chapter and sub-chapter
      await Promise.all(
        chapters.map(async (chapter) => {
          // add chapters
          const postChapterResponse = await ax.put("/course-chapters", {
            data: {
              chapter: chapter.chapter,
              description: chapter.description,
              duration: chapter.duration,
              title: chapter.name,
              course: courseId,
            },
          });
          const chapterId = postChapterResponse.data.data.id;

          // add sub-chapters
          chapter.subchapters.map(async (subchapter) => {
            const formMaterialVdo = new FormData();
            formMaterialVdo.append(
              "files",
              subchapter.video,
              subchapter.video.name
            );

            const uploadVideoResponse = await ax.put(
              "/upload",
              formMaterialVdo
            );
            const videoId = uploadVideoResponse.data[0].id;

            await ax.post("/materials", {
              data: {
                subchapter: subchapter.subchapter,
                title: subchapter.name,
                description: subchapter.description,
                duration: subchapter.duration,
                video: videoId,
                course_chapter: chapterId,
                course: courseId,
              },
            });
          });
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };

  const fetchItems = async () => {
    try {
      const response_categories = await ax.get("/categories");

      setCategories(
        response_categories.data.data.map((category) => {
          return {
            id: category.id,
            ...category?.attributes,
          };
        })
      );
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const deleteCourse = async () => {
    try {
      const deleteCourse1 = await ax.delete(`/courses/${courseId}`);
      deleteCourse1();
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCheckboxChange = (courseId) => {
    setSelectedCategoriesId((prevSelectedCoursesId) => {
      if (prevSelectedCoursesId.includes(courseId)) {
        return prevSelectedCoursesId.filter((id) => id !== courseId);
      } else {
        return [...prevSelectedCoursesId, courseId];
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(`/courses/${courseId}`);
        const course = response.data.data;
        console.log(courseId)

        setCourseData({
          name: course.name,
          description: course.description,
          price: course.price,
          name_teacher: course.name_teacher,
          mail_teacher: course.mail_teacher,
          previewVdo: course.preview,
          courseImg: course.picture,
          categories: course.categories.map((category) => category.id),
          chapters: course.chapters.map((chapter) => {
            return {
              chapter: chapter.chapter,
              name: chapter.title,
              description: chapter.description,
              duration: chapter.duration,
              subchapters: chapter.materials.map((material) => {
                return {
                  subchapter: material.subchapter,
                  name: material.title,
                  description: material.description,
                  duration: material.duration,
                  video: null, // We don't fetch video data in this request
                };
              }),
            };
          }),
        });
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
    fetchItems();
  }, []);

  //   useEffect(() => {
  //     console.log(chapters);
  //   }, [chapters]);

  const handleDeleteChapter = (index) => {
    setChapters((prevChapters) => prevChapters.filter((_, i) => i !== index));
  };

  const handleDeleteSubChapter = (chapterIndex, subIndex) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter, index) =>
        index === chapterIndex
          ? {
              ...chapter,
              subchapters: chapter.subchapters.filter((_, i) => i !== subIndex),
            }
          : chapter
      )
    );
  };

  const handleAddChapter = () => {
    const newChapterNumber = chapters.length + 1;
    setChapters((prevChapters) => [
      ...prevChapters,
      {
        chapter: newChapterNumber,
        name: `บทที่ ${newChapterNumber}: `,
        description: "",
        duration: "",
        subchapters: [
          //   {
          //     subchapter: 1,
          //     name: "",
          //     description: "",
          //     duration: "",
          //   },
        ],
      },
    ]);
  };

  const handleAddSubChapter = (chapterIndex) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter, index) =>
        index === chapterIndex
          ? {
              ...chapter,
              subchapters: [
                ...chapter.subchapters,
                {
                  subchapter: chapter.subchapters.length + 1,
                  name: "",
                  description: "",
                  duration: "",
                  video: "",
                },
              ],
            }
          : chapter
      )
    );
  };

  return (
    <Container>
      <>
        {categories && (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label>หัวข้อ</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="หัวข้อ"
                  value={courseData.name}
                  required
                />
              </Col>
              <Col>
                <Form.Label>รูปคอร์ส</Form.Label>
                <Form.Control
                  required
                  accept="image/*"
                  type="file"
                  label="Upload Course Picture"
                  value={courseData.courseImg}
                  onChange={(e) => setCourseImg(e.target.files[0])}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>คำอธิบาย</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="คำอธิบาย"
                  style={{ resize: "none" }}
                  value={courseData.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>หมวดหมู่</Form.Label>
                <Form>
                  {categories.map((category) => (
                    <Form.Check
                      required
                      key={category.id}
                      className="my-3"
                      label={category.name}
                      value={courseData.category}
                      onChange={() => handleCheckboxChange(category.id)}
                    />
                  ))}
                </Form>
              </Col>
              <Col>
                <Form.Label>ราคา</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={courseData.price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>ชื่อผู้สอน</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={courseData.name_teacher}
                  onChange={(e) => setNameTeacher(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>อีเมลผู้สอน</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={courseData.mail_teacher}
                  onChange={(e) => setEmailTeacher(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col lg="4" className="text-center">
                <Form.Label>วิดิโอตัวอย่าง</Form.Label>
                <Form.Control
                  required
                  accept="video/*"
                  type="file"
                  label="Upload Course Preview"
                  value={courseData.previewVdo}
                  onChange={(e) => setPreviewVdo(e.target.files[0])}
                />
              </Col>
            </Row>
            <Row>
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>เพิ่มเนื้อหาและบทเรียน</Form.Label>
                  </Col>
                </Row>
                {chapters.map((chapter, index) => (
                  <Accordion key={index}>
                    <Accordion.Item>
                      <Accordion.Header>
                        <p>{chapter.name}</p>
                        {/* <input
                          className="form-control"
                          placeholder={chapter.name}
                        /> */}
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteChapter(index)}
                        >
                          ลบบท
                        </Button>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group controlId={`chapterTitle_${index}`}>
                          <Form.Label>หัวข้อ</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Chapter Title"
                            value={chapter.name} // Make sure to set the value to the current name
                            onChange={(e) => {
                              const newTitle = e.target.value;
                              setChapters((prevChapters) =>
                                prevChapters.map((chap, idx) =>
                                  idx === index
                                    ? { ...chap, name: newTitle }
                                    : chap
                                )
                              );
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId={`chapterDescription_${index}`}>
                          <Form.Label>รายละเอียด</Form.Label>
                          <Form.Control
                            required
                            as="textarea"
                            placeholder="Chapter Description"
                            onChange={(e) => {
                              const newDescription = e.target.value;
                              setChapters((prevChapters) =>
                                prevChapters.map((chap, idx) =>
                                  idx === index
                                    ? { ...chap, description: newDescription }
                                    : chap
                                )
                              );
                            }}
                          />
                        </Form.Group>
                        <Form.Group controlId={`chapterDuration_${index}`}>
                          <Form.Label>ความยาวทั้งบทเรียน (วินาที)</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Chapter Video Duration"
                            onChange={(e) => {
                              const newDuration = e.target.value;
                              setChapters((prevChapters) =>
                                prevChapters.map((chap, idx) =>
                                  idx === index
                                    ? { ...chap, duration: newDuration }
                                    : chap
                                )
                              );
                            }}
                          />
                        </Form.Group>
                        {chapter.subchapters.map((subchapter, subIndex) => (
                          <div key={subIndex}>
                            <Form.Group
                              controlId={`subchapterTitle_${index}_${subIndex}`}
                            >
                              <Form.Label>หัวข้อ</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Subchapter Title"
                                value={subchapter.name}
                                onChange={(e) => {
                                  const newTitle = e.target.value;
                                  setChapters((prevChapters) =>
                                    prevChapters.map((chap, idx) =>
                                      idx === index
                                        ? {
                                            ...chap,
                                            subchapters: chap.subchapters.map(
                                              (subchap, sidx) =>
                                                sidx === subIndex
                                                  ? {
                                                      ...subchap,
                                                      name: newTitle,
                                                    }
                                                  : subchap
                                            ),
                                          }
                                        : chap
                                    )
                                  );
                                }}
                              />
                            </Form.Group>
                            <Form.Group
                              controlId={`subchapterDescription_${index}_${subIndex}`}
                            >
                              <Form.Label>รายละเอียด</Form.Label>
                              <Form.Control
                                required
                                as="textarea"
                                placeholder="Subchapter Description"
                                value={subchapter.description}
                                onChange={(e) => {
                                  const newDescription = e.target.value;
                                  setChapters((prevChapters) =>
                                    prevChapters.map((chap, idx) =>
                                      idx === index
                                        ? {
                                            ...chap,
                                            subchapters: chap.subchapters.map(
                                              (subchap, sidx) =>
                                                sidx === subIndex
                                                  ? {
                                                      ...subchap,
                                                      description:
                                                        newDescription,
                                                    }
                                                  : subchap
                                            ),
                                          }
                                        : chap
                                    )
                                  );
                                }}
                              />
                            </Form.Group>
                            <Form.Group
                              controlId={`subchapterDuration_${index}_${subIndex}`}
                            >
                              <Form.Label>ความยาววิดีโอ</Form.Label>
                              <Form.Control
                                required
                                type="number"
                                placeholder="Subchapter Video Duration"
                                value={subchapter.duration}
                                onChange={(e) => {
                                  const newDuration = e.target.value;
                                  setChapters((prevChapters) =>
                                    prevChapters.map((chap, idx) =>
                                      idx === index
                                        ? {
                                            ...chap,
                                            subchapters: chap.subchapters.map(
                                              (subchap, sidx) =>
                                                sidx === subIndex
                                                  ? {
                                                      ...subchap,
                                                      duration: newDuration,
                                                    }
                                                  : subchap
                                            ),
                                          }
                                        : chap
                                    )
                                  );
                                }}
                              />
                            </Form.Group>
                            <Form.Group
                              controlId={`subchapterVdo_${index}_${subIndex}`}
                            >
                              <Form.Label>Video</Form.Label>
                              <Form.Control
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const newVideo = e.target.files[0];
                                  setChapters((prevChapters) =>
                                    prevChapters.map((chap, idx) =>
                                      idx === index
                                        ? {
                                            ...chap,
                                            subchapters: chap.subchapters.map(
                                              (subchap, sidx) =>
                                                sidx === subIndex
                                                  ? {
                                                      ...subchap,
                                                      video: newVideo,
                                                    }
                                                  : subchap
                                            ),
                                          }
                                        : chap
                                    )
                                  );
                                }}
                              />
                            </Form.Group>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDeleteSubChapter(index, subIndex)
                              }
                            >
                              ลบหัวข้อย่อย
                            </Button>
                          </div>
                        ))}

                        <Button
                          variant="secondary"
                          onClick={() => handleAddSubChapter(index)}
                        >
                          เพิ่มหัวข้อย่อย
                        </Button>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
                <Button variant="secondary" onClick={handleAddChapter}>
                  เพิ่มบท
                </Button>
              </Form>
            </Row>
            <Row>
              <Button type="submit">เพิ่มคอร์ส</Button>
            </Row>
          </Form>
        )}
      </>
      <Button variant="danger" position= "right" onClick={handleShow}>
       ลบคอส
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ต้องการจะลบคอสนี้หรือไม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>หากกด"ยืนยัน"แล้วจะไม่สามารถย้อนกลับได้แต่ข้อมมูลในคอสยังคงอยู่
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="outline-danger" onClick={handleClose && deleteCourse}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
