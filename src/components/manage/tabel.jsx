import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Tabel({ table_head, table_row }) {
  return (
    <div>
      <Card className="h-full w-full overflow-auto">
        <table className="w-full min-w-max table-auto text-left ">
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
                jenis_sakit,
                jenis_perawatan,
                sumber_biaya,
                awal_sakit,
                lama_cuti,
                wfh,
                keterangan,
              }) => {
                const classes = "p-4";

                return (
                  <tr key={nrp} className="even:bg-primary-200">
                    <td className={classes}imp>
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
                        {jenis_sakit}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {jenis_perawatan}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {sumber_biaya}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {awal_sakit}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lama_cuti}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {wfh}
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
                      <Link to={`/manage/detail/${nrp}`}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium">
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
