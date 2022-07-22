import SignInModal from "components/shared/modals/SignInModal";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILoginInput {
  emailAddress: string;
  firstname: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginInput>();
  const router = useRouter();
  const { status } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (router.isReady && status === "authenticated") {
      router.push("/#home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onGoogleLogin = async () => {
    setIsSigningIn(true);
    await signIn("google", { callbackUrl: "/#home" });
  };

  const onFacebookLogin = async () => {
    setIsSigningIn(true);
    await signIn("facebook", { callbackUrl: "/#home" });
  };

  const onSubmit: SubmitHandler<ILoginInput> = (data: ILoginInput) => {
    console.log(data.firstname, data.emailAddress);
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login Page" />
      </Head>
      {status === "unauthenticated" && (
        <main id="login-page" className="text-white">
          <div className="w-screen h-screen flex items-center justify-center p-6 ">
            {isSigningIn && <SignInModal />}
            <div
              id="login-form"
              className="h-[480px] w-[480px] flex flex-col bg-zinc-800 rounded-xl p-8 shadow-lg"
            >
              <div
                id="login-header"
                className="self-center text-center space-y-1"
              >
                <h2 className="text-2xl text-green-400">
                  Let&apos;s get to know you!
                </h2>
                <h3 className="text-sm text-gray-300">
                  Sign in and Let&apos;s talk.
                </h3>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mt-6"
              >
                <label className="my-1">Email Address</label>
                <input
                  {...register("emailAddress")}
                  className="mb-1 px-2 py-2 bg-zinc-900 rounded-lg"
                />
                <label className="my-1">Username</label>
                <input
                  {...register("firstname")}
                  className="mb-1 px-2 py-2 bg-zinc-900 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-4/5 self-center bg-green-400 my-8 mb-4 px-3 py-2 rounded-lg text-gray-600 hover:bg-green-600 hover:text-gray-200 focus:bg-green-800 focus:text-gray-100"
                >
                  Login as a Guest
                </button>
              </form>
              <div
                id="provider-sign-in"
                className="flex flex-col justify-center items-center"
              >
                <p>Or sign in via:</p>
                <div id="providers-image" className="flex my-2 space-x-4">
                  <div
                    onClick={onGoogleLogin}
                    className="w-50 h-50 hover:cursor-pointer hover:scale-110"
                  >
                    <Image
                      src="https://i.ibb.co/sKLGZp9/google-logo.png"
                      alt="google-logo"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div
                    onClick={onFacebookLogin}
                    className="w-50 h-50 hover:cursor-pointer hover:scale-110"
                  >
                    <Image
                      src="https://i.ibb.co/Sy9txnp/facebook-logo.png"
                      alt="facebook-logo"
                      width="50"
                      height="50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Login;
