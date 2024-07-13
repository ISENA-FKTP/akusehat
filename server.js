import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

const dummyPeserta = {
  noKartu: "0000039043765",
  nama: "SUSIAMINI IMAM SOERADI",
  hubunganKeluarga: "Peserta",
  sex: "P",
  tglLahir: "25-10-1939",
  tglMulaiAktif: "12-11-2014",
  tglAkhirBerlaku: "01-01-2050",
  kdProviderPst: {
    kdProvider: "0114U163",
    nmProvider: "Klinik Cempaka Putih",
  },
  kdProviderGigi: {
    kdProvider: null,
    nmProvider: null,
  },
  jnsKelas: {
    nama: "KELAS I",
    kode: "1",
  },
  jnsPeserta: {
    nama: "PENERIMA PENSIUN PNS",
    kode: "15",
  },
  golDarah: "0",
  noHP: "083876592594",
  noKTP: "3174016909650001",
  pstProl: "HT",
  pstPrb: "HT",
  aktif: true,
  ketAktif: "AKTIF",
  asuransi: {
    kdAsuransi: null,
    nmAsuransi: null,
    noAsuransi: null,
    cob: false,
  },
  tunggakan: 0,
};

app.use(
  cors({
    credentials: true,
    // origin: "https://isena-fktp.vercel.app",
    origin: "http://localhost:5173",
  })
);

app.get("/api/peserta/:searchType/:searchValue", (req, res) => {
  const { searchType, searchValue } = req.params;

  if (searchType === "bpjs") {
    if (searchValue === dummyPeserta.noKartu) {
      res.status(200).json({
        response: dummyPeserta,
        metaData: {
          message: "OK",
          code: 200,
        },
      });
    } else {
      res.status(404).json({ error: "Data peserta tidak ditemukan" });
    }
  } else if (searchType === "nik") {
    if (searchValue === dummyPeserta.noKTP) {
      res.status(200).json({
        response: dummyPeserta,
        metaData: {
          message: "OK",
          code: 200,
        },
      });
    } else {
      res.status(404).json({ error: "Data peserta tidak ditemukan" });
    }
    res.status(404).json({ error: "NIK search not implemented" });
  } else {
    res.status(400).json({ error: "Invalid search type" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
