import PropTypes from "prop-types";

const SectionHeading = ({ heading, subHeading, headningCSS }) => {
  return (
    <div className="text-center mb-16 font-inter">
      <h3 className="text-[#D99904] text-xl italic">---{subHeading}---</h3>
      <h1
        className={`text-[40px] w-fit mx-auto border-y-2 py-2 mt-6 uppercase ${
          headningCSS ? "" : "text-dark-001"
        }`}
      >
        {heading}
      </h1>
    </div>
  );
};

SectionHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  headningCSS: PropTypes.string,
};

export default SectionHeading;
