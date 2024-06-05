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
    tanggal: "2023-05-29",
  },
  {
    uuid: "d5f5e1b7-4e29-4e8a-9bb3-9e1c6d2f8a2c",
    namaobat: "Amoxicillin",
    jumlahobat: 50,
    tglkadaluarsa: "2023-11-30",
    nobatch: 789012,
    jenisobat: "Kapsul",
    hargaobat: 15000,
    kategori: "Antibiotik",
    totalobatkeluar: 10,
    userId: 2,
    tanggal: "2023-05-29",
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
    tanggal: "2023-05-29",
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
    tanggal: "2023-05-29",
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
    tanggal: "2024-05-29",
  },
  {
    uuid: "c3e9a7f1-4d6e-4e3a-8b2f-1a2c6d7f9e8b",
    namaobat: "Lisinopril",
    jumlahobat: 75,
    tglkadaluarsa: "2025-07-31",
    nobatch: 678901,
    jenisobat: "Tablet",
    hargaobat: 9000,
    kategori: "Hipertensi",
    totalobatkeluar: 12,
    userId: 3,
    tanggal: "2024-05-29",
  },
  {
    uuid: "e4b8a6f2-2d5e-4f7b-8c3e-6d2e4b7c8a9e",
    namaobat: "Atorvastatin",
    jumlahobat: 110,
    tglkadaluarsa: "2026-01-31",
    nobatch: 234567,
    jenisobat: "Tablet",
    hargaobat: 12000,
    kategori: "Kolesterol",
    totalobatkeluar: 25,
    userId: 1,
    tanggal: "2023-05-29",
  },
  {
    uuid: "d7c3f5e1-3b4d-4f9a-9e8b-2a0c4d6e7b8f",
    namaobat: "Simvastatin",
    jumlahobat: 95,
    tglkadaluarsa: "2024-08-31",
    nobatch: 456789,
    jenisobat: "Tablet",
    hargaobat: 11000,
    kategori: "Kolesterol",
    totalobatkeluar: 18,
    userId: 2,
    tanggal: "2023-05-29",
  },
  {
    uuid: "a8d7b4e1-1f6a-4e8b-9c2e-5d4b7c6e8a9f",
    namaobat: "Omeprazole",
    jumlahobat: 130,
    tglkadaluarsa: "2025-05-31",
    nobatch: 789123,
    jenisobat: "Kapsul",
    hargaobat: 6000,
    kategori: "Pencernaan",
    totalobatkeluar: 22,
    userId: 3,
    tanggal: "2023-05-29",
  },
  {
    uuid: "b3d6e4a7-2d5b-4f8a-8e3b-7c9e1a2d4f5b",
    namaobat: "Ranitidine",
    jumlahobat: 85,
    tglkadaluarsa: "2024-12-31",
    nobatch: 567891,
    jenisobat: "Tablet",
    hargaobat: 8000,
    kategori: "Pencernaan",
    totalobatkeluar: 14,
    userId: 1,
    tanggal: "2023-05-29",
  },
];

export const calculateTotals = (DataObat) => {
  let totalJumlahObat = 0;
  let totalObatKeluar = 0;

  DataObat.forEach((item) => {
    totalJumlahObat += item.jumlahobat;
    totalObatKeluar += item.totalobatkeluar;
  });

  return { totalJumlahObat, totalObatKeluar };
};

export const calculateTotalObat = (DataObat) => {
  let totalJumlahObat = 0;

  DataObat.forEach((item) => {
    totalJumlahObat += item.jumlahobat;
  });

  return totalJumlahObat;
};

export const calculateObatTerpakai = (DataObat) => {
  const sortedData = [...DataObat].sort(
    (a, b) => b.totalobatkeluar - a.totalobatkeluar
  );

  const top10Obat = sortedData.slice(0, 10);

  return top10Obat;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agus",
  "Sept",
  "Okto",
  "Nov",
  "Des",
];

export const calculateByYearAndMonth = (year, showNextSixMonths, DataObat) => {
  const filteredData = DataObat.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const result = Array(showNextSixMonths ? 12 : 6).fill(0);

  filteredData.forEach((item) => {
    const date = new Date(item.tglkadaluarsa);
    const month = date.getMonth();

    if (showNextSixMonths) {
      result[month] += item.jumlahobat;
    } else {
      if (month < 6) {
        result[month] += item.jumlahobat;
      }
    }
  });

  const formattedResult = result.map((jumlahobat, index) => ({
    bulan: monthNames[index % 12],
    jumlahobat,
  }));

  return formattedResult;
};

export const calculateByYearAndMonthForBar = (
  year,
  showNextSixMonths,
  DataObat
) => {
  const filteredData = DataObat.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const result = Array(showNextSixMonths ? 12 : 6)
    .fill(null)
    .map(() => ({
      totalObat: 0,
      obatKeluar: 0,
    }));

  filteredData.forEach((item) => {
    const date = new Date(item.tglkadaluarsa);
    const month = date.getMonth();

    if (showNextSixMonths) {
      result[month].totalObat += item.jumlahobat;
      result[month].obatKeluar += item.totalobatkeluar;
    } else {
      if (month < 6) {
        result[month].totalObat += item.jumlahobat;
        result[month].obatKeluar += item.totalobatkeluar;
      }
    }
  });

  const formattedResult = result.map((data, index) => ({
    bulan: monthNames[index % 12],
    "Total Obat": data.totalObat,
    "Obat Keluar": data.obatKeluar,
  }));

  return formattedResult;
};
