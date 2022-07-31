import { signOut } from "next-auth/react";
import React, { useState } from "react";
import create from "zustand";
import SignOutModal from "../modals/SignOutModal";
import ThemeChanger from "../ThemeChanger";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
  isShowThemeToggle?: boolean;
};

interface ThemeState {
  dark: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  dark: true,
  toggleTheme: () => set((state) => ({ dark: !state.dark })),
}));

const Layout = ({ children, isShowThemeToggle }: Props) => {
  const showThemeToggle = isShowThemeToggle || false;
  const isDark = useThemeStore((state) => state.dark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [isSigningOut, setSigningOut] = useState(false);

  const onSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/" });
    setSigningOut(false);
  };

  return (
    <main
      data-theme={`${isDark ? "business" : "light"}`}
      className="relative max-h-full min-h-screen w-screen flex flex-col overflow-y-auto"
    >
      <NavBar onSignOut={onSignOut} />
      {showThemeToggle && <ThemeChanger onChange={toggleTheme} />}
      <div id="layout-content">
        {isSigningOut && <SignOutModal />}
        {children}
      </div>
    </main>
  );
};

export default Layout;
export { useThemeStore };
