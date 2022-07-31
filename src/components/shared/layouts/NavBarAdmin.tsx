import Image from "next/image";
import Link from "next/link";
import {
  MdAdminPanelSettings,
  MdChevronRight,
  MdExpandMore,
} from "react-icons/md";
import { trpc } from "utils/trpc";

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => {
  const { data: adminAccounts, isLoading: isAccountFetchLoading } =
    trpc.useQuery(["fetchAccounts.fetchAdminAccounts"], {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Dashboard</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                People
                <MdChevronRight className="w-5 h-5" />
              </a>
              <ul className="p-2">
                <ChatsLink />
                <BlocklistsLink />
              </ul>
            </li>
            <li>
              <a>Feature Flags</a>
            </li>
          </ul>
        </div>
        <Link href="/admin" className="btn btn-ghost normal-case text-xl">
          <span className="flex items-center justify-between">
            <MdAdminPanelSettings className="w-8 h-8" /> Admin
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Dashboard</a>
          </li>
          <li tabIndex={0}>
            <a className="justify-between">
              People
              <MdExpandMore className="w-5 h-5" />
            </a>
            <ul className="p-2">
              <ChatsLink />
              <BlocklistsLink />
            </ul>
          </li>
          <li>
            <a>Feature Flag</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="w-10 h-10 rounded-full mx-2">
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
        </div>
      </div>
    </div>
  );
};

const ChatsLink = () => <Link href="/admin/people/chat">Chat</Link>;
const BlocklistsLink = () => (
  <Link href="/admin/people/blocklists">Blocklists</Link>
);

export default NavBar;
