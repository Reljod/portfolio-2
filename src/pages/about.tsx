const About = () => {
  return (
    <main>
      <section id="about" className="relative w-screen h-screen p-6 pl-48">
        <h1 className="text-6xl">About me</h1>
        <div id="about-me" className="flex flex-col space-y-3 my-8 w-1/2">
          <h1 className="text-4xl">Reljod Oreta</h1>
          <ul className="text-lg text-gray-300">
            <li>
              ✔ I am a Full Stack Developer and an Electronics Engineer living
              and working remotely in Manila.
            </li>
            <li>
              ✔ I can build web applications using bleeding-edge
              frameworks/libraries like{" "}
              <span className="text-red-400">Next.js/React</span>,{" "}
              <span className="text-red-400">Svelte</span>,{" "}
              <span className="text-red-400">Vue</span>, etc.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default About;
