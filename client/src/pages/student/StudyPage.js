import React, { useContext, useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/auth/Auth.context";
import StudyPageNavbar from "../../components/student/study-page/study-page-navbar";
import StudyPagePlayer from "../../components/student/study-page/study-page-player";
import StudyMaterialsOffcanvas from "../../components/student/study-page/study-materials-offcanvas";

import { useMediaQuery } from "react-responsive";

export default function StudyPage() {
  const { state, logout } = useContext(AuthContext);
  const [chapters, setChapters] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [progresses, setProgresses] = useState(null);
  const { courseName } = useParams();

  const [isEnroll, setIsEnroll] = useState(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const [isMaterialOffcanvasOpen, setIsMaterialOffcanvasOpen] =
    useState(isDesktopOrLaptop);

  // const isEnrollThisCourse = async () => {
  //   try {
  //     const response = await ax.get(
  //       "/courses?populate[enrollers][filters][id][$eq]=" + state.user.id
  //     );
  //     console.log(response);
  //   } catch (err) {
  //   } finally {
  //   }
  // };

  useEffect(() => {
    console.log(isEnroll);
  }, [isEnroll]);

  const fetchItem = async () => {
    try {
      const chaptersResponse = await ax.get(
        `${conf.getMaterialFilteredByCourseName}${courseName}`
      );
      console.log(chaptersResponse);
      // setIsEnroll(
      //   chaptersResponse.data.data[0].attributes.enrollers.data.some()
      // );

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

      setSelectedMaterial(
        mappedChaptersWithProgress
          .flatMap((item) => item.material)
          .find((material) => material.progress !== 100)
          ? mappedChaptersWithProgress
              .flatMap((item) => item.material)
              .find((material) => material.progress !== 100)
          : mappedChaptersWithProgress[0].material[0]
      );
    } catch (err) {
    } finally {
      await setSelectedMaterialIntoLatestProgressMaterial();
    }
  };

  const setSelectedMaterialIntoLatestProgressMaterial = async () => {
    try {
      if (chapters) {
        // console.log(chapters);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    setIsMaterialOffcanvasOpen(isDesktopOrLaptop);
  }, [isDesktopOrLaptop]);

  if (chapters) {
    return (
      <>
        <StudyPageNavbar
          state={state}
          setIsMaterialOffcanvasOpen={setIsMaterialOffcanvasOpen}
        />
        <StudyMaterialsOffcanvas
          state={state}
          setSelectedMaterial={setSelectedMaterial}
          logout={logout}
          chapters={chapters}
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMaterialOffcanvasOpen={isMaterialOffcanvasOpen}
          setIsMaterialOffcanvasOpen={setIsMaterialOffcanvasOpen}
        />
        <StudyPagePlayer state={state} material={selectedMaterial} />
      </>
    );
  }
}
