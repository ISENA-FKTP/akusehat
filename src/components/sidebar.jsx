import { useState } from "react";
import(
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
);

import { BsArrowLeftShort, BsFillImageFill } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineFileText } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard" },
    { title: "Data Sakit Polisi", icon: <AiOutlineFileText /> },
    { title: "Data Pengunjung Klinik", icon: <BsFillImageFill /> },
    { title: "Data Obat Klinik", icon: <AiOutlineBarChart /> },
  ];

  return (
    <>
      <div
        className={`bg-primary-600 h-screen py-5 pt-8 font-poppins ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        {/* Title */}
        <BsArrowLeftShort
          className={`bg-transparent right-5 text-white text-3xl rounded-full absolute top-9 border border-purple-950 cursor-pointer ${
            !open && "rotate-180 right-8"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex px-5">
          <img
            src="/logo.png"
            className={`w-10 h-10 cursor-pointer block float-left mr-3 duration-500 ${
              !open && "hidden"
            }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-bold duration-500 mt-[0.20rem] ${
              !open && "hidden"
            }`}
          >
            ISENA FKTP
          </h1>
        </div>

        {/* Sub Menu */}
        <ul className="pt-10">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-white flex items-center gap-x-4 cursor-pointer p-3 hover:bg-primary-300 hover:text-primary-600 px-5 ${
                  menu.spacing ? "mt-9" : "mt-2"
                } mt-2`}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-lg font-medium flex-1 ${!open && "hidden"}`}
                >
                  {menu.title}
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
