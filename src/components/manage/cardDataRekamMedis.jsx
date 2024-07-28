import PropTypes from "prop-types";

export default function CardDataRekamMedis({
  createdAt,
  filerekammedis,
  keterangan,
}) {
  CardDataRekamMedis.propTypes = {
    createdAt: PropTypes.string.isRequired,
    keterangan: PropTypes.string.isRequired,
    filerekammedis: PropTypes.string.isRequired,
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
        <td className={classes}>Keterangan</td>
        <td className={classes}> : </td>
        <td className={classes}>{keterangan}</td>
      </tr>
      <tr>
        <td className={classes}>Link Dokumen</td>
        <td className={classes}> : </td>
        <td className={classes}>
          {filerekammedis && (
            <a
              href={`${filerekammedis}`}
              alt="Dokumentasi"
              width="100"
              height="100"
              target="_blank"
              rel="noopener noreferrer"
              className="font-primary text-primary-600 underline"
            >
              Lihat Dokumen
            </a>
          )}
        </td>
      </tr>
    </table>
  );
}
