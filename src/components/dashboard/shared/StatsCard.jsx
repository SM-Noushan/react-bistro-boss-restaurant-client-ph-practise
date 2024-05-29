import PropTypes from "prop-types";

const StatsCard = ({ svg, css, count, label }) => {
  return (
    <div
      className={`bg-gradient-to-r ${css} flex items-center justify-center gap-6 px-14 py-8 w-full font-inter text-white rounded-md`}
    >
      {svg}
      <div>
        <h1 className="text-[48px] font-extrabold">{count}</h1>
        <h1 className="text-2xl">{label}</h1>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  svg: PropTypes.object.isRequired,
  css: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default StatsCard;
