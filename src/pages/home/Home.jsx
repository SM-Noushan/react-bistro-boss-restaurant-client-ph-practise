import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import OurMenu from "../../components/home/OurMenu";
import OurMenuParallax from "../../components/home/OurMenuParallax";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="mx-auto container xl:max-w-[1320px] font-inter mb-20">
        <Category />
        <OurMenu />
      </div>
      <OurMenuParallax />
    </>
  );
};

export default Home;
