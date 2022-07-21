import LandingPage from "components/app/home/LandingPage";
import ChatApp from "components/shared/ChatApp";
import LoginModal from "components/shared/modals/LoginModal";
import { isAuthorized } from "lib/utils/auth";
import { getFirstName } from "lib/utils/stringUtils";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "world!" }]);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status);
  }, [session, status]);

  return (
    <>
      <Head>
        <title>Jod</title>
        <meta name="description" content="Jod's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPage />
        <section id="home" className="relative">
          <>
            {status !== "loading" && !isAuthorized(session) && <LoginModal />}
            <div className="relative w-screen h-screen p-6 pl-48">
              <div className="grid grid-cols-5 h-full">
                <div className="col-span-2 flex flex-col justify-center space-y-1">
                  <h1 className="text-4xl">
                    Ask me about anything
                    {isAuthorized(session) && (
                      <span className="text-5xl text-green-300">
                        {" " + getFirstName(session?.user?.name as string)}
                      </span>
                    )}
                    !
                  </h1>
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
                  <ChatApp />
                </div>
              </div>
            </div>
            {/* {!isUnauthorized(session) && (
              <div className="absolute top-2 right-2 w-[28px] h-[28px] rounded-full bg-white mx-2">
                <Image
                  src={`${session && (session?.user?.image as string)}`}
                  alt="user-profile-picture"
                  className="rounded-full"
                  width="28"
                  height="28"
                />
              </div>
            )} */}
            {isAuthorized(session) && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="absolute bottom-2 right-2 p-2 text-red-500 text-sm"
              >
                Sign out
              </button>
            )}
          </>
        </section>
      </main>
    </>
  );
};

export default Home;
