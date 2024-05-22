import SectionHeading from "./SectionHeading";
import MenuItem from "../menu-item/MenuItem";
import useFetchData from "../../hooks/useFetchData";

const OurMenu = () => {
  const { data, isLoading } = useFetchData(
    "popularMenu",
    "menu?category=popular"
  );
  return (
    <>
      <SectionHeading subHeading="Check it out" heading="FROM OUR MENU" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isLoading
          ? "Loading"
          : data.length > 0
          ? data.map((item) => <MenuItem key={item._id} item={item} />)
          : "No Data"}
      </div>
    </>
  );
};

export default OurMenu;
