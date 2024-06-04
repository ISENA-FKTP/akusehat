export const DataSakit = {
  getData() {
    return [
      {
        No: 1,
        NRP: 80010816,
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni",
        LamaCuti: "Cuti",
        WFH: "Tidak",
        Keterangan: "Proses PDH",
      },
      {
        No: 2,
        NRP: 80010816,
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni",
        LamaCuti: "Cuti",
        WFH: "Tidak",
        Keterangan: "Proses PDH",
      },
      {
        No: 3,
        NRP: 80010816,
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni",
        LamaCuti: "Cuti",
        WFH: "Tidak",
        Keterangan: "Proses PDH",
      },
      {
        No: 4,
        NRP: 80010816,
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni",
        LamaCuti: "Cuti",
        WFH: "Tidak",
        Keterangan: "Proses PDH",
      },
      {
        No: 5,
        NRP: 80010816,
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni",
        LamaCuti: "Cuti",
        WFH: "Tidak",
        Keterangan: "Proses PDH",
      },
      {
        No: 6,
        NRP: 80010816,
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni",
        LamaCuti: "Cuti",
        WFH: "Tidak",
        Keterangan: "Proses PDH",
      },
      // Add more data objects here
    ];
  },

  getDataSakit(){
    return Promise.resolve(this.getData);
  }
};

export const headData = [
  "No", 
  "NRP",
  "Nama",
  "Pangkat",
  "Satuan Kerja",
  "Jenis Sakit",
  "Jenis Perawatan",
  "Sumber Biaya",
  "Awal Sakit",
  "Lama Cuti",
  "WFH",
  "Keterangan",
  ""
]; 

export const kolom = [
  {
    field: "No",
    header: "No",
  },
  {
    field: "NRP",
    header: "NRP",
  },
  {
    field: "Nama",
    header: "Nama",
  },
  {
    field: "Pangkat",
    header: "Pangkat",
  },
  {
    field: "SatuanKerja",
    header: "Satuan Kerja",
  },
  {
    field: "JenisSakit",
    header: "Jenis Sakit",
  },
  {
    field: "JenisPerawatan",
    header: "Jenis Perawatan",
  },
  {
    field: "SumberBiaya",
    header: "Sumber Biaya",
  },
  {
    field: "AwalSakit",
    header: "Awal Sakit",
  },
  {
    field: "WFH",
    header: "WFH",
  },
  {
    field: "Keterangan",
    header: "Keterangan",
  },
  // Add more columns here
];
