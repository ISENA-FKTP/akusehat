export const DataObat = [
  {
    uuid: "b1d1a2c4-1e9e-4b1f-8bb2-2a0f6a7a5e31",
    namaobat: "Paracetamol",
    jumlahobat: 100,
    tglkadaluarsa: "2025-12-31",
    nobatch: 123456,
    jenisobat: "Tablet",
    hargaobat: 5000,
    kategori: "Obat Umum",
    totalobatkeluar: 20,
    userId: 1,
  },
  {
    uuid: "d5f5e1b7-4e29-4e8a-9bb3-9e1c6d2f8a2c",
    namaobat: "Amoxicillin",
    jumlahobat: 50,
    tglkadaluarsa: "2024-11-30",
    nobatch: 789012,
    jenisobat: "Kapsul",
    hargaobat: 15000,
    kategori: "Antibiotik",
    totalobatkeluar: 10,
    userId: 2,
  },
  {
    uuid: "f8a6e3b4-4f59-47a5-8a2e-8c4d5a7e2b9f",
    namaobat: "Ibuprofen",
    jumlahobat: 200,
    tglkadaluarsa: "2026-06-30",
    nobatch: 345678,
    jenisobat: "Tablet",
    hargaobat: 7000,
    kategori: "Obat Umum",
    totalobatkeluar: 30,
    userId: 1,
  },
  {
    uuid: "a6b5c3d1-3f2a-4e5b-9c8a-7f2b4c5d8e9f",
    namaobat: "Metformin",
    jumlahobat: 120,
    tglkadaluarsa: "2025-03-31",
    nobatch: 901234,
    jenisobat: "Tablet",
    hargaobat: 20000,
    kategori: "Diabetes",
    totalobatkeluar: 40,
    userId: 3,
  },
  {
    uuid: "b4e6f2a1-1d9f-4e8b-9a8e-6d2c7b4a9e5c",
    namaobat: "Captopril",
    jumlahobat: 80,
    tglkadaluarsa: "2025-09-30",
    nobatch: 567890,
    jenisobat: "Tablet",
    hargaobat: 10000,
    kategori: "Hipertensi",
    totalobatkeluar: 15,
    userId: 2,
  },
];

export const calculateTotals = () => {
  let totalJumlahObat = 0;
  let totalObatKeluar = 0;

  DataObat.forEach((item) => {
    totalJumlahObat += item.jumlahobat;
    totalObatKeluar += item.totalobatkeluar;
  });

  return { totalJumlahObat, totalObatKeluar };
};
