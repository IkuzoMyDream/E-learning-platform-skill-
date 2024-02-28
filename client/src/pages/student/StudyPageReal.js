import React, { useContext, useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { AuthContext } from "../../utils/auth/Auth.context";

export default function StudyPage() {
  const { state } = useContext(AuthContext);
  const [materials, setMaterials] = useState([]);
  const [chapters, setChapters] = useState([]);
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

      const response = await ax.get(
        `${conf.getMaterialFilteredByCourseName}${courseName}`
      );
      setChapters(response.data.data[0].attributes.course_chapters.data);
      const materialsData = response.data.data[0].attributes.materials.data.map(
        (material) => ({ id: material.id, ...material.attributes })
      );

      const userLearningProgressesResponse = await ax.get(
        "/users/me?populate[learning_progresses][populate]=*"
      );
      const learningProgressesData =
        userLearningProgressesResponse.data.learning_progresses
          .filter((progress) => progress.course.name === courseName)
          .sort(
            (a, b) => a.material.chapter_number - b.material.chapter_number
          );

      const mergedData = materialsData.map((material) => {
        const correspondingProgress = learningProgressesData.find(
          (progress) => progress.material.id === material.id
        );
        return { ...material, progress: correspondingProgress };
      });

      setMaterials(mergedData);
    } catch (err) {
      // console.log(err);
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
    console.log(chapters);
  }, [chapters]);

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
      {materials.map((material) => (
        <Card
          className="text-center my-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedMaterial(material);
            handleSelectMaterial(material);
          }}
          key={material.id}
        >
          <Card.Body>
            <Card.Title>
              บทที่ {material.chapter_number}: {material.title}
            </Card.Title>
            <Card.Subtitle>{material.description}</Card.Subtitle>
            <Card.Text>
              เรียนไปแล้ว {material?.progress?.progress || 0} %
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
