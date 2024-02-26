import { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

export default function StudyPage() {
  const [materials, setMaterials] = useState([]);

  const fetchItem = async () => {
    try {
      const response = await ax.get(conf.getMaterial);
      setMaterials(response.data.data.map((material) => material.attributes));
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    console.log(materials);
  }, [materials]);

  return (
    <>
      {materials.map((material) => (
        <>
          <h1>{material.title}</h1>
          <video width="320" height="240" controls controlsList="nodownload">
            <source
              controls
              type="video/mp4"
              src={
                "http://localhost:1337" + material.video.data[0].attributes.url
              }
            />
          </video>
        </>
      ))}
    </>
  );
}
