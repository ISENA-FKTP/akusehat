import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard" },
    { title: "Pages" },
    { title: "Media", spacing: true },
    {
      title: "Project",
      subMenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
      ],
    },
    { title: "Analytics" },
    { title: "Inbox" },
    { title: "Profile", spacing: true },
    { title: "Settings" },
    { title: "Logout" },
  ];

  return (
    <>
      <div
        className={`bg-purple-950 h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-purple-950 text-3xl rounded-full absolute top-9 -right-3 border border-purple-950 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-medium duration-300 ${
              !open && "scale-0"
            }`}
          >
            Tailwind
          </h1>
        </div>

        <div
          className={`flex items-center rounded-md bg-zinc-600 mt-6 px-4 py-2 ${
            !open ? "px-2.5" : "px-2.5"
          }`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            }`}
          />
          <input
            type="{search}"
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-500 rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                } mt-2`}
              >
                <span className="text-2xl block float-left">
                  <RiDashboardFill />
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.subMenu && (
                  <BsChevronDown
                    className="float-right text-2xl cursor-pointer"
                    onClick={() => {}}
                  />
                )}
              </li>

              {menu.subMenu && (
                <ul>
                  {menu.submenuItems.map((submenuOpen, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-500 rounded-md"
                    >
                      {submeuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
