import React from "react";
import ReactTable from "react-data-table";

export default function Tabel({ data, columns, pageSize }) {
  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        pageSize={pageSize}
        className="-striped"
      />
    </div>
  );
}
