"use client";

import React, { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function AgGrid() {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    editable: true,
    resizable: true,
    filter: "agTextColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      closeOnApply: true,
      suppressAndOrCondition: true,
    },
  }));
  console.log(rowData);
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        id="staff_grid"
        rowData={rowData}
        columnDefs={columnDefs}
        rowModelType="clientSide"
        defaultColDef={defaultColDef}
        style={{ height: "100%", width: "100%" }}
        animateRows
        suppressRowTransform
        onCellValueChanged={e => console.dir(e)}
      />
    </div>
  );
}
