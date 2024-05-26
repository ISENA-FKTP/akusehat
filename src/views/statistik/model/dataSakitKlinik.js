export const dataSakitKlinik = [
  {
    uuid: "a6f56f1a-5d7b-4d8a-8f4d-1d8a1c9e1c9e",
    jenispenyakit: "Hipertensi",
    kesadaran: "Sadar",
    suhu: 37,
    pasienId: 1,
  },
  {
    uuid: "b7e67g2b-6e8c-5e9b-9f5e-2e9b2d9e2d9e",
    jenispenyakit: "Diabetes",
    kesadaran: "Sadar",
    suhu: 38,
    pasienId: 2,
  },
  {
    uuid: "c8f78h3c-7f9d-6f0c-af6f-3f0c3e0e3e0e",
    jenispenyakit: "Asma",
    kesadaran: "Tidak Sadar",
    suhu: 39,
    pasienId: 3,
  },
  {
    uuid: "d9g89i4d-8g0e-7g1d-bg7g-4g1d4f1f4f1f",
    jenispenyakit: "Demam Berdarah",
    kesadaran: "Sadar",
    suhu: 40,
    pasienId: 4,
  },
  {
    uuid: "e0h90j5e-9h1f-8h2e-ch8h-5h2e5g2g5g2g",
    jenispenyakit: "Covid-19",
    kesadaran: "Koma",
    suhu: 36,
    pasienId: 5,
  },
  {
    uuid: "f1i01k6f-0i2g-9i3f-di9i-6i3f6h3h6h3h",
    jenispenyakit: "Hipertensi",
    kesadaran: "Sadar",
    suhu: 37,
    pasienId: 6,
  },
  {
    uuid: "g2j12l7g-1j3h-0j4g-ej0j-7j4g7i4i7i4i",
    jenispenyakit: "Diabetes",
    kesadaran: "Tidak Sadar",
    suhu: 38,
    pasienId: 7,
  },
  {
    uuid: "h3k23m8h-2k4i-1k5h-fk1k-8k5h8j5j8j5j",
    jenispenyakit: "Asma",
    kesadaran: "Sadar",
    suhu: 39,
    pasienId: 8,
  },
  {
    uuid: "i4l34n9i-3l5j-2l6i-gl2l-9l6i9k6k9k6k",
    jenispenyakit: "Demam Berdarah",
    kesadaran: "Tidak Sadar",
    suhu: 40,
    pasienId: 9,
  },
  {
    uuid: "j5m45o0j-4m6k-3m7j-hm3m-0m7j0l7l0l7l",
    jenispenyakit: "Covid-19",
    kesadaran: "Sadar",
    suhu: 36,
    pasienId: 10,
  },
  {
    uuid: "j5m45o0j-4m6k-3m7j-hm3m-0m7j0l7l0l7l",
    jenispenyakit: "Covid-19",
    kesadaran: "Sadar",
    suhu: 36,
    pasienId: 10,
  },
  {
    uuid: "j5m45o0j-4m6k-3m7j-hm3m-0m7j0l7l0l7l",
    jenispenyakit: "Covid-19",
    kesadaran: "Sadar",
    suhu: 36,
    pasienId: 10,
  },
  {
    uuid: "j5m45o0j-4m6k-3m7j-hm3m-0m7j0l7l0l7l",
    jenispenyakit: "Covid-19",
    kesadaran: "Sadar",
    suhu: 36,
    pasienId: 10,
  },
  {
    uuid: "h3k23m8h-2k4i-1k5h-fk1k-8k5h8j5j8j5j",
    jenispenyakit: "Asma",
    kesadaran: "Sadar",
    suhu: 39,
    pasienId: 8,
  },
];

export const calculateTotals = (diagnosas) => {
  const totals = {};
  diagnosas.forEach((diagnosa) => {
    const jenisPenyakit = diagnosa.jenispenyakit;
    totals[jenisPenyakit] = (totals[jenisPenyakit] || 0) + 1;
  });
  return totals;
};

export const getTop10Penyakit = (totals) => {
  const sorted = Object.entries(totals).sort((b, a) => b[1] - a[1]);
  return sorted.slice(0, 10);
};
