import PieChart from "./diagram/PieChart";
import Sidebar from "../../components/statistik/sidebar";
import BarChart from "./diagram/BarChart";

export default function Statistik() {
  return (
    <>
      <div className="flex gap-5 bg-[#E0F1EE] font-primary">
        <Sidebar />
        <div className="py-7 pl-7">
          <div className="shadow-lg py-2 rounded-lg bg-white">
            <div className="flex place-content-between px-5">
              <div className="font-semibold">
                <h1 className="text-secondary-400">Jenis Data</h1>
                <h1>Jenis Penyakit</h1>
              </div>
              <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                2024
              </p>
            </div>
            <div className="h-72 w-[30rem] mt-2 ">
              <PieChart />
            </div>
          </div>
        </div>
        <div className="py-7">
          <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
            <div className="flex place-content-between px-5">
              <div className="font-semibold">
                <h1 className="text-secondary-400">Jenis Data</h1>
                <h1>Jumlah Sakit Kesatuan Polisi</h1>
              </div>
              <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                2024
              </p>
            </div>
            <div className="h-72 w-[40rem] mt-2 ">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
