import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import SendMessageIcon from "components/shared/icons/send-message.svg";
import { isAuthorized } from "lib/utils/auth";
import { trpc } from "utils/trpc";

const RECEIVER = "cl5tkhg260012xupvwot63ozj";

type FetchMsgType = {
  sender: string;
  receiver: string;
  message: string;
}[];

const isMessageOwner = (session: any, sender: string) => {
  return session && isAuthorized(session) && session?.user?.id === sender;
};

const ChatApp = () => {
  const [chatInputText, setChatInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<FetchMsgType>([]);
  const { data: session, status } = useSession();
  const utils = trpc.useContext();

  const fetchMessagesQuery = trpc.useQuery([
    "fetchMessage.fetchMessages",
    {
      sender: session?.user?.id as string,
      receiver: session?.user?.id as string,
    },
  ]);

  const sendMessageMutation = trpc.useMutation(["sendMessage.sendMessage"]);

  useEffect(() => {
    console.log("Is fetching", fetchMessagesQuery.isFetching);
  }, [fetchMessagesQuery.isFetching]);

  const onChatEnter = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (status === "authenticated" && chatInputText.length > 0) {
      const message = {
        sender: session?.user?.id as string,
        receiver: RECEIVER,
        message: chatInputText,
      };
      setChatMessages([message, ...chatMessages]);
      sendMessageMutation.mutate(
        {
          message: chatInputText,
          sender: session?.user?.id as string,
          receiver: RECEIVER,
        },
        {
          onSuccess: () => {
            utils.invalidateQueries([
              "fetchMessage.fetchMessages",
              { sender: session?.user?.id as string, receiver: RECEIVER },
            ]);
          },
        }
      );

      setChatInputText("");
    }
  };

  useEffect(() => {
    if (fetchMessagesQuery.isSuccess) {
      const fetchedChatMessages = fetchMessagesQuery.data.map(
        ({ message, sender, receiver }) => {
          return {
            sender,
            receiver,
            message,
          };
        }
      );
      setChatMessages(fetchedChatMessages);
    }
  }, [fetchMessagesQuery.isSuccess, fetchMessagesQuery.data]);

  const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInputText(e.target.value);
  };

  return (
    <div className="relative h-[636px] w-[400px] rounded-3xl bg-zinc-800">
      <div className="h-full w-full bg-transparent py-12">
        <div className="h-full w-full overflow-y-auto flex flex-col-reverse items-end p-2">
          {status === "authenticated" &&
            fetchMessagesQuery.isSuccess &&
            chatMessages.length > 0 &&
            chatMessages.map((chatMsgObj, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col items-start ${
                    isMessageOwner(session, chatMsgObj.sender)
                      ? "justify-end"
                      : "justify-start"
                  } max-w-[300px] px-4 py-1 ${
                    isMessageOwner(session, chatMsgObj.sender)
                      ? "bg-blue-600"
                      : "bg-zinc-700"
                  } rounded-2xl m-1`}
                >
                  <p className="text-sm text-end over">{chatMsgObj.message}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div
        id="chat-header"
        className="absolute top-0 w-full flex items-center h-12 rounded-t-3xl bg-zinc-900 bg-opacity-50 px-3"
      >
        <div className="w-7 h-7 rounded-full bg-white mx-2">
          <Image
            src="https://i.ibb.co/C8JjRyn/mock-profile-pic-male.jpg"
            alt="mock-profile-pic-male"
            className="rounded-full"
            width="28"
            height="28"
          ></Image>
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <p className="text-sm leading-none">Reljod Oreta</p>
          <p className="text-xs leading-none text-gray-400">Offline</p>
        </div>
      </div>
      <form
        onSubmit={onChatEnter}
        className="absolute bottom-0 w-full flex items-center h-12 rounded-b-3xl bg-zinc-900 bg-opacity-50 px-3 py-2 space-x-2"
      >
        <div className="h-full w-full rounded-2xl bg-zinc-400 p-1 px-2">
          <input
            onChange={onChangeInputText}
            value={chatInputText}
            className="w-full bg-transparent text-gray-800 text-sm "
          />
        </div>
        <button type="submit" className="h-5 w-5">
          <Image src={SendMessageIcon} alt="send-message-icon"></Image>
        </button>
      </form>
    </div>
  );
};

export default ChatApp;