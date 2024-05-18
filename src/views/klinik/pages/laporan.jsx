import Sidebar from "../../../components/klinik/sidebar_klinik";

export default function Laporan() {
  return (
    <>
      {" "}
      <div className="flex">
        <Sidebar />
        <div className="p-7">
          <h1 className="text-2xl font-semibold">Laporan</h1>
        </div>
      </div>
    </>
  );
}
