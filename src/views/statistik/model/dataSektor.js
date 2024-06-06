export const DataSektor = [
  {
    uuid: "1a2b3c4d-5678-90ab-cdef-1234567890ab",
    namapegawai: "John Doe",
    nrp: 123456,
    pangkat: "AKBP",
    satuankerja: "Ditreskrimum",
    role: "Investigator",
    userId: 1,
    tanggal: "2023-05-30",
    pangkatNrp: "AKBP/123456",
  },
  {
    uuid: "2b3c4d5e-6789-01ab-cdef-234567890abc",
    namapegawai: "Jane Smith",
    nrp: 654321,
    pangkat: "Kompol",
    satuankerja: "Ditnarkoba",
    role: "Analyst",
    userId: 2,
    tanggal: "2023-05-30",
    pangkatNrp: "Kompol/654321",
  },
  {
    uuid: "3c4d5e6f-7890-12ab-cdef-34567890abcd",
    namapegawai: "Mike Johnson",
    nrp: 789012,
    pangkat: "AKP",
    satuankerja: "Ditlantas",
    role: "Traffic Officer",
    userId: 3,
    tanggal: "2023-05-30",
    pangkatNrp: "AKP/789012",
  },
  {
    uuid: "4d5e6f7g-8901-23ab-cdef-4567890abcde",
    namapegawai: "Emily Davis",
    nrp: 345678,
    pangkat: "IPTU",
    satuankerja: "Ditreskrimum",
    role: "Detective",
    userId: 4,
    tanggal: "2024-05-30",
    pangkatNrp: "IPTU/345678",
  },
  {
    uuid: "5e6f7g8h-9012-34ab-cdef-567890abcdef",
    namapegawai: "Robert Brown",
    nrp: 901234,
    pangkat: "IPDA",
    satuankerja: "Ditreskrimum",
    role: "Field Agent",
    userId: 5,
    tanggal: "2022-05-30",
    pangkatNrp: "IPDA/901234",
  },
  {
    uuid: "6f7g8h9i-0123-45ab-cdef-678901abcdef",
    namapegawai: "Laura Wilson",
    nrp: 567890,
    pangkat: "AKBP",
    satuankerja: "Ditnarkoba",
    role: "Field Investigator",
    userId: 6,
    tanggal: "2024-05-30",
    pangkatNrp: "AKBP/567890",
  },
  {
    uuid: "7g8h9i0j-1234-56ab-cdef-789012abcdef",
    namapegawai: "David Martinez",
    nrp: 234567,
    pangkat: "AKP",
    satuankerja: "Ditlantas",
    role: "Traffic Manager",
    userId: 7,
    tanggal: "2024-05-30",
    pangkatNrp: "AKP/234567",
  },
  {
    uuid: "8h9i0j1k-2345-67ab-cdef-890123abcdef",
    namapegawai: "Sophia Taylor",
    nrp: 345679,
    pangkat: "AKBP",
    satuankerja: "Ditreskrimsus",
    role: "Cyber Crime Investigator",
    userId: 8,
    tanggal: "2024-05-30",
    pangkatNrp: "AKBP/345679",
  },
  {
    uuid: "9i0j1k2l-3456-78ab-cdef-901234abcdef",
    namapegawai: "James Anderson",
    nrp: 456789,
    pangkat: "Kompol",
    satuankerja: "Ditreskrimsus",
    role: "Forensic Expert",
    userId: 9,
    tanggal: "2024-05-30",
    pangkatNrp: "Kompol/456789",
  },
  {
    uuid: "0j1k2l3m-4567-89ab-cdef-012345abcdef",
    namapegawai: "Oliver Thomas",
    nrp: 567891,
    pangkat: "IPTU",
    satuankerja: "Ditreskrimsus",
    role: "Data Analyst",
    userId: 10,
    tanggal: "2024-05-30",
    pangkatNrp: "IPTU/567891",
  },
];

export const calculateSektorTotals = (DataSektor) => {
  const totals = {};

  DataSektor.forEach((pegawai) => {
    const { satuankerja } = pegawai;
    if (!totals[satuankerja]) {
      totals[satuankerja] = 0;
    }
    totals[satuankerja] += 1;
  });

  const totalsArray = Object.entries(totals);

  totalsArray.sort((a, b) => b[1] - a[1]); // Corrected sorting to descending order

  const top5Totals = totalsArray.slice(0, 5);

  const top5TotalsObject = Object.fromEntries(top5Totals);

  return top5TotalsObject;
};
