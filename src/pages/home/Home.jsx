import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="mx-auto container xl:max-w-[1320px]">
        <Category />
      </div>
    </>
  );
};

export default Home;
