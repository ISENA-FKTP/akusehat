import { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
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
      </div>
    </>
  );
}
