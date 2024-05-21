import PropTypes from "prop-types";

const Tab = ({ index, label }) => {
  const { tabIndex, setTabIndex } = index || {};

  return (
    <button
      role="tab"
      className={`tab text-2xl uppercase px-0 hover:text-gold-506 ${
        tabIndex === label
          ? "text-gold-506 border-b-2 border-b-gold-506 font-bold"
          : "text-dark-001 font-medium"
      }`}
      onClick={() => setTabIndex(label)}
    >
      {label}
    </button>
  );
};

Tab.propTypes = {
  index: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Tab;