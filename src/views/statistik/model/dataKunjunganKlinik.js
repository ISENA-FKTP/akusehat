export const DataKunjunganKlinik = [
  {
    uuid: "1a2b3c4d",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Umum",
    jeniskunjungan: "Sehat",
    keluhan: "Demam dan Sakit Kepala",
    pasienId: 1,
    tanggal: "2024-05-31",
  },
  {
    uuid: "5e6f7g8h",
    politujuan: "Poli Gigi",
    perawatan: "Pencabutan Gigi",
    jeniskunjungan: "Sakit",
    keluhan: "Sakit Gigi",
    pasienId: 2,
    tanggal: "2023-05-31",
  },
  {
    uuid: "9i0j1k2l",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Mata",
    jeniskunjungan: "Sehat",
    keluhan: "Penglihatan Kabur",
    pasienId: 3,
    tanggal: "2023-05-31",
  },
  {
    uuid: "3m4n5o6p",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Anak",
    jeniskunjungan: "Sehat",
    keluhan: "Batuk Ringan",
    pasienId: 4,
    tanggal: "2023-05-31",
  },
  {
    uuid: "7q8r9s0t",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Umum",
    jeniskunjungan: "Sakit",
    keluhan: "Sakit Perut",
    pasienId: 5,
    tanggal: "2022-05-31",
  },
  {
    uuid: "1u2v3w4x",
    politujuan: "Poli Gigi",
    perawatan: "Pembersihan Gigi",
    jeniskunjungan: "Sehat",
    keluhan: "Pembersihan Gigi Rutin",
    pasienId: 6,
    tanggal: "2024-05-31",
  },
  {
    uuid: "5y6z7a8b",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Mata",
    jeniskunjungan: "Sakit",
    keluhan: "Mata Merah dan Gatal",
    pasienId: 7,
    tanggal: "2024-05-31",
  },
  {
    uuid: "9c0d1e2f",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Anak",
    jeniskunjungan: "Sehat",
    keluhan: "Imunisasi Rutin",
    pasienId: 8,
    tanggal: "2024-05-31",
  },
  {
    uuid: "3g4h5i6j",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Umum",
    jeniskunjungan: "Sakit",
    keluhan: "Demam Tinggi",
    pasienId: 9,
    tanggal: "2024-05-31",
  },
  {
    uuid: "7k8l9m0n",
    politujuan: "Poli Gigi",
    perawatan: "Pemeriksaan Gigi",
    jeniskunjungan: "Sehat",
    keluhan: "Sakit Gusi",
    pasienId: 10,
    tanggal: "2024-05-31",
  },
];

export const calculateTotals = (filteredData) => {
  if (!Array.isArray(filteredData)) {
    console.error("filteredData is not an array.");
    return { totalHealthy: 0, totalSick: 0 };
  }

  let totalHealthy = 0;
  let totalSick = 0;

  for (const data of filteredData) {
    if (data.jeniskunjungan === "Sehat") {
      totalHealthy++;
    } else if (data.jeniskunjungan === "Sakit") {
      totalSick++;
    }
  }

  return { totalHealthy, totalSick };
};

export const calculateTotalsPoli = (DataKunjunganKlinik) => {
  let poliUmumCount = 0;
  let poliGigiCount = 0;

  for (const data of DataKunjunganKlinik) {
    if (data.politujuan === "Poli Umum") {
      poliUmumCount++;
    } else if (data.politujuan === "Poli Gigi") {
      poliGigiCount++;
    }
  }

  return { poliUmumCount, poliGigiCount };
};
