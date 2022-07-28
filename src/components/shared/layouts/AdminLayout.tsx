import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { trpc } from "utils/trpc";
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

  return (
    <main className="flex flex-row">
      <NavBar />
      {children}
    </main>
  );
};

export default AdminLayout;
