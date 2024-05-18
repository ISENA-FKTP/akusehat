import Sidebar from "../../../components/klinik/sidebar_klinik";

export default function Dokter() {
  return (
    <>
      {" "}
      <div className="flex">
        <Sidebar />
        <div className="p-7">
          <h1 className="text-2xl font-semibold">Dokter</h1>
        </div>
      </div>
    </>
  );
}
