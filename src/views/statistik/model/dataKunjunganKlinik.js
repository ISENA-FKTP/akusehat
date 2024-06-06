export const DataKunjunganKlinik = [
  {
    uuid: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Umum",
    jeniskunjungan: "Sehat",
    keluhan: "Demam dan Sakit Kepala",
    pasienId: 1,
    tanggal: "2024-05-31",
  },
  {
    uuid: "b2c3d4e5-f6a7-8901-bc23-de45fg67hi89",
    politujuan: "Poli Gigi",
    perawatan: "Pencabutan Gigi",
    jeniskunjungan: "Sakit",
    keluhan: "Sakit Gigi",
    pasienId: 2,
    tanggal: "2023-05-31",
  },
  {
    uuid: "c3d4e5f6-a7b8-9012-cd34-ef56gh78ij90",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Mata",
    jeniskunjungan: "Sehat",
    keluhan: "Penglihatan Kabur",
    pasienId: 3,
    tanggal: "2023-05-31",
  },
  {
    uuid: "d4e5f6a7-b8c9-0123-de45-fg67hi89jk01",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Anak",
    jeniskunjungan: "Sehat",
    keluhan: "Batuk Ringan",
    pasienId: 4,
    tanggal: "2023-05-31",
  },
  {
    uuid: "e5f6a7b8-c9d0-1234-ef56-gh78ij90kl12",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Umum",
    jeniskunjungan: "Sakit",
    keluhan: "Sakit Perut",
    pasienId: 5,
    tanggal: "2022-05-31",
  },
  {
    uuid: "f6a7b8c9-d0e1-2345-gh78-ij90kl12mn34",
    politujuan: "Poli Gigi",
    perawatan: "Pembersihan Gigi",
    jeniskunjungan: "Sehat",
    keluhan: "Pembersihan Gigi Rutin",
    pasienId: 6,
    tanggal: "2024-05-31",
  },
  {
    uuid: "g7h8i9j0-k1l2-3456-mn78-op90qr12st34",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Mata",
    jeniskunjungan: "Sakit",
    keluhan: "Mata Merah dan Gatal",
    pasienId: 7,
    tanggal: "2024-05-31",
  },
  {
    uuid: "h9i0j1k2-l3m4-5678-no90-qr12st34uv56",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Anak",
    jeniskunjungan: "Sehat",
    keluhan: "Imunisasi Rutin",
    pasienId: 8,
    tanggal: "2024-05-31",
  },
  {
    uuid: "i1j2k3l4-m5n6-7890-op12-qr34st56uv78",
    politujuan: "Poli Umum",
    perawatan: "Pemeriksaan Umum",
    jeniskunjungan: "Sakit",
    keluhan: "Demam Tinggi",
    pasienId: 9,
    tanggal: "2024-05-31",
  },
  {
    uuid: "j3k4l5m6-n7o8-9012-pq34-uv56wx78yz90",
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
