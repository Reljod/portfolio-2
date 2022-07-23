import { isAuthorized } from "lib/utils/auth";
import { useSession } from "next-auth/react";

type Props = {
  onClick: () => void;
};

const UserModal = ({ onClick }: Props) => {
  const { data: session } = useSession();

  return (
    <>
      {session && isAuthorized(session) && (
        <>
          <div
            onClick={onClick}
            className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-10 flex justify-center items-center z-10"
          ></div>
          <div className="absolute top-14 right-2 z-20">
            <div className="relative flex flex-col bg-zinc-800 px-4 py-4">
              <h1 className="font-bold mb-2">{session.user?.name}</h1>
              <div className="flex items-center space-x-2 text-gray-300">
                <label className="text-xs">Email: </label>
                <p className="text-xs font-bold">{session.user?.email}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <label className="text-xs">ID: </label>
                <p className="text-xs font-bold">{session.user?.id}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserModal;
