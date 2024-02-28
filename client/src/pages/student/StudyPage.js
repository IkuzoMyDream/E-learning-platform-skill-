import React, { useContext, useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useParams } from "react-router-dom";
import { Card, Container, Dropdown } from "react-bootstrap";
import ReactPlayer from "react-player";
import { AuthContext } from "../../utils/auth/Auth.context";

export default function StudyPage() {
  const { state } = useContext(AuthContext);
  const [chapters, setChapters] = useState([]);
  const [progresses, setProgresses] = useState([]);

  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progression, setProgression] = useState(0);
  const { courseName } = useParams();
  const [isReady, setIsReady] = useState(false);
  const playerRef = React.useRef();

  const onReady = React.useCallback(() => {
    if (!isReady && selectedMaterial) {
      const timeToStart =
        (selectedMaterial.progress.progress / 100) * selectedMaterial.duration;
      console.log(timeToStart);
      playerRef.current.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady, selectedMaterial]);

  const fetchItem = async () => {
    try {
      setIsLoading(true);

      const chaptersResponse = await ax.get(
        `${conf.getMaterialFilteredByCourseName}${courseName}`
      );
      const chaptersData =
        chaptersResponse.data.data[0].attributes.course_chapters.data;
      setChapters(chaptersData);

      const userLearningProgressesResponse = await ax.get(
        "/users/me?populate[learning_progresses][populate]=*"
      );
      setProgresses(userLearningProgressesResponse.data.learning_progresses);

      const learningProgressesData =
        userLearningProgressesResponse.data.learning_progresses
          .filter((progress) => progress.course.name === courseName)
          .sort(
            (a, b) => a.material.chapter_number - b.material.chapter_number
          );

      const mappedChaptersWithProgress = chaptersData.map((chapter) => {
        const correspondingMaterials = chapter.attributes.course_materials.data;
        const mappedProgressAndMaterial = correspondingMaterials.map(
          (material) => {
            const progress = learningProgressesData.find(
              (progress) => progress.material.id === material.id
            );
            return {
              material: material,
              progress: progress ? progress.progress : 0,
            };
          }
        );

        return {
          id: chapter.id,
          ...chapter.attributes,
          material: mappedProgressAndMaterial,
        };
      });

      setChapters(mappedChaptersWithProgress);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMaterial = async (material) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        setSelectedMaterial(material);
      }
      setSelectedMaterial(material);
      var progress_response = await ax.get(
        `/users/me?populate[learning_progresses][populate][material][filters][id][$eq]=${material.id}`
      );
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    } finally {
      var is_has_progress = progress_response.data.learning_progresses.find(
        (progress) => progress?.material?.id == material.id
      );
      if (!is_has_progress) {
        try {
          var post_progress_response = await ax.post(`/progresses`, {
            data: {
              material: { connect: [{ id: material.id }] },
              progress: 0,
              course: { connect: [{ id: material.course.data.id }] },
              owner: { connect: [{ id: state.user.id }] },
            },
          });
        } catch (err) {
          console.log(err);
        } finally {
        }
      } else {
        try {
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    }
  };

  const updateLearningProgress = async () => {
    if (selectedMaterial) {
      try {
        var progress_response = await ax.get(
          `/users/me?populate[learning_progresses][populate][material][filters][id][$eq]=${selectedMaterial.id}`
        );
      } catch (err) {
        console.log(err);
      } finally {
        var is_has_progress = progress_response.data.learning_progresses.find(
          (progress) => progress?.material?.id == selectedMaterial.id
        );
        if (!is_has_progress) {
          try {
            var post_progress_response = await ax.post(`/progresses`, {
              data: {
                material: { connect: [{ id: selectedMaterial.id }] },
                progress: 0,
                course: { connect: [{ id: selectedMaterial.course.data.id }] },
                owner: { connect: [{ id: state.user.id }] },
              },
            });
          } catch (err) {
            console.log(err);
          } finally {
            // console.log(post_progress_response);
          }
        } else {
          try {
            if (
              selectedMaterial.progress.progress <
              (progression / selectedMaterial.duration) * 100
            ) {
              var put_progress_response = await ax.put(
                `/progresses/${is_has_progress.id}`,
                {
                  data: {
                    progress: Math.min(
                      Math.round(
                        (progression / selectedMaterial.duration) * 100
                      ),
                      100
                    ),
                  },
                }
              );
            }
          } catch (err) {
            console.log(err);
          } finally {
          }
        }
      }
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    console.log(chapters, "chapters");
  }, [chapters]);

  useEffect(() => {}, [progresses]);

  useEffect(() => {
    if (
      (progression % 5 === 0 ||
        Math.round((progression / selectedMaterial.duration) * 100) > 80) &&
      selectedMaterial &&
      selectedMaterial?.progress.progress !== 100
    ) {
      updateLearningProgress();
    }
  }, [progression]);

  useEffect(() => {
    console.log(selectedMaterial);
  }, [selectedMaterial]);

  return (
    <Container>
      {selectedMaterial && !isLoading && (
        <ReactPlayer
          ref={playerRef}
          playing={true}
          onReady={onReady}
          url={
            "http://localhost:1337" +
            selectedMaterial.video.data[0].attributes.url
          }
          controls
          onProgress={({ playedSeconds }) =>
            setProgression(Math.round(playedSeconds))
          }
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        ></ReactPlayer>
      )}

      {chapters.map((chapter) => (
        <Dropdown >
          <Dropdown.Toggle>
            บทที่ {chapter.chapter} : {chapter.title}
          </Dropdown.Toggle>
          <Dropdown.Menu >
            {chapter?.material?.map((material) => (
              <Dropdown.Item>
                {material?.material?.attributes?.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ))}
      {/* {chapters.map((chapter) => (
        <Card
          className="text-center my-3"
          style={{ cursor: "pointer" }}
          //   onClick={() => {
          //     setSelectedMaterial(material);
          //     handleSelectMaterial(material);
          //   }}
          key={chapter.id}
        >
          <Card.Body>
            <Card.Title>
              บทที่ {chapter.chapter}: {chapter.title}
            </Card.Title>
            <Card.Subtitle>{chapter.description}</Card.Subtitle>
            <Card.Text>
              เรียนไปแล้ว{" "}
              {chapter.material?.reduce(
                (totalProgress, material) => totalProgress + material.progress,
                0
              )}{" "}
              %
            </Card.Text>
            <Dropdown>
                <Dropdown.Toggle>{}</Dropdown.Toggle>
            </Dropdown>
          </Card.Body>
        </Card>
      ))} */}
    </Container>
  );
}
