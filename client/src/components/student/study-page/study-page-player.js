import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import ax from "../../../utils/config/ax";
import { Container } from "react-bootstrap";

import { useMediaQuery } from "react-responsive";
import config from "../../../config";

export default function StudyPagePlayer({ state, material }) {
  const playerRef = React.useRef();
  const [progression, setProgression] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

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
      {material && isDesktopOrLaptop && (
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
            // ref={playerRef}
            // playing={true}
            // onReady={onReady}
            url={
              config.serverAdminUrlPrefix +
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
          <h1>
            บทที่{" "}
            {
              material.material.attributes.course_chapter.data.attributes
                .chapter
            }
            .{material.material.attributes.subchapter}
          </h1>
          <h1>{material.material.attributes.title}</h1>
          <h5>เรียนไปแล้ว {material.progress} %</h5>
        </div>
      )}
      {material && !isDesktopOrLaptop && (
        <>
          <div
            style={{
              marginTop: "25px",
              marginLeft: "25px",
              marginBottom: "25px",
              marginRight: "25px",
              height: "100%",
            }}
          >
            <ReactPlayer
              // ref={playerRef}
              // playing={true}
              // onReady={onReady}
              url={
                config.serverAdminUrlPrefix +
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
            <h1>
              บทที่{" "}
              {
                material.material.attributes.course_chapter.data.attributes
                  .chapter
              }
              .{material.material.attributes.subchapter}
            </h1>
            <h1>{material.material.attributes.title}</h1>
            <h5>เรียนไปแล้ว {material.progress} %</h5>
          </div>
        </>
      )}
    </>
  );
}
