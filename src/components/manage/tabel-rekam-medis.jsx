import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import PropTypes from "prop-types";
>>>>>>> f30e9cee008cc5e0a50f4e4bcfedabb54b64a120

export default function TabelRekamMedis({ table_head, table_row }) {
  TabelRekamMedis.propTypes = {
    table_head: PropTypes.arrayOf(PropTypes.string).isRequired,
    table_row: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  return (
    <div>
      <Card className="h-full w-full overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {table_head.map((head) => (
                <th key={head} className=" bg-primary-500 p-4">
                  <Typography
                    variant="large"
                    color="white"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table_row.map(
              ({
                nrp,
                nama,
                pangkat,
                satuan_kerja,
                tanggal,
                keterangan,
                pdf_url,
              }) => {
                const classes = "p-4";

                return (
                  <tr key={nrp} className="even:bg-primary-300">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nrp}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pangkat}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {satuan_kerja}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {tanggal}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {keterangan}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href={pdf_url}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pdf_url}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`manage/detail/${nrp}`}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Detail
                        </Typography>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
