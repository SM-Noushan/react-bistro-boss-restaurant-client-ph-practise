import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import OurMenu from "../../components/home/OurMenu";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="mx-auto container xl:max-w-[1320px] font-inter mb-20">
        <Category />
        <OurMenu />
      </div>
    </>
  );
};

export default Home;
