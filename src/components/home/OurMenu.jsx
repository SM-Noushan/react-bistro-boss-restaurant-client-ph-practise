import SectionHeading from "./SectionHeading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MenuItem from "../menu-item/MenuItem";

const OurMenu = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ourMenu"],
    queryFn: async () => {
      try {
        const res = await axios.get("data/menu.json");
        return await res.data.filter(
          (item) => item.category.toLowerCase() === "popular"
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
  // console.log(data);
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
