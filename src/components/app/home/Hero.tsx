import { useRouter } from "next/router";

type Props = {};

const bgImg =
  "https://images.unsplash.com/photo-1512850183-6d7990f42385?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

const Hero = (props: Props) => {
  const router = useRouter();

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512850183-6d7990f42385?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80')",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Hi. I&apos;m{" "}
            <span className="text-primary brightness-125">Jod</span>.
          </h1>
          <p className="mb-5">
            Let&apos;s talk about how we can build your Million-Dollar Business
            idea.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="btn btn-primary rounded-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
