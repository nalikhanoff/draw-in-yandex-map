import { useRef, useState } from "react";
import { Workbook } from "@fortune-sheet/react";
import LuckyExcel from "luckyexcel";
import "@fortune-sheet/react/dist/index.css";

export default function FortuneSheetPage() {
  const [spreadSheetState, setSpreadSheetState] = useState([{ name: "Sheet1" }]);
  const handleUploadFile = (e) => {
    if (e.target.files.length) {
      setSpreadSheetState([]);
      LuckyExcel.transformExcelToLucky(e.target.files[0], (excelFile, json) => {
        setSpreadSheetState(excelFile.sheets);
      });
    }
  };

  const handleChange = useRef((changedData) => {
    if (!Array.isArray(changedData)) return;

    setSpreadSheetState(changedData.map((sheet) => {
      return {
        ...sheet,
        ...(sheet?.data?.length && {
          celldata: sheet.data.reduce((acc, row, r) => {
            const cols = row.reduce((accum, v, c) => {
              if (!v) return accum;
              return [...accum, { r, c, v } ];
            }, []);
            return [...acc, ...cols];
          }, []),
          data: undefined,
        }),
      };
    }));
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <input type="file" onChange={handleUploadFile} />
      {!!spreadSheetState?.length && (
        <Workbook data={spreadSheetState} onChange={handleChange.current} />
      )}
    </div>
  );
}
