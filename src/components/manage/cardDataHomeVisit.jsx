import React from "react";

export default function CardDataHomeVisit({tanggal, keluhan, pemeriksaan_fisik, diagnosis, terapi, saran_medis}){
  const classes = "px-2 py-1";

    return (
         <table>
              <tr>
                <td className={classes}>Tanggal</td>
                <td className={classes}> : </td>
                <td className={classes}> {tanggal}</td>
              </tr>
              <tr>
                <td className={classes}>Keluhan</td>
                <td className={classes}> : </td>
                <td className={classes}>{keluhan}</td>
              </tr>
              <tr>
                <td className={classes}>Hasil Pemeriksaan Fisik</td>
                <td className={classes}> : </td>
                <td className={classes}>{pemeriksaan_fisik}</td>
              </tr>
              <tr>
                <td className={classes}>Hasil Diagnosis</td>
                <td className={classes}> : </td>
                <td className={classes}>{diagnosis}</td>
              </tr>
              <tr>
                <td className={classes}>Terapi yang Diberikan</td>
                <td className={classes}> : </td>
                <td className={classes}>{terapi}</td>
              </tr>
              <tr>
                <td className={classes}>Saran Medis</td>
                <td className={classes}> : </td>
                <td className={classes}>{saran_medis}</td>
              </tr>
            </table>
    );
}