"use client";

import React, { useState, useMemo, useRef } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function AgGrid() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);
  const fields = useRef([
    {
      label: "Номер ОВ",
      key: "number",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Цвет модуля",
      key: "moduleColor",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Цвет ОВ",
      key: "obColor",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Примечание",
      key: "Comment",
      fieldType: {
        type: "input",
      },
      validations: [
        {
          rule: 'regex',
          value: '^[0-9]+$',
          errorMessage: 'only numbers allowed',
          level: 'error',
        },
      ],
    },
    {
      label: "Порт на полке",
      key: "port",
      fieldType: {
        type: "input",
      },
    },
  ]);

  const columns = [
    {
      headerName: "Номер ОВ",
      field: "number",
    },
    {
      headerName: "Цвет модуля",
      field: "moduleColor",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Синий", "Красный", "Желтый"],
      },
      cellClassRules: {
        'bg-primary text-white': (params) => params.value === 'Синий',
        'bg-danger': (params) => params.value === 'Красный',
        'bg-warning': (params) => params.value === 'Желтый',
      },
      filter: true,
    },
    {
      headerName: "Цвет ОВ",
      field: "obColor",
    },
    {
      headerName: "Примечание",
      field: "Comment",
    },
    {
      headerName: "Порт на полке",
      field: "port",
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 130,
      editable: true,
      resizable: true,
      sortable: true,
    };
  }, []);
  return (
    <>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data, files) => {
          setData(data.validData);
        }}
        fields={fields.current}
        translations={{
          uploadStep: {
            title: "Загрузить файл",
            manifestTitle: "Данные которые мы ожидаем:",
            manifestDescription:
              "(Ты можешь удалить или переименовать колонны в след. шаге)",
            dropzone: {
              title: "Можно загрузить .xlsx, .xls или .csv файлы",
              activeDropzoneTitle: "Перетащите файл сюда...",
              buttonTitle: "Выбрать файл",
            },
          },
        }}
      />
      <div className="ag-theme-alpine w-100 h-100">
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columns}
          rowData={data}
          domLayout="autoHeight"
          onCellValueChanged={(params) => console.log(params)}
          onRowSelected={(event) => console.log(event.node.data)}
        />
      </div>
    </>
  );
}
