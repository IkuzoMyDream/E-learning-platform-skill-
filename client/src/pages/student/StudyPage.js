import React, { useContext, useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import { AuthContext } from "../../utils/auth/Auth.context";
import StudyPageNavbar from "../../components/student/study-page/study-page-navbar";
import StudyPagePlayer from "../../components/student/study-page/study-page-player";

export default function StudyPage() {
  const { state } = useContext(AuthContext);
  const [chapters, setChapters] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const { courseName } = useParams();

  const fetchItem = async () => {
    try {
      const chaptersResponse = await ax.get(
        `${conf.getMaterialFilteredByCourseName}${courseName}`
      );

      const chaptersData =
        chaptersResponse.data.data[0].attributes.course_chapters.data;

      const userLearningProgressesResponse = await ax.get(
        "/users/me?populate[learning_progresses][populate]=*"
      );

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
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (chapters) {
    return (
      <>
        <StudyPageNavbar
          chapters={chapters}
          setSelectedMaterial={setSelectedMaterial}
        />
        <StudyPagePlayer state={state} material={selectedMaterial} />
      </>
    );
  }
}
