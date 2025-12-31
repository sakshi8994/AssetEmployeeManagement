import React, { useEffect, useState } from 'react'
import { searchHistory } from '../../apis/historyApi';

function HistoryList() {
  const [history , setHistory]=useState([]);
  const [page , setPage] = useState(0);

 useEffect(()=>{ 
    loadHistory();
 },[page])

  const loadHistory = async()=>{
    try{
          const res =  await searchHistory({page, size:10});
          setHistory(res.data.content);
          console.log("History : ", res.data.content);

    }catch(err){
        alert(err.response.message);
    }
   

  }

  const formatDateTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
};


  return (
    <div>
      <h3>Asset History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>History Id </th>
           
            <th>Asset Tag  </th>
           
            <th>Employee Id  </th>
           <th>Employee Name  </th>
            <th>action  </th>
            <th>Time stamp </th>
          </tr>
        </thead>
        <tbody>
          {history.map(h => (
            <tr key={h.historyId}>
               <td>{h.historyId}</td>
              <td>{h.assetTag}</td>
              <td>{h.employeeId}</td>
              <td>{h.employeeName}</td>
              <td>{h.action}</td>
              <td>{formatDateTime(h.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage(p => p - 1)} disabled={page === 0}>
        Prev
      </button>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  )
}

export default HistoryList