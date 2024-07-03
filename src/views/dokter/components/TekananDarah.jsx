import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import useAxios from "../../../useAxios";

export default function TekananDarah() {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [data, setData] = useState({
    sistole: "",
    distole: "",
    respiratory: "",
    heartrate: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`/tdsDokter/${id}`)
      .then((response) => {
        const fetchedData = response.data;
        setData({
          sistole: fetchedData.sistole || "",
          distole: fetchedData.distole || "",
          respiratory: fetchedData.respiratory || "",
          heartrate: fetchedData.heartrate || "",
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [axiosInstance, id]);

  return (
    <div className="">
      <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
        <h1 className="text-white font-primary-Poppins font-bold text-xl">
          Tekanan Darah
        </h1>
      </div>
      <div className="border border-primary-600 shadow-lg rounded-b-lg">
        <form className="space-y-3 py-4 ml-10 pr-10">
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Sistole :
            </label>
            <input
              type="text"
              name="sistol"
              value={data.sistole}
              placeholder="   mmhg"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Distole :
            </label>
            <input
              type="text"
              name="distol"
              value={data.distole}
              placeholder="   mmhg"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Respiratory :
            </label>
            <input
              type="text"
              name="respiratory"
              value={data.respiratory}
              placeholder="   /Menit"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Heart Rate :
            </label>
            <input
              type="text"
              name="heart_rate"
              value={data.heartrate}
              placeholder="   Bpm"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
}
