import { Link } from "react-router-dom";
import bannerImg from "/banner.webp";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <p className="font-bold text-5xl md:pl-2">
            RunMe
            <span className="text-[#91CECE]">Quick</span>
          </p>
          <p className="p-5 text-lg">
            Implement your logic, then see the magic. 🖥️✨
          </p>
          <Link to={"/login"}>
            <button className="btn bg-[#4463B9] text-white font-bold">
              Lets Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
