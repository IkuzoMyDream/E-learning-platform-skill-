import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import ax from "../../../utils/config/ax";
import { Container } from "react-bootstrap";

export default function StudyPagePlayer({ state, material }) {
  const playerRef = React.useRef();
  const [progression, setProgression] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const onReady = React.useCallback(() => {
    if (!isReady && material) {
      const timeToStart =
        (material.progress.progress / 100) *
        material.material.attributes.duration;
      console.log(timeToStart);
      playerRef.current.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady]);

  //   const handleSelectMaterial = async () => {
  //     try {
  //       if (!isLoading) {
  //         setIsLoading(true);
  //       }
  //       var progress_response = await ax.get(
  //         `/users/me?populate[learning_progresses][populate][material][filters][id][$eq]=${material.id}`
  //       );
  //     } catch (err) {
  //       setIsLoading(false);
  //       console.log(err);
  //     } finally {
  //       var is_has_progress = progress_response.data.learning_progresses.find(
  //         (progress) => progress?.material?.id == material.id
  //       );
  //       if (!is_has_progress) {
  //         try {
  //           var post_progress_response = await ax.post(`/progresses`, {
  //             data: {
  //               material: { connect: [{ id: material.id }] },
  //               progress: 0,
  //               course: { connect: [{ id: material.course.data.id }] },
  //               owner: { connect: [{ id: state.user.id }] },
  //             },
  //           });
  //         } catch (err) {
  //           console.log(err);
  //         } finally {
  //         }
  //       } else {
  //         try {
  //         } catch (err) {
  //           console.log(err);
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //       setIsLoading(false);
  //     }
  //   };

  const updateLearningProgress = async () => {
    if (material) {
      try {
        var progress_response = await ax.get(
          `/users/me?populate[learning_progresses][populate][material][filters][id][$eq]=${material.material.id}&populate[learning_progresses][populate]=course`
        );
      } catch (err) {
        console.log(err);
      } finally {
        var is_has_progress = progress_response.data.learning_progresses.find(
          (progress) => progress?.material?.id == material.material.id
        );
        if (!is_has_progress) {
          try {
            var post_progress_response = await ax.post(`/progresses`, {
              data: {
                material: { connect: [{ id: material.material.id }] },
                progress: 0,
                owner: { connect: [{ id: state.user.id }] },
                course: {
                  connect: [
                    { id: material.material.attributes.course.data.id },
                  ],
                },
                course_chapter: {
                  connect: [
                    { id: material.material.attributes.course_chapter.data.id },
                  ],
                },
              },
            });
          } catch (err) {
            console.log(err);
          } finally {
          }
        } else {
          try {
            if (
              material.progress <
              (progression / material.material.attributes.duration) * 100
            ) {
              var put_progress_response = await ax.put(
                `/progresses/${is_has_progress.id}`,
                {
                  data: {
                    progress: Math.min(
                      Math.round(
                        (progression / material.material.attributes.duration) *
                          100
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
    console.log(progression);
    if (
      (progression % 2 === 0 ||
        Math.round(
          (progression / material.material.attributes.duration) * 100
        ) > 80) &&
      material &&
      material?.progress.progress !== 100
    ) {
      updateLearningProgress();
    }
  }, [progression]);

  return (
    <>
      {material && (
        <div
          style={{
            marginTop: "25px",
            marginLeft: "25px",
            marginBottom: "25px",
            marginRight: "425px",
            height: "100%",
          }}
        >
          <ReactPlayer
            ref={playerRef}
            playing={true}
            onReady={onReady}
            url={
              "http://localhost:1337" +
              material.material.attributes.video.data[0].attributes.url
            }
            controls
            onProgress={({ playedSeconds }) =>
              setProgression(Math.round(playedSeconds))
            }
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            volume={0.2}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </>
  );
}
