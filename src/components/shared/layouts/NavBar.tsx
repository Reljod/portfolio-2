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

const NavBarItems: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-sm font-semibold">{children}</div>;
};

const NavBar = (props: Props) => {
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
      className={`absolute top-0 left-0 h-screen ${setNavBarWidth()} bg-zinc-800 shadow-md shadow-slate-900 p-2`}
    >
      <NavBarMinimizeBtn
        onClick={() => setIsMinimized(!isMinimized)}
        value={isMinimized ? NavBarMinEnum.MAXIMIZE : NavBarMinEnum.MINIMIZE}
      />
      <div className="flex flex-col">
        <h1 className="self-center text-4xl font-bold">
          {isMinimized ? "A" : "Admin"}
        </h1>
        <section id="tabs" className="my-4 space-y-2">
          <NavBarItems>{setNavValue("Dashboard", "D")}</NavBarItems>
          <NavBarItems>
            <p>{setNavValue("People", "P")}</p>
          </NavBarItems>
        </section>
      </div>
    </div>
  );
};

export default NavBar;
