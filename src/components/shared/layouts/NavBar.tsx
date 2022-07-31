import Image from "next/image";
import Link from "next/link";
import { MdOutlinePublic } from "react-icons/md";
import { trpc } from "utils/trpc";
import NavBarIcon from "./NavBarIcon";

type Props = {
  onSignOut: () => void;
};

const NavBarUser = ({ onSignOut }: Props) => {
  const { data: adminAccounts, isLoading: isAccountFetchLoading } =
    trpc.useQuery(["fetchAccounts.fetchAdminAccounts"], {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <NavBarIcon />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/about">About me</Link>
              </li>
              <li>
                <Link href="/chat">Message me</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost">
            <span className="flex items-center justify-between lg:ml-2 normal-case text-lg hover:cursor-pointer lg:text-2xl">
              <MdOutlinePublic className="w-5 h-5 mr-1 hover:cursor-pointer lg:w-6 lg:h-6" />
              Reljod
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/about">About me</Link>
            </li>
            <li>
              <Link href="/chat">Message me</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end dropdown-end">
          <label
            tabIndex={0}
            className="w-8 h-8 rounded-full mx-2 hover:cursor-pointer hover:ring hover:ring-primary focus:ring focus:ring-primary peer"
          >
            <Image
              src={
                (adminAccounts && adminAccounts[0]?.image) ||
                "https://i.ibb.co/C8JjRyn/mock-profile-pic-male.jpg"
              }
              alt="mock-profile-pic-male"
              className="rounded-full"
              width="40"
              height="40"
            ></Image>
          </label>

          <ul
            tabIndex={0}
            className="invisible absolute menu menu-compact dropdown-content top-10 right-0 mt-3 p-2 shadow bg-base-100 z-10  rounded-box w-52 peer-focus:visible hover:visible"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => onSignOut()} className="text-error">
                Logout
              </a>
            </li>
          </ul>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

const ChatsLink = () => (
  <Link href="/admin/people/chat" className="m-1">
    Chat
  </Link>
);
const BlocklistsLink = () => (
  <Link href="/admin/people/blocklists" className="m-1">
    Blocklists
  </Link>
);

export default NavBarUser;
