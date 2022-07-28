import ReactLogoAnimation from "images/react-logo-animation-speed.gif";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Image src={ReactLogoAnimation} alt="react-logo-animation" />
    </div>
  );
};

export default LoadingScreen;
