import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative mx-auto min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat object-cover flex items-center`}
    >
      <img
        src="https://idme-marketplace.s3.amazonaws.com/6BwZhX1eszfR8SLWn1mbyUwo"
        alt="hero"
        className="absolute w-full h-full mx-auto -z-50 brightness-50"
      />
      <div className={`${styles.section} w-[90%] md:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] md:text[60px] text-white font-[600] capitalize`}
        >
          Best Multi-Vendor Website <br />
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
