import ChatApp from "components/shared/ChatApp";
import Layout from "components/shared/layouts/Layout";

type Props = {};

const chat = (props: Props) => {
  return (
    <Layout>
      <section className="flex flex-row items-center justify-center h-full w-screen">
        <ChatApp />
      </section>
    </Layout>
  );
};

export default chat;
