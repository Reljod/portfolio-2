import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { trpc } from "utils/trpc";
import SignOutModal from "../modals/SignOutModal";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

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

  return (
    <main className="relative flex flex-row">
      <NavBar />
      {children}
      {isSigningOut && <SignOutModal />}
      <button
        onClick={onSignOut}
        className="hidden absolute bottom-2 right-2 p-2 text-red-500 text-sm md:block"
      >
        Sign out
      </button>
    </main>
  );
};

export default AdminLayout;
