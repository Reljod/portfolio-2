import ChatApp from "components/shared/ChatApp";
import NavBar from "components/shared/layouts/NavBar";
import { getFirstName } from "lib/utils/stringUtils";
import Image from "next/image";

import { trpc } from "utils/trpc";

type Props = {};

const chat = (props: Props) => {
  const { isLoading, data, isSuccess } = trpc.useQuery([
    "fetchAccounts.fetchUserAccounts",
  ]);

  return (
    <div className="flex flex-row">
      <NavBar />
      <section id="chat-interface" className="flex p-3">
        <div
          id="chat-contacts"
          className="flex flex-col w-[200px] max-h-[600px] ml-10 mt-28 py-4 overflow-y-auto overflow-x-hidden"
        >
          {isSuccess &&
            (data || []).map((user, i) => (
              <div
                key={i}
                className="relative flex h-[35px] min-h-[35px] w-full bg-zinc-800 m-3 rounded-lg"
              >
                <div
                  id={`chat-contact-profile-pic-${i}`}
                  className="absolute left-0 top-[-8px] h-[50px] w-[50px] rounded-full bg-white"
                >
                  <Image
                    src={user.image as string}
                    alt="profile"
                    width="50"
                    height="50"
                    className="rounded-full"
                  />
                </div>
                <p className="pl-[60px] flex items-center whitespace-nowrap overflow-x-auto no-scrollbar">
                  {getFirstName(user.name || "")}
                </p>
              </div>
            ))}
        </div>
        <div className="mt-14 ml-10">
          {isSuccess && <ChatApp senderId={data[0]?.id} />}
        </div>
      </section>
    </div>
  );
};

export default chat;
