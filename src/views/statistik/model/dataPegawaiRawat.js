export const DataPegawaiRawat = [
  {
    uuid: "1a2b3c4d-5678-90ab-cdef-1234567890ab",
    jenispenyakit: "Demam",
    jenisperawatan: "Rawat Jalan",
    lamacuti: 3,
    awalsakit: "2024-05-01",
    keterangan: "Demam tinggi disertai flu",
    WFH: "Tidak",
    sumberbiaya: "BPJS",
    pegawaiId: 1,
  },
  {
    uuid: "2b3c4d5e-6789-01ab-cdef-234567890abc",
    jenispenyakit: "Patah Tulang",
    jenisperawatan: "Rawat Inap",
    lamacuti: 14,
    awalsakit: "2024-05-10",
    keterangan: "Patah tulang akibat kecelakaan",
    WFH: "Tidak",
    sumberbiaya: "Non-BPJS",
    pegawaiId: 2,
  },
  {
    uuid: "3c4d5e6f-7890-12ab-cdef-34567890abcd",
    jenispenyakit: "Migraine",
    jenisperawatan: "Rawat Jalan",
    lamacuti: 1,
    awalsakit: "2024-05-15",
    keterangan: "Migraine berat",
    WFH: "Ya",
    sumberbiaya: "BPJS",
    pegawaiId: 3,
  },
  {
    uuid: "4d5e6f7g-8901-23ab-cdef-4567890abcde",
    jenispenyakit: "Gastritis",
    jenisperawatan: "Rawat Jalan",
    lamacuti: 2,
    awalsakit: "2024-05-20",
    keterangan: "Gastritis akut",
    WFH: "Tidak",
    sumberbiaya: "Non-BPJS",
    pegawaiId: 4,
  },
  {
    uuid: "5e6f7g8h-9012-34ab-cdef-567890abcdef",
    jenispenyakit: "Covid-19",
    jenisperawatan: "Isolasi Mandiri",
    lamacuti: 10,
    awalsakit: "2024-05-25",
    keterangan: "Positif Covid-19 dengan gejala ringan",
    WFH: "Ya",
    sumberbiaya: "BPJS",
    pegawaiId: 5,
  },
];

export const calculateTotals = () => {
  const totals = {
    bpjs: 0,
    nonBpjs: 0,
  };

  DataPegawaiRawat.forEach((item) => {
    const sumberbiaya = item.sumberbiaya.toLowerCase();
    if (sumberbiaya === "bpjs") {
      totals.bpjs += 1;
    } else {
      totals.nonBpjs += 1;
    }
  });

  const totalCases = totals.bpjs + totals.nonBpjs;

  const percentages = {
    bpjs: ((totals.bpjs / totalCases) * 100).toFixed(0),
    nonBpjs: ((totals.nonBpjs / totalCases) * 100).toFixed(0),
  };

  return percentages;
};

export const calculateRawatTotals = () => {
  const totals = {
    rawatJalan: 0,
    rawatInap: 0,
    lainnya: 0,
  };

  DataPegawaiRawat.forEach((item) => {
    const jenisperawatan = item.jenisperawatan.toLowerCase();
    if (jenisperawatan === "rawat jalan") {
      totals.rawatJalan += 1;
    } else if (jenisperawatan === "rawat inap") {
      totals.rawatInap += 1;
    } else {
      totals.lainnya += 1;
    }
  });

  const totalCases = totals.rawatJalan + totals.rawatInap + totals.lainnya;

  const percentages = {
    rawatJalan: ((totals.rawatJalan / totalCases) * 100).toFixed(0),
    rawatInap: ((totals.rawatInap / totalCases) * 100).toFixed(0),
    lainnya: ((totals.lainnya / totalCases) * 100).toFixed(0),
  };

  return percentages;
};
