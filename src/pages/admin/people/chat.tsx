import ChatApp from "components/shared/ChatApp";
import AdminLayout from "components/shared/layouts/AdminLayout";
import { getFirstName } from "lib/utils/stringUtils";
import Image from "next/image";

import { trpc } from "utils/trpc";

const Chat = () => {
  const { data, isSuccess } = trpc.useQuery(
    ["fetchAccounts.fetchUserAccounts"],
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <AdminLayout>
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
        <div className="w-full h-4/5 sm:w-[300px] md:w-[400px] md:h-[600px] md:max-h-[600px] mt-14 ml-10 ">
          {isSuccess && <ChatApp receiverId={data[0]?.id} />}
        </div>
      </section>
    </AdminLayout>
  );
};

export default Chat;
