import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiMedicines } from "react-icons/gi";
import { MdSick } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdArrowDropleft } from "react-icons/io";
import PropTypes from "prop-types";
import axios from "axios";

export default function Sidebar({ userName, userStatus, profilePicture }) {
  Sidebar.propTypes = {
    userName: PropTypes.string,
    userStatus: PropTypes.string,
    profilePicture: PropTypes.string,
  };

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const Menus = [
    { title: "Dashboard", path: "/statistik" },
    {
      title: "Data Sakit Polisi",
      path: "/statistik/data-sakit-polisi",
      icon: <MdSick />,
    },
    {
      title: "Data Pengunjung Klinik",
      path: "/statistik/data-pengunjung-klinik",
      icon: <FaPeopleGroup />,
    },
    {
      title: "Data Obat Klinik",
      path: "/statistik/data-obat-klinik",
      icon: <GiMedicines />,
    },
  ];

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await axios.delete("/logout", {
        data: { refreshToken: refreshToken },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      <div className="lg:hidden flex items-center my-6 mx-6">
        <GiHamburgerMenu
          className="text-white text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        className={`lg:block fixed lg:static top-0 left-0 bg-primary-600 h-screen py-5 pt-8 font-poppins z-50 transition-all duration-300 ${
          open ? "w-72" : "hidden lg:w-20"
        }`}
      >
        {/* Title */}
        <IoMdArrowDropleft
          className={`bg-transparent right-5 text-white text-3xl rounded-full absolute top-9 cursor-pointer ${
            !open && "rotate-180 right-8"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className={`inline-flex px-5 ${!open && "hidden"}`}>
          <img
            src="/logo.png"
            className={`w-10 h-10 cursor-pointer block float-left mr-3 duration-500`}
          />
          <h1 className="text-white text-2xl origin-left font-bold duration-500 mt-[0.20rem]">
            ISENA FKTP
          </h1>
        </div>

        <div className="flex gap-3 px-4 items-center mr-7 mt-10 text-white">
          <div className="place-content-center lg:w-12 w-10 lg:hidden block">
            <img src={profilePicture} alt="Profil" className="rounded-full" />
          </div>
          <div className="place-content-center lg:hidden block">
            <h1 className="font-semibold lg:text-base">
              {truncateText(userStatus, 14)}
            </h1>
            <p className="text-xs lg:hidden block">
              {truncateText(userName, 25)}
            </p>
            <p className="text-xs lg:block hidden">{userName}</p>
          </div>
        </div>

        {/* Sub Menu */}
        <ul className="pt-5">
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
                {menu.icon ? menu.icon : <GoHomeFill />}
              </span>
              <span
                className={`text-lg font-medium flex-1 ${!open && "hidden"}`}
              >
                {menu.title}
              </span>
            </li>
          ))}
          {/* Logout Button */}
          <li
            className={`text-white flex items-center gap-x-4 cursor-pointer p-3 mt-9 hover:bg-primary-300 hover:text-primary-600 px-5`}
            onClick={handleLogout}
          >
            <span className="text-2xl block float-left">
              <GoHomeFill />
            </span>
            <span className={`text-lg font-medium flex-1 ${!open && "hidden"}`}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
