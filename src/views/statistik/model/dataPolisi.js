export const DataPolisi = [
  {
    bulan: "Januari",
    tanggal: "2023-01-01",
    polda: 81,
    polres: 144,
  },
  {
    bulan: "Februari",
    tanggal: "2024-02-01",
    polda: 23,
    polres: 25,
  },
  {
    bulan: "Maret",
    tanggal: "2024-03-01",
    polda: 32,
    polres: 67,
  },
  {
    bulan: "April",
    tanggal: "2024-04-01",
    polda: 180,
    polres: 128,
  },
  {
    bulan: "Mei",
    tanggal: "2024-05-01",
    polda: 153,
    polres: 117,
  },
  {
    bulan: "Juni",
    tanggal: "2022-06-01",
    polda: 99,
    polres: 2,
  },
  {
    bulan: "Juli",
    tanggal: "2022-07-01",
    polda: 198,
    polres: 86,
  },
];

export const calculateTotals = () => {
  let totalJumlahPolda = 0;
  let totalObatPolres = 0;

  for (const data of DataPolisi) {
    totalJumlahPolda += data.polda;
    totalObatPolres += data.polres;
  }

  return { totalJumlahPolda, totalObatPolres };
};

export const calculateTotalsPasien = (DataSet) => {
  let totalJumlahPolda = 0;
  let totalObatPolres = 0;

  for (const data of DataSet) {
    totalJumlahPolda += data.polda;
    totalObatPolres += data.polres;
  }

  return { totalJumlahPolda, totalObatPolres };
};
