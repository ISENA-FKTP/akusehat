import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'tailwindcss/tailwind.css';

const data = [
  {
    "bpjs": "123456789",
    "Nama": "John Doe",
    "statuspeserta": "Aktif",
    "tanggal": "2024-06-25",
    "jeniskelamin": "Laki-laki",
    "pkk": "1234",
    "nohp": "081234567890",
    "rkmmedis": "RM123456"
  },
  {
    "bpjs": "987654321",
    "Nama": "Jane Smith",
    "statuspeserta": "Non-Aktif",
    "tanggal": "2024-06-26",
    "jeniskelamin": "Perempuan",
    "pkk": "2345",
    "nohp": "089876543210",
    "rkmmedis": "RM654321"
  },
  {
    "bpjs": "456123789",
    "Nama": "Alice Johnson",
    "statuspeserta": "Aktif",
    "tanggal": "2024-06-27",
    "jeniskelamin": "Perempuan",
    "pkk": "3456",
    "nohp": "082345678901",
    "rkmmedis": "RM789456"
  },
  {
    "bpjs": "321654987",
    "Nama": "Bob Brown",
    "statuspeserta": "Non-Aktif",
    "tanggal": "2024-06-28",
    "jeniskelamin": "Laki-laki",
    "pkk": "4567",
    "nohp": "087654321098",
    "rkmmedis": "RM321654"
  },
  {
    "bpjs": "654789123",
    "Nama": "Charlie Davis",
    "statuspeserta": "Aktif",
    "tanggal": "2024-06-29",
    "jeniskelamin": "Laki-laki",
    "pkk": "5678",
    "nohp": "083456789012",
    "rkmmedis": "RM654789"
  },
  {
    "bpjs": "789123456",
    "Nama": "David Wilson",
    "statuspeserta": "Non-Aktif",
    "tanggal": "2024-06-30",
    "jeniskelamin": "Laki-laki",
    "pkk": "6789",
    "nohp": "085678901234",
    "rkmmedis": "RM987654"
  },
  {
    "bpjs": "147258369",
    "Nama": "Emma Clark",
    "statuspeserta": "Aktif",
    "tanggal": "2024-07-01",
    "jeniskelamin": "Perempuan",
    "pkk": "7890",
    "nohp": "086789012345",
    "rkmmedis": "RM147258"
  },
  {
    "bpjs": "258369147",
    "Nama": "Frank Miller",
    "statuspeserta": "Non-Aktif",
    "tanggal": "2024-07-02",
    "jeniskelamin": "Laki-laki",
    "pkk": "8901",
    "nohp": "084567890123",
    "rkmmedis": "RM258369"
  }
];

export default function PrintPDF() {
  const printPDF = () => {
    const input = document.getElementById('pdf-content');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('report.pdf');
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="pdf-content" className="bg-white p-8">
        <h1 className="text-3xl font-bold mb-4">Medical Records</h1>
        {data.map((record, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">BPJS: {record.bpjs}</p>
            <p>Nama: {record.Nama}</p>
            <p>Status Peserta: {record.statuspeserta}</p>
            <p>Tanggal: {record.tanggal}</p>
            <p>Jenis Kelamin: {record.jeniskelamin}</p>
            <p>PKK: {record.pkk}</p>
            <p>No HP: {record.nohp}</p>
            <p>RKM Medis: {record.rkmmedis}</p>
            <hr className="my-2" />
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={printPDF}
        >
          Print PDF
        </button>
      </div>
    </div>
  );
}

