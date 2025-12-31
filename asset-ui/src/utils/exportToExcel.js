import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (rows, fileName = "assets") => {
  const formattedData = rows.map((row) => ({
    "Asset Tag": row.assetTag,
    Brand: row.brand,
    Model: row.model,
    Category: row.category?.name ?? "",
    Status: row.status,
    "Assigned To": row.assignedTo?.name ?? "Unassigned",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `${fileName}.xlsx`);
};
