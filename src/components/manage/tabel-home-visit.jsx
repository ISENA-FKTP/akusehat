import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function TabelHoemVisit({ table_head, table_row }) {
  TabelHoemVisit.propTypes = {
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
                keluhan,
                pemeriksaan_fisik,
                diagnosis,
                terapi,
                saran_medis,
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
                        {keluhan}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pemeriksaan_fisik}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {diagnosis}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {terapi}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {saran_medis}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/detail/${nrp}`}>
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
