import ReactLogoAnimation from "images/react-logo-animation-speed.gif";
import Image from "next/image";

type Props = {};

const LoadingModal = (props: Props) => {
  return (
    <div className="absolute top-0 left-0 flex z-10 items-center justify-center w-full h-full">
      <Image
        src={ReactLogoAnimation}
        alt="react-logo-animation"
        width="60px"
        height="60px"
      />
      <p className="text-sky-400">Loading...</p>
    </div>
  );
};

export default LoadingModal;
