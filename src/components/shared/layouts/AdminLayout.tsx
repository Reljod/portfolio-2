import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { trpc } from "utils/trpc";
import NavBarAdmin from "./NavBarAdmin";

type Props = {
  children: React.ReactNode;
};

const ChatsLink = () => <Link href="/admin/people/chat">Chats</Link>;
const BlocklistsLink = () => (
  <Link href="/admin/people/blocklists">Blocklists</Link>
);

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: adminAccounts, isLoading: isAccountFetchLoading } =
    trpc.useQuery(["fetchAccounts.fetchAdminAccounts"], {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    console.log(router.asPath);
    if (session && adminAccounts) {
      const userId = session?.user?.id;
      for (let account of adminAccounts) {
        if (account.id === userId) {
          return;
        }
      }
      router.replace("/401");
    }
  }, [router, status, adminAccounts, session]);

  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
    setIsSigningOut(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative flex flex-col">
      <NavBarAdmin>{children}</NavBarAdmin>
      {/* {isSigningOut && <SignOutModal />} */}
      {/* <button
        onClick={onSignOut}
        className="hidden absolute bottom-2 right-2 p-2 text-red-500 text-sm md:block"
      >
        Sign out
      </button> */}
    </main>
  );
};

export default AdminLayout;
