import PropTypes from "prop-types";

export default function CardDataHomeVisit({
  createdAt,
  keluhan,
  pemeriksaanfisik,
  diagnosa,
  terapi,
  saranmedis,
  fotodokumentasi,
}) {
  CardDataHomeVisit.propTypes = {
    createdAt: PropTypes.string.isRequired,
    keluhan: PropTypes.string,
    pemeriksaanfisik: PropTypes.string,
    diagnosa: PropTypes.string,
    terapi: PropTypes.string,
    saranmedis: PropTypes.string,
    fotodokumentasi: PropTypes.string,
  };
  const classes = "px-2 py-1";

  return (
    <table>
      <tr>
        <td className={classes}>Tanggal</td>
        <td className={classes}> : </td>
        <td className={classes}> {createdAt}</td>
      </tr>
      <tr>
        <td className={classes}>Keluhan</td>
        <td className={classes}> : </td>
        <td className={classes}>{keluhan}</td>
      </tr>
      <tr>
        <td className={classes}>Hasil Pemeriksaan Fisik</td>
        <td className={classes}> : </td>
        <td className={classes}>{pemeriksaanfisik}</td>
      </tr>
      <tr>
        <td className={classes}>Hasil Diagnosa</td>
        <td className={classes}> : </td>
        <td className={classes}>{diagnosa}</td>
      </tr>
      <tr>
        <td className={classes}>Terapi yang Diberikan</td>
        <td className={classes}> : </td>
        <td className={classes}>{terapi}</td>
      </tr>
      <tr>
        <td className={classes}>Saran Medis</td>
        <td className={classes}> : </td>
        <td className={classes}>{saranmedis}</td>
      </tr>
      <tr>
        <td className={classes}>Dokumentasi</td>
        <td className={classes}> : </td>
        <td className={classes}>
          {fotodokumentasi && (
            <img
              src={`${fotodokumentasi}`}
              target="_blank"
              rel="noopener noreferrer"
              alt="Dokumentasi"
              width="100"
              height="100"
            />
          )}
        </td>
      </tr>
    </table>
  );
}
