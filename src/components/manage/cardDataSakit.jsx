import PropTypes from "prop-types";

export default function CardDataSakit({
  createdAt,
  jenispenyakit,
  jenisperawatan,
  sumberbiaya,
  awalsakit,
  lamacuti,
  WFH,
  keterangan,
}) {
  const classes = "px-2 py-1";

  const formattedCreatedAt = new Date(createdAt).toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
  });

  const formattedAwalsakit = new Date(awalsakit).toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <table>
      <tbody>
        <tr>
          <td className={classes}>Tanggal</td>
          <td className={classes}> : </td>
          <td className={classes}>{formattedCreatedAt}</td>
        </tr>
        <tr>
          <td className={classes}>Jenis Sakit</td>
          <td className={classes}> : </td>
          <td className={classes}>{jenispenyakit}</td>
        </tr>
        <tr>
          <td className={classes}>Jenis Perawatan</td>
          <td className={classes}> : </td>
          <td className={classes}>{jenisperawatan}</td>
        </tr>
        <tr>
          <td className={classes}>Sumber Biaya</td>
          <td className={classes}> : </td>
          <td className={classes}>{sumberbiaya}</td>
        </tr>
        <tr>
          <td className={classes}>Awal Sakit</td>
          <td className={classes}> : </td>
          <td className={classes}>{formattedAwalsakit}</td>
        </tr>
        <tr>
          <td className={classes}>Lama Cuti</td>
          <td className={classes}> : </td>
          <td className={classes}>{lamacuti}</td>
        </tr>
        <tr>
          <td className={classes}>WFH</td>
          <td className={classes}> : </td>
          <td className={classes}>{WFH}</td>
        </tr>
        <tr>
          <td className={classes}>Keterangan</td>
          <td className={classes}> : </td>
          <td className={classes}>{keterangan}</td>
        </tr>
      </tbody>
    </table>
  );
}

CardDataSakit.propTypes = {
  createdAt: PropTypes.string.isRequired,
  jenispenyakit: PropTypes.string,
  jenisperawatan: PropTypes.string,
  sumberbiaya: PropTypes.string,
  awalsakit: PropTypes.string,
  lamacuti: PropTypes.number,
  WFH: PropTypes.string,
  keterangan: PropTypes.string,
};
