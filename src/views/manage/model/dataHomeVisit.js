export const DataHomeVisit = {
    getData() {
      return [
        {
          No: 1,
          NRP: "196908121991061001",
          Nama: "Sawal",
          SatuanKerja: "YANMA POLDA NTB",
          Keluhan: "Sakit kepala belakang dan nyeri pinggang",
        },
        {
          No: 2,
          NRP: "5408022",
          Nama: "Agus Sunyoto",
          SatuanKerja: "Pensiunan DIT RESKRIMUS POLDA NTB",
          Keluhan: "Pusing, badan lemas, nafsu makan turun",
        },
        {
          No: 3,
          NRP: "54080228",
          Nama: "Salmah",
          SatuanKerja: "Pensiunan DIT RESKRIMUS POLDA NTB",
          Keluhan: "Pusing, nyeri tengkuk",
        },
        {
          No: 4,
          NRP: "196905091990031002",
          Nama: "Rudi Hartono",
          SatuanKerja: "DIT LANTAS POLDA NTB",
          Keluhan: "Nyeri dada, sesak napas",
        },
        {
          No: 5,
          NRP: "196803021988031003",
          Nama: "Yusuf Maulana",
          SatuanKerja: "SAT RESKRIM POLRES MATARAM",
          Keluhan: "Demam tinggi, batuk",
        },
        {
          No: 6,
          NRP: "196710211989011004",
          Nama: "Nina Marlina",
          SatuanKerja: "BAG SUMDA POLDA NTB",
          Keluhan: "Sakit kepala berat, mual",
        },
        {
          No: 7,
          NRP: "196811191990031005",
          Nama: "Andi Wijaya",
          SatuanKerja: "SAT LANTAS POLRES LOMBOK BARAT",
          Keluhan: "Nyeri punggung, sulit tidur",
        },
        {
          No: 8,
          NRP: "196709101988031006",
          Nama: "Dewi Sartika",
          SatuanKerja: "BAG REN POLDA NTB",
          Keluhan: "Sakit gigi, nyeri rahang",
        },
        {
          No: 9,
          NRP: "196701051987031007",
          Nama: "Bambang Prasetyo",
          SatuanKerja: "DIT SAMAPTA POLDA NTB",
          Keluhan: "Nyeri lutut, kesulitan berjalan",
        },
        {
          No: 10,
          NRP: "196812221990031008",
          Nama: "Sri Mulyani",
          SatuanKerja: "SAT BINMAS POLRES LOMBOK UTARA",
          Keluhan: "Sakit perut, diare",
        },
        {
          No: 11,
          NRP: "196811111989011009",
          Nama: "Agung Prabowo",
          SatuanKerja: "BAG OPS POLDA NTB",
          Keluhan: "Sesak napas, batuk kronis",
        },
        {
          No: 12,
          NRP: "196805211988031010",
          Nama: "Ratna Dewi",
          SatuanKerja: "SAT SABHARA POLRES LOTIM",
          Keluhan: "Nyeri sendi, bengkak",
        },
        {
          No: 13,
          NRP: "196707021987031011",
          Nama: "Hariyanto",
          SatuanKerja: "SAT RESKRIM POLRES SUMBAWA",
          Keluhan: "Sakit kepala sebelah, vertigo",
        },
        {
          No: 14,
          NRP: "196902151990031012",
          Nama: "Farida Susanti",
          SatuanKerja: "SAT BINMAS POLRES BIMA",
          Keluhan: "Demam, sakit tenggorokan",
        },
        {
          No: 15,
          NRP: "196812231990031013",
          Nama: "Joko Susilo",
          SatuanKerja: "SAT INTELKAM POLRES DOMPU",
          Keluhan: "Nyeri punggung bawah, kesulitan berdiri",
        }
      ];
    },
  
    getDataHomeVisit() {
      return Promise.resolve(this.getData());
    }
  };
  
  export const headData = [
    "No", 
    "NRP",
    "Nama",
    "Satuan Kerja",
    "Keluhan",
    "Aksi"
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
      field: "SatuanKerja",
      header: "Satuan Kerja",
    },
    {
      field: "Keluhan",
      header: "Keluhan",
    },
    {
      field: "Aksi",
      header: "Aksi",
    }
  ];
  