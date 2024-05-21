import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import useMenu from "../../hooks/useMenu";
import SectionHeading from "../home/SectionHeading";
import TitleBanner from "../shared/title-banner/TitleBanner";
import { Link } from "react-router-dom";

const MenuType = ({ banner, section, dataType }) => {
  const { url, heading: pageHeading, desc, type } = banner || {};
  const { heading, subHeading } = section || {};
  const { key, category } = dataType || {};
  const { data, isLoading } = useMenu(key, category);
  return (
    <>
      <TitleBanner imgURL={url} heading={pageHeading} desc={desc} type={type} />
      <div className="mx-auto container xl:max-w-[1320px] font-inter my-24">
        {type || <SectionHeading subHeading={subHeading} heading={heading} />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading
            ? "Loading"
            : data.length > 0
            ? data.map((item) => <MenuItem key={item._id} item={item} />)
            : "No Data"}
        </div>
        <div className="text-center mt-12">
          <Link
            to={`/shop?category=${category.split("=")[1]}`}
            className="btn border-b-4 border-b-dark-937 hover:btn-outline uppercase text-xl font-medium text-dark-937"
          >
            ORDER YOUR FAVOURITE FOOD
          </Link>
        </div>
      </div>
    </>
  );
};

MenuType.propTypes = {
  banner: PropTypes.object.isRequired,
  dataType: PropTypes.object.isRequired,
  section: PropTypes.object,
};

export default MenuType;
