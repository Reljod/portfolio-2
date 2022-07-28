import { useRouter } from "next/router";
import React, { FC, useState } from "react";

type Props = {};

enum NavBarMinEnum {
  MINIMIZE = "<<",
  MAXIMIZE = ">>",
}

type NavBarMinimizeBtnProps = {
  value: NavBarMinEnum;
  onClick: () => void;
};

const NavBarMinimizeBtn = ({ value, onClick }: NavBarMinimizeBtnProps) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-2 right-[-16px] p-1 px-2 rounded-full bg-zinc-900 aspect-squar hover:cursor-pointer hover:brightness-125"
    >
      {value}
    </div>
  );
};

const NavBarItems: FC<{ children: React.ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="px-2 py-2 text-sm font-semibold rounded-md hover:bg-zinc-700 hover:cursor-pointer active:bg-zinc-900"
    >
      {children}
    </div>
  );
};

const NavBar = (props: Props) => {
  const router = useRouter();
  const [isMinimized, setIsMinimized] = useState(false);

  // Style functions
  const setNavBarWidth = () => {
    if (isMinimized) {
      return "w-[50px]";
    }
    return "w-[200px]";
  };

  const setNavValue = (maximizedVal: string, minimizedVal: string) => {
    if (isMinimized) {
      return minimizedVal;
    }
    return maximizedVal;
  };

  return (
    <div
      className={`relative h-screen ${setNavBarWidth()} bg-zinc-800 shadow-md shadow-slate-900 p-2`}
    >
      <NavBarMinimizeBtn
        onClick={() => setIsMinimized(!isMinimized)}
        value={isMinimized ? NavBarMinEnum.MAXIMIZE : NavBarMinEnum.MINIMIZE}
      />
      <div className="flex flex-col">
        <h1
          onClick={() => router.push("/admin")}
          className="self-center text-4xl font-bold hover:cursor-pointer"
        >
          {isMinimized ? "A" : "Admin"}
        </h1>
        <section id="tabs" className="my-4 space-y-2">
          <NavBarItems onClick={() => router.push("/admin")}>
            {setNavValue("Dashboard", "D")}
          </NavBarItems>
          <NavBarItems onClick={() => router.push("/admin/people/chat")}>
            <p>{setNavValue("People", "P")}</p>
          </NavBarItems>
        </section>
      </div>
    </div>
  );
};

export default NavBar;
