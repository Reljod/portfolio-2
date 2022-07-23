import LandingPage from "components/app/home/LandingPage";
import ChatApp from "components/shared/ChatApp";
import LoginModal from "components/shared/modals/LoginModal";
import SignOutModal from "components/shared/modals/SignOutModal";
import UserModal from "components/shared/modals/UserModal";
import { isAuthorized } from "lib/utils/auth";
import { getFirstName } from "lib/utils/stringUtils";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const providers = trpc.useQuery(["auth.getProviders"]);

  const [isShowProfile, setIsShowProfile] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    console.log("session:", session);
  }, [session]);

  const onSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
    setIsSigningOut(false);
  };

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
            {isSigningOut && <SignOutModal />}
            <div className="relative w-screen h-screen py-6 pl-48 pr-24">
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
            {session && isAuthorized(session) && (
              <>
                <div
                  onClick={() => setIsShowProfile(true)}
                  className="absolute top-2 right-2 w-10 h-10 rounded-full shadow-xs shadow-black hover:brightness-105 hover:cursor-pointer"
                >
                  <Image
                    src={session?.user?.image as string}
                    alt="profile-pic"
                    height="40px"
                    width="40px"
                    className="rounded-full"
                  />
                </div>
                {isShowProfile && (
                  <UserModal onClick={() => setIsShowProfile(false)} />
                )}
                <button
                  onClick={onSignOut}
                  className="absolute bottom-2 right-2 p-2 text-red-500 text-sm"
                >
                  Sign out
                </button>
              </>
            )}
          </>
        </section>
      </main>
    </>
  );
};

export default Home;
