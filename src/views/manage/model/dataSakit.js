export const DataSakit = {
  getData() {
    return [
      {
        No: 1,
        NRP: "80010816",
        Nama: "Haji",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES POLDA NTB",
        JenisSakit: "Gangguan Psikotik",
        JenisPerawatan: "Rawat Dirumah",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni 2016",
        LamaCuti: "Cuti Ke-6",
        WFH: "Tidak",
        Keterangan: "Proses PDH"
      },
      {
        No: 2,
        NRP: "78120761",
        Nama: "Abdul Malik",
        Pangkat: "BRIGADIR",
        SatuanKerja: "BIDDOKKES POLDA NTB",
        JenisSakit: "Stroke, Post Stroke + Hipertensi grade II",
        JenisPerawatan: "Rawat Dirumah",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni 2022",
        LamaCuti: "Cuti Ke-1",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 3,
        NRP: "79060570",
        Nama: "Mulya Samsul Hadi",
        Pangkat: "AIPTU",
        SatuanKerja: "BIDDOKKES POLDA NTB",
        JenisSakit: "Stroke, Post Stroke + Hipertensi grade II",
        JenisPerawatan: "Rawat Dirumah",
        SumberBiaya: "BPJS",
        AwalSakit: "Januari 2023",
        LamaCuti: "Cuti Ke-1",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 4,
        NRP: "83120202",
        Nama: "Awaludin",
        Pangkat: "AIPDA",
        SatuanKerja: "BIDDOKKES POLDA NTB",
        JenisSakit: "Ginjal, Ginjal Kronis DAN Neuritis",
        JenisPerawatan: "Rawat Dirumah",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni 2022",
        LamaCuti: "Cuti Ke-1",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 5,
        NRP: "80071256",
        Nama: "Sopian Hadi",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES POLDA NTB",
        JenisSakit: "Skizofrenia Paranoid",
        JenisPerawatan: "Rawat Jalan",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni 2022",
        LamaCuti: "Cuti Ke-4",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 6,
        NRP: "87120664",
        Nama: "I Komang Wira Atmaja",
        Pangkat: "BRIPKA",
        SatuanKerja: "BIDDOKKES POLDA NTB",
        JenisSakit: "Jantung, Depresi Berat",
        JenisPerawatan: "-",
        SumberBiaya: "BPJS",
        AwalSakit: "Juni 2019",
        LamaCuti: "Cuti Ke-4",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 7,
        NRP: "76050167",
        Nama: "I Wayan Wiarta Utama",
        Pangkat: "AIPTU",
        SatuanKerja: "DIT BINMAS",
        JenisSakit: "Jantung, CDK dan Gagal Jantung",
        JenisPerawatan: "Rawat Jalan",
        SumberBiaya: "BPJS",
        AwalSakit: "Januari 2022",
        LamaCuti: "Cuti Ke-1",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 8,
        NRP: "76110629",
        Nama: "Doddy Hermawan",
        Pangkat: "KOMBESPOL",
        SatuanKerja: "ITWASDA",
        JenisSakit: "Stroke",
        JenisPerawatan: "Rawat Jalan",
        SumberBiaya: "Non BPJS",
        AwalSakit: "Oktober 2021",
        LamaCuti: "Cuti Ke-1",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 9,
        NRP: "78120888",
        Nama: "Moham Mad Kibalatin",
        Pangkat: "BRIGADIR",
        SatuanKerja: "SATRIMOB POLDA NTB",
        JenisSakit: "Kanker, Ca Nasofaring",
        JenisPerawatan: "Rawat Jalan",
        SumberBiaya: "Non BPJS",
        AwalSakit: "Oktober 2021",
        LamaCuti: "Cuti Ke-1",
        WFH: "Tidak",
        Keterangan: "BPKP"
      },
      {
        No: 10,
        NRP: "78080118",
        Nama: "Totok Ari Prasetyo",
        Pangkat: "AIPTU",
        SatuanKerja: "POLRES LOMBOK BARAT",
        JenisSakit: "Bone malignancy process suspect chordoma",
        JenisPerawatan: "Rawat Dirumah",
        SumberBiaya: "BPJS",
        AwalSakit: "Desember 2021",
        LamaCuti: "Cuti Ke-5",
        WFH: "Tidak",
        Keterangan: "Proses PDH"
      }
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
