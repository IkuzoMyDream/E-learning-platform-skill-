import { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

export default function StudyPage() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { courseName } = useParams();

  const fetchItem = async () => {
    try {
      setIsLoading(true);
      const response = await ax.get(
        `${conf.getMaterialFilteredByCourseName}${courseName}`
      );
      setMaterials(
        response.data.data[0].attributes.materials.data
          .map((material) => {
            return { id: material.id, ...material.attributes };
          })
          .sort((a, b) => a.chapter_number - b.chapter_number)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMaterial = async (material) => {
    setSelectedMaterial(material);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    console.log(selectedMaterial);
    fetchItem();
  }, [selectedMaterial]);

  useEffect(() => {}, [materials]);

  return (
    <Container>
      {selectedMaterial && !isLoading && (
        <video
          className="text-center"
          controls
          contextMenu="nodownload"
          width="300"
          height="300"
        >
          <source
            src={
              "http://localhost:1337" +
              selectedMaterial?.video?.data[0]?.attributes?.url
            }
          ></source>
        </video>
      )}
      {materials.map((material) => (
        <Card
          className="text-center my-3"
          style={{ cursor: "pointer" }}
          onClick={() => handleSelectMaterial(material)} // ส่งพารามิเตอร์ material ไปยังฟังก์ชัน handleSelectMaterial
          key={material.id}
        >
          <Card.Body>
            <Card.Title>
              บทที่ {material.chapter_number}: {material.title}
            </Card.Title>
            <Card.Subtitle>{material.description}</Card.Subtitle>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
