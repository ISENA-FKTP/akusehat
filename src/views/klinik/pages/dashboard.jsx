import Sidebar_Klinik from "../../components/klinik/sidebar_klinik";

export default function Dashboard() {
  return (
    <>
      {" "}
      <div className="flex">
        <Sidebar_Klinik />
        <div className="p-7">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>
    </>
  );
}
