import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

export const exportHistoryToExcel =(rows,fileName="asset_history")=>{
    if(!rows || rows.length===0) return;

    const formattedData = rows.map((row)=>({

        "History ID " : row.historyId,
        "Asset Tag ":row.assetTag,
        "Employee ID":row.employeeId??"-",
        "Employee Name":row.employeeName??"-",
        Action:row.action,
        "Time Stamp" : row.timestamp
          ?dayjs(row.timestamp).format("DD-MMM-YYYY hh:mm A")
          :"",

    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook,worksheet,"Asset History");

    const excelBuffer = XLSX.write(workbook,{
        bookType:"xlsx",
        type:"array",
    })

    const file = new Blob([excelBuffer],{
        type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

      saveAs(file, `${fileName}.xlsx`);


}