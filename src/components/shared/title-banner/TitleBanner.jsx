import { Parallax } from "react-parallax";
import PropTypes from "prop-types";

const TitleBanner = ({ imgURL, type = false, heading, desc }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={imgURL}
      bgImageAlt="banner-image"
      strength={-200}
    >
      <div className="hero font-cinzel relative bg-no-repeat bg-contain bg-center">
        <div className={`hero-overlay bg-opacity-50 inset-0 absolute`}></div>
        <div className="hero-content text-center text-neutral-content my-[110px]">
          <div
            className={`${
              type ? "px-40 py-20" : "px-80 mt-[110px] py-[145px]"
            } bg-[#15151599]`}
          >
            <h1 className="mb-5 text-[88px] font-bold uppercase">{heading}</h1>
            <h6 className="mb-5 text-2xl font-semibold">{desc}</h6>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

TitleBanner.propTypes = {
  imgURL: PropTypes.string.isRequired,
  typ: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default TitleBanner;
