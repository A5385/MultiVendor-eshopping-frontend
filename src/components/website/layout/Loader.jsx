import Lottie from "lottie-react";
import animationData from "../../../assets/animations/109999-animation-for-ecommerce-business-landing-page.json";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[300px] h-[300px]">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    </div>
  );
};

export default Loader;
