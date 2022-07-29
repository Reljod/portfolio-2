import LandingPage from "components/app/home/LandingPage";
import ChatApp from "components/shared/ChatApp";
import LoadingScreen from "components/shared/layouts/LoadingScreen";
import LoginModal from "components/shared/modals/LoginModal";
import SignOutModal from "components/shared/modals/SignOutModal";
import UserModal from "components/shared/modals/UserModal";
import { isAuthorized } from "lib/utils/auth";
import { getFirstName } from "lib/utils/stringUtils";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: adminAccounts, isLoading: isAccountFetchLoading } =
    trpc.useQuery(["fetchAccounts.fetchAdminAccounts"], {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const [isLoading, setLoading] = useState(true);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
    setIsSigningOut(false);
  };

  const onLoadEffect = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  };

  useEffect(onLoadEffect, []);

  useEffect(() => {
    console.log(router.asPath);
    if (
      router.isReady &&
      router.asPath === "/#home" &&
      status === "authenticated" &&
      adminAccounts
    ) {
      const userId = session.user?.id;
      for (let account of adminAccounts) {
        if (account.id === userId) {
          router.replace("/admin");
          return;
        }
      }
    }
  }, [router, status, adminAccounts, session]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Jod</title>
        <meta name="description" content="Jod's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPage />
        {status !== "loading" && (
          <section id="home" className="relative">
            <>
              {!isAuthorized(session) && <LoginModal />}
              {isSigningOut && <SignOutModal />}
              <div className="relative w-screen h-screen py-6 px-6 md:pl-48 md:pr-24">
                <div className="h-full flex flex-col md:grid md:grid-cols-5">
                  <div className="flex flex-col justify-center space-y-1 md:w-full md:col-span-2">
                    <h1 className="text-sm md:text-4xl pr-6">
                      Ask me about anything
                      {isAuthorized(session) && (
                        <span className="text-lg text-green-300 md:text-5xl">
                          {" " + getFirstName(session?.user?.name as string)}
                        </span>
                      )}
                      !
                    </h1>
                    <p className="text-xs text-gray-400 italic md:text-lg">
                      Let&apos;s talk about how we can create solutions in your
                      business.
                    </p>
                  </div>
                  <div
                    id="chatting-app"
                    className="col-span-3 flex flex-col items-center h-full py-5 text-white md:p-5"
                  >
                    <h2 className="hidden text-center my-2 lg:block">
                      Let&apos;s chat!
                    </h2>
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
                    className="hidden absolute bottom-2 right-2 p-2 text-red-500 text-sm md:block"
                  >
                    Sign out
                  </button>
                </>
              )}
            </>
          </section>
        )}
      </main>
    </>
  );
};

export default Home;
