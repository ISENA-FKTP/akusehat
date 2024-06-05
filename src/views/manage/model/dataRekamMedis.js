export const DataRekamMedis = {
    getData() {
      return [
        {
          No: 1,
          NRP: "80010816",
          Nama: "Haji",
          Pangkat: "BRIPKA",
          SatuanKerja: "BIDDOKKES POLDA NTB",
          JenisSakit: "Gangguan Psikotik",
          Keterangan: "Rekam medis terakhir kali bulan mei"
        },
        {
          No: 2,
          NRP: "196908121991061001",
          Nama: "Sawal",
          Pangkat: "AKBP",
          SatuanKerja: "YANMA POLDA NTB",
          JenisSakit: "Sakit kepala belakang dan nyeri pinggang",
          Keterangan: "Keluhan muncul sejak bulan lalu"
        },
        {
          No: 3,
          NRP: "5408022",
          Nama: "Agus Sunyoto",
          Pangkat: "IPTU",
          SatuanKerja: "Pensiunan DIT RESKRIMUS POLDA NTB",
          JenisSakit: "Pusing, badan lemas, nafsu makan turun",
          Keterangan: "Sering mengalami pusing setelah pensiun"
        },
        {
          No: 4,
          NRP: "54080228",
          Nama: "Salmah",
          Pangkat: "AKP",
          SatuanKerja: "Pensiunan DIT RESKRIMUS POLDA NTB",
          JenisSakit: "Pusing, nyeri tengkuk",
          Keterangan: "Pusing berkepanjangan, perlu pemeriksaan lebih lanjut"
        },
        {
          No: 5,
          NRP: "12345678",
          Nama: "John Doe",
          Pangkat: "BRIGADIR",
          SatuanKerja: "SATLANTAS POLDA NTB",
          JenisSakit: "Nyeri punggung, sulit tidur",
          Keterangan: "Sering bekerja malam hari"
        },
        {
          No: 6,
          NRP: "87654321",
          Nama: "Jane Smith",
          Pangkat: "AKBP",
          SatuanKerja: "DIT INTELKAM POLDA NTB",
          JenisSakit: "Demam tinggi, batuk",
          Keterangan: "Kemungkinan terkena infeksi virus"
        },
        {
          No: 7,
          NRP: "23456789",
          Nama: "Ahmad",
          Pangkat: "IPDA",
          SatuanKerja: "DIT SAMAPTA POLDA NTB",
          JenisSakit: "Sesak napas, pusing",
          Keterangan: "Perlu pemeriksaan paru-paru"
        },
        {
          No: 8,
          NRP: "98765432",
          Nama: "Linda",
          Pangkat: "AIPTU",
          SatuanKerja: "POLSEK KUTA",
          JenisSakit: "Nyeri sendi, kelelahan",
          Keterangan: "Nyeri sendi semakin parah saat musim hujan"
        },
        {
          No: 9,
          NRP: "34567890",
          Nama: "Robert",
          Pangkat: "IPTU",
          SatuanKerja: "DIT POLAIRUD POLDA NTB",
          JenisSakit: "Mual, muntah, sakit kepala",
          Keterangan: "Gejala muncul setelah perjalanan dinas"
        },
        {
          No: 10,
          NRP: "45678901",
          Nama: "Emily",
          Pangkat: "AKP",
          SatuanKerja: "SAT BINMAS POLDA NTB",
          JenisSakit: "Nyeri perut, lemas",
          Keterangan: "Diduga maag kronis"
        },
        {
          No: 11,
          NRP: "56789012",
          Nama: "Michael",
          Pangkat: "AKBP",
          SatuanKerja: "DIT SABHARA POLDA NTB",
          JenisSakit: "Asma kambuh",
          Keterangan: "Perlu inhaler setiap kali sesak"
        },
        {
          No: 12,
          NRP: "67890123",
          Nama: "Sarah",
          Pangkat: "BRIPKA",
          SatuanKerja: "SATRESNARKOBA POLDA NTB",
          JenisSakit: "Sakit pinggang",
          Keterangan: "Sering mengangkat barang berat"
        },
        {
          No: 13,
          NRP: "78901234",
          Nama: "David",
          Pangkat: "IPDA",
          SatuanKerja: "SATRESKRIM POLDA NTB",
          JenisSakit: "Cedera lutut",
          Keterangan: "Cedera saat latihan fisik"
        },
        {
          No: 14,
          NRP: "89012345",
          Nama: "Laura",
          Pangkat: "AIPTU",
          SatuanKerja: "SATBINMAS POLDA NTB",
          JenisSakit: "Migraine",
          Keterangan: "Sering kambuh saat stres"
        },
        {
          No: 15,
          NRP: "90123456",
          Nama: "Kevin",
          Pangkat: "BRIGADIR",
          SatuanKerja: "POLSEK MANDALIKA",
          JenisSakit: "Diare",
          Keterangan: "Perlu pemeriksaan lebih lanjut"
        },
        {
          No: 16,
          NRP: "01234567",
          Nama: "Angela",
          Pangkat: "AKP",
          SatuanKerja: "SATLANTAS POLDA NTB",
          JenisSakit: "Insomnia",
          Keterangan: "Sulit tidur sejak 3 bulan terakhir"
        }
      ];    
    },
  
    getDataRekamMedis(){
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
    "Keterangan",
    ""
  ]; 
  