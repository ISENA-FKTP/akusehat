import PieChartPolisi from "./diagram/PieChart/PieChartPolisi";
import PieChartApotik from "./diagram/PieChart/PieChartApotik";
import Sidebar from "../../components/statistik/sidebar";
import BarChart from "./diagram/BarChart";
import LineChart from "./diagram/LineChart";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { calculateTotals } from "./model/dataObat";

export default function Statistik() {
  const { totalJumlahObat, totalObatKeluar } = calculateTotals();

  const total = totalJumlahObat + totalObatKeluar;
  const persen_obat_masuk = ((totalJumlahObat / total) * 100).toFixed(2);
  const persen_obat_keluar = ((totalObatKeluar / total) * 100).toFixed(2);

  return (
    <>
      <div className="flex gap-5 bg-[#E0F1EE] h-full font-primary">
        <div className="fixed z-50">
          <Sidebar />
        </div>
        <div className="py-7 pl-32">
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
            <div className="h-96 w-[30rem] mt-2 ">
              <PieChartPolisi />
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
            <div className="h-96 w-[40rem] mt-2 ">
              <BarChart />
            </div>
          </div>
        </div>
        <div className="flex-col">
          <div className="pt-7 pb-3">
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
              <div className="h-[149px] w-[28rem] mt-2 ">
                <LineChart />
              </div>
            </div>
          </div>
          <div className="pb-7">
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
              <div className="flex">
                <div className="h-[151px] w-44 mt-2 ">
                  <PieChartApotik />
                </div>
                <div className="place-content-center text-lg font-semibold ">
                  <div className="flex gap-4 place-content-center mb-3">
                    <div className="text-success-700 place-content-center">
                      <FaCircleArrowUp />
                    </div>
                    <p>
                      {persen_obat_masuk}% Obat Masuk ({totalJumlahObat})
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-error-600 place-content-center">
                      <FaCircleArrowDown />
                    </div>
                    <p>
                      {persen_obat_keluar}% Obat Keluar ({totalObatKeluar})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
