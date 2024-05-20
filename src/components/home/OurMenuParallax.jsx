import SectionHeading from "./SectionHeading";

const OurMenuParallax = () => {
  return (
    <div className="py-28 px-[300px] mb-28 bg-[linear-gradient(0deg,rgba(21,21,21,0.70)0%,rgba(21,21,21,0.70)100%),url('../../assets/home/featured.jpg')] bg-no-repeat bg-cover bg-center font-inter bg-fixed">
      <SectionHeading
        heading="FROM OUR MENU"
        subHeading="---Check it out---"
        headningCSS="text-white"
      />
      <div className="flex justify-center items-center gap-16">
        <img
          src="../../assets/home/featured.jpg"
          alt="featured-image"
          className="w-[648px] h-[400px]"
        />
        <div className="text-white">
          <h2 className="text-2xl">March 20, 2023</h2>
          <h1 className="text-2xl my-2">WHERE CAN I GET SOME?</h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn mt-4 bg-transparent text-white border-0 border-b-2 hover:text-dark-001">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurMenuParallax;
