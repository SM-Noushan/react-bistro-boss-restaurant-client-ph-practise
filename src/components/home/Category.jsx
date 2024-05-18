import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeading from "./SectionHeading";

const Category = () => {
  const assets = "../../assets/home";
  return (
    <section>
      <SectionHeading
        subHeading="From 11:00am to 10:00pm"
        heading="ORDER ONLINE"
      />
      <Swiper
        autoplay={true}
        loop={true}
        slidesPerView={4}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="*:*:*:w-full mb-16"
      >
        <SwiperSlide>
          <img src={`${assets}/slide1.jpg`} alt="category-image" />
          <h3 className="uppercase -mt-12 text-center text-2xl font-medium">
            Label
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${assets}/slide2.jpg`} alt="category-image" />
          <h3 className="uppercase -mt-12 text-center text-2xl font-medium">
            Label
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${assets}/slide3.jpg`} alt="category-image" />
          <h3 className="uppercase -mt-12 text-center text-2xl font-medium">
            Label
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${assets}/slide4.jpg`} alt="category-image" />
          <h3 className="uppercase -mt-12 text-center text-2xl font-medium">
            Label
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${assets}/slide5.jpg`} alt="category-image" />
          <h3 className="uppercase -mt-12 text-center text-2xl font-medium">
            Label
          </h3>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
