import { Link } from "react-router-dom";

export default function CardDataRekamMedis({ tanggal, keterangan, pdf_url }) {
  const classes = "px-2 py-1";

  return (
    <table>
      <tr>
        <td className={classes}>Tanggal</td>
        <td className={classes}> : </td>
        <td className={classes}> {tanggal}</td>
      </tr>
      <tr>
        <td className={classes}>keterangan</td>
        <td className={classes}> : </td>
        <td className={classes}>{keterangan}</td>
      </tr>
      <tr>
        <td className={classes}>Link dokumen</td>
        <td className={classes}> : </td>
        <td className={classes}>
          <Link to={pdf_url}>{pdf_url}</Link>
        </td>
      </tr>
    </table>
  );
}
