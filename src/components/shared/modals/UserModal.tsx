import { isAuthorized } from "lib/utils/auth";
import { useSession } from "next-auth/react";

const UserModal = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && isAuthorized(session) && (
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
      )}
    </>
  );
};

export default UserModal;
