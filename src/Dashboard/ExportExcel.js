import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Tooltip } from "@material-ui/core";
import Button from "@mui/material/Button";
import excelicon from '../Dashboard/excel.png'

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = ".xlsx";

  function flattenObjects(data) {
    return data.map((obj) => {
      if (obj.Data) {
        const { Data, ...rest } = obj;
        return { ...rest, ...Data };
      } 
      else if (obj.Action) {
        const { Action, ...rest } = obj;
        return { ...rest, ...Action };
      } else {
        return obj;
      }
    });
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(flattenObjects(excelData));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <Tooltip title="Export Excel">
        <div>
            <img
            src={excelicon}
            alt="Description of the Excel icon"
            onClick={exportToExcel}
            style={{ cursor: "pointer", fontSize: 14, float: 'right', width:40, height:40 }}
            />
        </div>
        </Tooltip>
      <br />
    </>
  );
};

export default ExportExcel;