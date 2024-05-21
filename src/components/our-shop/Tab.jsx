import PropTypes from "prop-types";

const Tab = ({ index: tabIndex, label, handleTab }) => {
  return (
    <button
      role="tab"
      className={`tab text-2xl uppercase px-0 hover:text-gold-506 ${
        tabIndex === label
          ? "text-gold-506 border-b-2 border-b-gold-506 font-bold"
          : "text-dark-001 font-medium"
      }`}
      onClick={() => handleTab(label)}
    >
      {label === "offer" ? "Today's Pick" : label}
    </button>
  );
};

Tab.propTypes = {
  index: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleTab: PropTypes.func.isRequired,
};

export default Tab;
