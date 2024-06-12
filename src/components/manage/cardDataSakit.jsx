import React from "react";

export default function CardDataSakit({tanggal, jenis_sakit, jenis_perawatan, sumber_biaya, awal_sakit, lama_cuti, WFH, Keterangan}){
  const classes = "px-2 py-1";

    return (
         <table>
              <tr>
                <td className={classes}>Tanggal</td>
                <td className={classes}> : </td>
                <td className={classes}> {tanggal}</td>
              </tr>
              <tr>
                <td className={classes}>Jenis Sakit</td>
                <td className={classes}> : </td>
                <td className={classes}>{jenis_sakit}</td>
              </tr>
              <tr>
                <td className={classes}>Jenis Perawatan</td>
                <td className={classes}> : </td>
                <td className={classes}>{jenis_perawatan}</td>
              </tr>
              <tr>
                <td className={classes}>Sumber Biaya</td>
                <td className={classes}> : </td>
                <td className={classes}>{sumber_biaya}</td>
              </tr>
              <tr>
                <td className={classes}>Awal Sakit</td>
                <td className={classes}> : </td>
                <td className={classes}>{awal_sakit}</td>
              </tr>
              <tr>
                <td className={classes}>Lama Cuti</td>
                <td className={classes}> : </td>
                <td className={classes}>{lama_cuti}</td>
              </tr>
              <tr>
                <td className={classes}>WFH</td>
                <td className={classes}> : </td>
                <td className={classes}>{WFH}</td>
              </tr>
              <tr>
                <td className={classes}>Keterangan</td>
                <td className={classes}> : </td>
                <td className={classes}>{Keterangan}</td>
              </tr>
            </table>
    );
}