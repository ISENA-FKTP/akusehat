import PieChart from "./diagram/PieChart";
import Sidebar from "../../components/statistik/sidebar";

export default function Statistik() {
  return (
    <>
      <div className="flex bg-[#E0F1EE] font-primary">
        <Sidebar />
        <div className="p-7">
          <div className="shadow-lg py-2 rounded-lg bg-white">
            <div className="flex place-content-between px-5">
              <div className="font-semibold">
                <h1 className="text-secondary-400">Jenis Data</h1>
                <h1>Jenis Penyakit</h1>
              </div>
              <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                2013
              </p>
            </div>
            <div className="h-72 w-[30rem] mt-2 ">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
