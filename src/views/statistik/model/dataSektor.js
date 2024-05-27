export const DataSektor = [
  {
    uuid: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    namapegawai: "John Doe",
    nrp: 123456,
    pangkat: "AKBP",
    satuankerja: "Ditreskrimum",
    role: "Investigator",
    userId: 1,
  },
  {
    uuid: "b2c3d4e5-f6g7-8h9i-0j1k-2l3m4n5o6p7",
    namapegawai: "Jane Smith",
    nrp: 654321,
    pangkat: "Kompol",
    satuankerja: "Ditnarkoba",
    role: "Analyst",
    userId: 2,
  },
  {
    uuid: "c3d4e5f6-g7h8-9i0j-1k2l-3m4n5o6p7q8",
    namapegawai: "Mike Johnson",
    nrp: 789012,
    pangkat: "AKP",
    satuankerja: "Ditlantas",
    role: "Traffic Officer",
    userId: 3,
  },
  {
    uuid: "d4e5f6g7-h8i9-0j1k-2l3m-4n5o6p7q8r9",
    namapegawai: "Emily Davis",
    nrp: 345678,
    pangkat: "IPTU",
    satuankerja: "Ditreskrimum",
    role: "Detective",
    userId: 4,
  },
  {
    uuid: "e5f6g7h8-i9j0-1k2l-3m4n-5o6p7q8r9s0",
    namapegawai: "Robert Brown",
    nrp: 901234,
    pangkat: "IPDA",
    satuankerja: "Ditreskrimum",
    role: "Field Agent",
    userId: 5,
  },
  {
    uuid: "f6g7h8i9-j0k1-2l3m-4n5o-6p7q8r9s0t1",
    namapegawai: "Laura Wilson",
    nrp: 567890,
    pangkat: "AKBP",
    satuankerja: "Ditnarkoba",
    role: "Field Investigator",
    userId: 6,
  },
  {
    uuid: "g7h8i9j0-k1l2-3m4n-5o6p-7q8r9s0t1u2",
    namapegawai: "David Martinez",
    nrp: 234567,
    pangkat: "AKP",
    satuankerja: "Ditlantas",
    role: "Traffic Manager",
    userId: 7,
  },
  {
    uuid: "h8i9j0k1-l2m3-4n5o-6p7q-8r9s0t1u2v3",
    namapegawai: "Sophia Taylor",
    nrp: 345679,
    pangkat: "AKBP",
    satuankerja: "Ditreskrimsus",
    role: "Cyber Crime Investigator",
    userId: 8,
  },
  {
    uuid: "i9j0k1l2-m3n4-5o6p-7q8r-9s0t1u2v3w4",
    namapegawai: "James Anderson",
    nrp: 456789,
    pangkat: "Kompol",
    satuankerja: "Ditreskrimsus",
    role: "Forensic Expert",
    userId: 9,
  },
  {
    uuid: "j0k1l2m3-n4o5-6p7q-8r9s-0t1u2v3w4x5",
    namapegawai: "Oliver Thomas",
    nrp: 567891,
    pangkat: "IPTU",
    satuankerja: "Ditreskrimsus",
    role: "Data Analyst",
    userId: 10,
  },
  {
    uuid: "j0k1l2m3-n4o5-6p7q-8r9s-0t1u2v3w4x5",
    namapegawai: "Oliver Thomas",
    nrp: 567891,
    pangkat: "IPTU",
    satuankerja: "Metro Jaya",
    role: "Data Analyst",
    userId: 10,
  },
];

export const calculateSektorTotals = () => {
  const totals = {};

  DataSektor.forEach((pegawai) => {
    const { satuankerja } = pegawai;
    if (!totals[satuankerja]) {
      totals[satuankerja] = 0;
    }
    totals[satuankerja] += 1;
  });

  const totalsArray = Object.entries(totals);

  totalsArray.sort((b, a) => b[1] - a[1]);

  const top5Totals = totalsArray.slice(0, 5);

  const top5TotalsObject = Object.fromEntries(top5Totals);

  return top5TotalsObject;
};
