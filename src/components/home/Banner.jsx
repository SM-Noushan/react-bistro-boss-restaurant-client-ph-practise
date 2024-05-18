import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const assets = "../../assets/home";
  return (
    <>
      <Carousel>
        <div>
          <img src={`${assets}/01.jpg`} />
        </div>
        <div>
          <img src={`${assets}/02.jpg`} />
        </div>
        <div>
          <img src={`${assets}/03.png`} />
        </div>
        <div>
          <img src={`${assets}/04.jpg`} />
        </div>
        <div>
          <img src={`${assets}/05.png`} />
        </div>
        <div>
          <img src={`${assets}/06.png`} />
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
