import { Carousel, Container, Image } from "react-bootstrap";
import { useState } from "react";
import CarouselSliderItems from "./carousel-slider-items";

export default function CarouselSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Carousel style={{zIndex:"1 !important"}} activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <CarouselSliderItems />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselSliderItems />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselSliderItems />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
