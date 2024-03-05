import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import ax from "../../utils/config/ax";

export default function AddCoursePage() {
  const [courseImg, setCourseImg] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [name_teacher, setNameTeacher] = useState(null);
  const [mail_teacher, setEmailTeacher] = useState(null);
  const [previewVdo, setPreviewVdo] = useState(null);

  const [categories, setCategories] = useState(null);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    try {
      console.log(chapters);
      const response = ax.post("/courses", {
        data: {
          name: name,
          description: description,
          name_teacher: name_teacher,
          mail_teacher: mail_teacher,
          price: price,
          categories: { connect: [...selectedCategoriesId] },
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const fetchItems = async () => {
    try {
      const response_categories = await ax.get("/categories");

      setCategories(
        response_categories.data.data.map((category) => {
          return {
            id: category.id,
            ...category.attributes,
          };
        })
      );
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
                  required
                />
              </Col>
              <Col>
                <Form.Label>รูปคอร์ส</Form.Label>
                <Form.Control
                  //   required
                  accept="image/*"
                  type="file"
                  label="Upload Course Picture"
                  onChange={(e) => setCourseImg(e.target.files[0])}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>คำอธิบาย</Form.Label>
                <Form.Control
                  //   required
                  as="textarea"
                  placeholder="คำอธิบาย"
                  style={{ resize: "none" }}
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
                      //   required
                      key={category.id}
                      className="my-3"
                      label={category.name}
                      onChange={() => handleCheckboxChange(category.id)}
                    />
                  ))}
                </Form>
              </Col>
              <Col>
                <Form.Label>ราคา</Form.Label>
                <Form.Control
                  //   required
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>ชื่อผู้สอน</Form.Label>
                <Form.Control
                  //   required
                  type="text"
                  onChange={(e) => setNameTeacher(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>อีเมลผู้สอน</Form.Label>
                <Form.Control
                  //   required
                  type="email"
                  onChange={(e) => setEmailTeacher(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col lg="4" className="text-center">
                <Form.Label>วิดิโอตัวอย่าง</Form.Label>
                <Form.Control
                  //   required
                  accept="image/*"
                  type="file"
                  label="Upload Course Preview"
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
                            // required
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
                            // required
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
                            // required
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
                                // required
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
                                // required
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
                                // required
                                type="text"
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
                              <Form.Control type="file" accept="video/*" />
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
    </Container>
  );
}
