import { useEffect, useState } from "react";

import "./AdminEntityDetails.css";
import SimpleLineChart from "../../components/LineGraph"; // Reuse the line chart component

import { lot_data, occupancy_data } from "../../data/data";
import SimpleBarChart from "../../components/SimpleBarChart";

export default function AdminEntityDetails() {
  const [tableData, setTableData] = useState([]);
  const [sortDir, setSortDir] = useState({ key: null, direction: "aesc" });
  const [activeTab, setActiveTab] = useState("table"); // New state for active tab

  const sortData = (key) => {
    let direction = "aesc";
    if (sortDir.key === key && sortDir.direction === "aesc") {
      direction = "desc";
    }
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "aesc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "aesc" ? 1 : -1;
      return 0;
    });
    setSortDir({ key, direction });
    setTableData(sortedData);
  };

  useEffect(() => {
    setTableData(lot_data);
  }, []);

  // Data transformation for charts
  const chartData = lot_data.map((item) => ({
    name: item.lot_name,
    occupancy: item.lot_size,
  }));

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <button
            className="btn btn-primary me-2"
            onClick={() => setActiveTab("table")}
          >
            Table View
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setActiveTab("lineChart")}
          >
            Line Chart
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setActiveTab("barChart")}
          >
            Bar Chart
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
        </div>
      </nav>

      {/* Conditional Rendering */}
      <div>
        {activeTab === "table" && (
          <div className="table-responsive entity-table">
            <table className="table table-bordered table-hover shadow text-center">
              <thead className="table-primary">
                <tr>
                  {Object.keys(tableData[0] || {}).map((key) => (
                    <th key={key}>
                      {key}&nbsp;
                      <button
                        className="btn btn-muted btn-outline-info text-info-emphasis btn-sm"
                        onClick={() => sortData(key)}
                      >
                        ⇅
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => {
                  const keys = Object.keys(row);
                  return (
                    <tr
                      key={row.lot_id}
                      title="Click to Edit Record ▞"
                      className="align-middle"
                    >
                      {keys.map((lot_data) => {
                        if (Array.isArray(row[lot_data]))
                          return (
                            <td key={lot_data}>
                              <ul className="mb-0">
                                {row[lot_data].map((inner, idx) => (
                                  <li key={idx}>{inner}</li>
                                ))}
                              </ul>
                            </td>
                          );
                        else if (typeof row[lot_data] === "object")
                          return (
                            <td key={lot_data}>
                              <ul className="mb-0">
                                {Object.entries(row[lot_data]).map(
                                  (entry, idx) => (
                                    <li key={idx}>{entry.toString()}</li>
                                  )
                                )}
                              </ul>
                            </td>
                          );
                        else return <td key={lot_data}>{row[lot_data]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "lineChart" && <SimpleLineChart data={chartData} />}

        {activeTab === "barChart" && <SimpleBarChart data={occupancy_data} />}

        {activeTab === "summary" && (
          <div className="card shadow p-4">
            <h4>Summary</h4>
            <p>Total Parking Lots: {lot_data.length}</p>
            <p>
              Average Lot Size:{" "}
              {Math.round(
                lot_data.reduce((acc, lot) => acc + lot.lot_size, 0) /
                  lot_data.length
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
