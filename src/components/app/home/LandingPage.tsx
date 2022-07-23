import Image from "next/image";
import { useRouter } from "next/router";

import DownArrowSimple from "components/shared/icons/down-arrow-simple.svg";

const LandingPage = () => {
  const router = useRouter();

  const onLandingPageButtonClick = () => {
    if (router.isReady) {
      console.log(router.asPath);
      router.push("/#home");
    }
  };

  return (
    <section
      id="landing-page"
      className="relative w-screen h-screen p-2 md:p-6"
    >
      <div className="flex flex-col h-full justify-center space-y-3 px-6 md:pl-48">
        <p id="introduction" className="text-3xl">
          Nice to meet you!
          <br />
          I&apos;m{" "}
          <span className="text-4xl font-bold hover:cursor-pointer hover:text-green-400">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/reljodoreta/"
              rel="noreferrer"
            >
              Jod
            </a>
          </span>{" "}
          and I love building software!
        </p>
        <p id="purpose" className="text-lg text-gray-300">
          I would love to talk with you about solving problems with software.
        </p>
        <button
          className="w-fit bg-green-400 px-3 py-2 rounded-2xl text-gray-600 shadow-md shadow-lime-800 hover:bg-green-600 hover:text-gray-200 focus:bg-green-800 focus:text-gray-100"
          onClick={onLandingPageButtonClick}
        >
          Let&apos;s talk!
        </button>
      </div>
      <div
        className="absolute bottom-0 left-1/2 h-5 w-5 m-5 animate-bounce hover:cursor-pointer"
        onClick={onLandingPageButtonClick}
      >
        <Image src={DownArrowSimple} alt="down-arrow-simple" />
      </div>
    </section>
  );
};

export default LandingPage;
