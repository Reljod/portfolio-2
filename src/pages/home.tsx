import Layout from "components/shared/layouts/Layout";
import LoginModal from "components/shared/modals/LoginModal";
import { isAuthorized } from "lib/utils/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      {!isAuthorized(session) && <LoginModal />}
      <Layout isShowThemeToggle={true}>
        <section className="lg:flex lg:flex-row mx-1 mr-2">
          <div className="lg:w-1/2 lg:mt-32">
            <div className="hero bg-base-200 lg:bg-transparent">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div>
                  <h1 className="text-5xl font-bold">I&apos;m Reljod Oreta</h1>
                  <p className="py-6">
                    I&apos;m a Full-Stack Developer currently based in Manila.
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 btn btn-primary rounded-lg">
                      Get to know me
                    </button>
                    <button className="flex-1 btn btn-primary rounded-lg">
                      My Tech Stack
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-base-200 items-center lg:bg-transparent">
              <div className="flex flex-row justify-between items-center max-w-7xl min-h-full px-4 md:justify-center">
                <p className="flex-none w-1/2 text-sm">
                  Ask me any questions via chat
                </p>
                <button
                  onClick={() => router.push("/chat")}
                  className="flex-1 btn btn-primary rounded-lg my-2 mx-2 text-sm md:flex-none"
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 h-128 gap-3 text-xs font-semibold lg:h-full lg:text-xl">
            <div
              className="flex justify-center items-center bg-base-200 aspect-square w-full h-full p-2 text-center hover:cursor-pointer hover:ring hover:ring-primary"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1552&q=80')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <p className="bg-base-200 bg-opacity-70">
                I want to build a web application using the best and modern
                frameworks
              </p>
            </div>
            <div className="grid grid-cols-1 grid-rows-2 justify-center items-center bg-base-200 aspect-square h-full w-full text-center gap-2">
              <div
                className="flex justify-center items-center h-full w-full bg-base-200 hover:ring hover:ring-primary hover:cursor-pointer"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <p className="bg-base-200 bg-opacity-70">
                  I want to spin up a backend server.
                </p>
              </div>
              <div
                className="flex justify-center items-center h-full w-full bg-base-200 hover:ring hover:ring-primary hover:cursor-pointer"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1611117775350-ac3950990985?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2971&q=80')",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <p className="bg-base-200 bg-opacity-70">
                  I want to automate my everyday manual tasks with scripts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
