import { useRouter } from "next/router";

const LoginModal = () => {
  const router = useRouter();

  const onLoginClick = () => {
    if (router.isReady) {
      router.push("/login");
    }
  };

  return (
    <div
      id="login-modal"
      className="absolute w-screen h-screen flex justify-center items-center z-10 bg-gray-800 bg-opacity-70"
    >
      <div
        id="modal"
        className="flex flex-col items-center w-[350px] bg-zinc-800 border border-zinc-700 rounded-xl p-3"
      >
        <p className="text-md text-center">
          I will be happy to know more
          <br /> about you if you login 😊
        </p>
        <button
          type="button"
          onClick={onLoginClick}
          className="w-3/5 bg-green-400 my-5 mb-3 px-3 py-2 rounded-3xl text-gray-600 shadow-md shadow-lime-800 hover:bg-green-600 hover:text-gray-200 focus:bg-green-800 focus:text-gray-100"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
