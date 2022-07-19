import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DownArrowSimple from "../components/shared/icons/down-arrow-simple.svg";
import SendMessageIcon from "../components/shared/icons/send-message.svg";
import ProfilePicMale from "../images/mock-profile-pic-male.jpg";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "world!" }]);
  const router = useRouter();
  const [showHome, setShowHome] = useState(false);
  const [status, setStatus] = useState("Offline");
  const [chatInputText, setChatInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInputText(e.target.value);
  };

  const onChatEnter = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (chatInputText.length > 0) {
      console.log(chatInputText);
      setChatMessages([chatInputText, ...chatMessages]);
      setChatInputText("");
    }
  };

  const onLandingPageButtonClick = () => {
    if (router.isReady) {
      console.log(router.asPath);
      router.push("/#home");
      setShowHome(true);
    }
  };

  return (
    <>
      <Head>
        <title>Jod</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section id="landing-page" className="relative w-screen h-screen p-6">
          <div className="flex flex-col h-full justify-center pl-48 space-y-3">
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
              I would love to talk with you about solving problems with
              software.
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
        <section id="home" className="relative w-screen h-screen p-6 pl-48">
          <div className="grid grid-cols-5 h-full">
            <div className="col-span-2 flex flex-col justify-center space-y-1">
              <h1 className="text-4xl">Ask me about anything!</h1>
              <p className="text-lg text-gray-400 italic">
                Let&apos;s talk about how we can create solutions in your
                business.
              </p>
            </div>
            <div
              id="chatting-app"
              className="col-span-3 flex flex-col items-center h-full p-5 text-white"
            >
              <h2 className="text-center my-2">Let&apos;s chat!</h2>
              <div className="relative h-full w-[400px] rounded-3xl bg-zinc-800">
                <div className="h-full w-full bg-transparent py-12">
                  <div className="h-full w-full overflow-y-auto flex flex-col-reverse items-end p-2">
                    {chatMessages.map((message, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-start justify-end px-4 py-1 bg-blue-600 rounded-2xl m-1"
                        >
                          <p className="text-sm text-end">{message}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  id="chat-header"
                  className="absolute top-0 w-full flex items-center h-12 rounded-t-3xl bg-zinc-900 bg-opacity-50 px-3"
                >
                  <div className="w-7 h-7 rounded-full bg-white mx-2">
                    <Image
                      src={ProfilePicMale}
                      alt="mock-profile-pic-male"
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-center space-y-1">
                    <p className="text-sm leading-none">Reljod Oreta</p>
                    <p className="text-xs leading-none text-gray-400">
                      {status}
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={onChatEnter}
                  className="absolute bottom-0 w-full flex items-center h-12 rounded-b-3xl bg-zinc-900 bg-opacity-50 px-3 py-2 space-x-2"
                >
                  <div className="h-full w-full rounded-2xl bg-zinc-400 p-1 px-2">
                    <input
                      onChange={onChangeInputText}
                      value={chatInputText}
                      className="w-full bg-transparent text-gray-800 text-sm "
                    />
                  </div>
                  <button type="submit" className="h-5 w-5">
                    <Image
                      src={SendMessageIcon}
                      alt="send-message-icon"
                    ></Image>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
