import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";

export default function TabelHomeVisit({ table_head, table_row }) {
  TabelHomeVisit.propTypes = {
    table_head: PropTypes.arrayOf(PropTypes.string).isRequired,
    table_row: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMM yyyy HH:mm:ss");
  };

  return (
    <div>
      <Card className="h-full w-full overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {table_head.map((head) => (
                <th key={head} className="bg-primary-500 p-4">
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
                pegawai: { nrp, namapegawai, pangkat, satuankerja },
                createdAt,
                keluhan,
                pemeriksaanfisik,
                diagnosa,
                terapi,
                saranmedis,
                fotodokumentasi,
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
                        {namapegawai}
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
                        {satuankerja}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(createdAt)}
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
                        {pemeriksaanfisik}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {diagnosa}
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
                        {saranmedis}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {fotodokumentasi && (
                        <a
                          href={fotodokumentasi}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            Lihat Foto
                          </Typography>
                        </a>
                      )}
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
