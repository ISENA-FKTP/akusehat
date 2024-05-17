import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { BsArrowLeftShort, BsFillImageFill } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineFileText } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const Menus = [
    { title: "Dashboard", path: "/" },
    {
      title: "Data Sakit Polisi",
      path: "/data-sakit-polisi",
      icon: <AiOutlineFileText />,
    },
    {
      title: "Data Pengunjung Klinik",
      path: "/data-pengunjung-klinik",
      icon: <BsFillImageFill />,
    },
    {
      title: "Data Obat Klinik",
      path: "/data-obat-klinik",
      icon: <AiOutlineBarChart />,
    },
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
            <li
              key={index}
              className={`text-white flex items-center gap-x-4 cursor-pointer p-3 ${
                location.pathname === menu.path
                  ? "bg-primary-300 text-primary-600"
                  : "hover:bg-primary-300 hover:text-primary-600"
              } px-5 ${menu.spacing ? "mt-9" : "mt-2"}`}
              onClick={() => navigate(menu.path)}
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
          ))}
        </ul>
      </div>
    </>
  );
}
