import { useEffect, useState } from "react";
import axios from '../../../axios'
import {backend} from '../../../config'

import "./AdminEntityDetails.css";
import SimpleLineChart from "../LineGraph"; // Reuse the line chart component

import { occupancy_data } from "../data/data";
import SimpleBarChart from "../SimpleBarChart";

export default function AdminEntityDetails() {
  const [tableData, setTableData] = useState([]);
  const [sortDir, setSortDir] = useState({ key: null, direction: "aesc" });
  const [activeTab, setActiveTab] = useState("table");
  const [fetchedData, setFetchedData] = useState([]);
  

  useEffect(() => {
        axios.get(backend.url+"admin/users-list")
        .then((res)=>{
          console.log(res.data);
          setFetchedData(res.data);
          setTableData(res.data.map((data) => ({ ...data, isActive: true })));
        })
        .catch((e)=>{alert(e)});
  }, []);

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

  const toggleStatus = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:9443/admin/update-status/${userId}`).catch((e)=>alert(e));
      
      if (response.status === 200) {
        const newData = tableData.map((row)=>{
          if(row.id === userId) {
            row.isActive = response.data;
            return row;
          }
          else return row;
        })
        setTableData(newData);
      } else {
        alert("Failed to update the status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("There was an error updating the status. Please try again.");
    }
  };

  // Data transformation for charts
  const chartData = fetchedData.map((item) => ({
    name: item.data_name,
    occupancy: item.data_size,
  }));


  return (
    <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <button
            className={`btn me-2 ${
              activeTab === "table" ? "btn-success text-white" : "btn-primary"
            }`}
            onClick={() => setActiveTab("table")}
          >
            Table View
          </button>
          <button
            className={`btn me-2 ${
              activeTab === "lineChart"
                ? "btn-success text-white"
                : "btn-primary"
            }`}
            onClick={() => setActiveTab("lineChart")}
          >
            Line Chart
          </button>
          <button
            className={`btn me-2 ${
              activeTab === "barChart"
                ? "btn-success text-white"
                : "btn-primary"
            }`}
            onClick={() => setActiveTab("barChart")}
          >
            Bar Chart
          </button>
          <button
            className={`btn me-2 ${
              activeTab === "summary" ? "btn-success text-white" : "btn-primary"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
        </div>
      </nav>

      {/* Conditional Rendering */}
      <div className="container-fluid">
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, id) => {
                  const keys = Object.keys(row);
                  return (
                    <tr key={id}
                      title="Click to Edit Record ▞"
                      className="align-middle"
                    >
                      {keys.map((fetchedData) => {
                        if (Array.isArray(row[fetchedData]))
                          return (
                            <td key={fetchedData}>
                              <ul className="mb-0">
                                {row[fetchedData].map((inner, idx) => (
                                  <li key={idx}>{inner}</li>
                                ))}
                              </ul>
                            </td>
                          );
                        else if (typeof row[fetchedData] === "object")
                          return (
                            <td key={fetchedData}>
                              <ul className="mb-0">
                                {Object.entries(row[fetchedData]).map(
                                  (entry, idx) => (
                                    <li key={idx}>{entry.toString()}</li>
                                  )
                                )}
                              </ul>
                            </td>
                          );
                        else return <td key={fetchedData}>{row[fetchedData]}</td>;
                      })}
                      {/* Status Column */}
                      <td>
                        <span
                          className={`badge ${
                            row.isActive ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {row.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        <button
                          className={`btn ${row.isActive ? 'btn-danger' : 'btn-success'}`}
                          onClick={() => toggleStatus(row.id)}
                          style={{ width: "100%" }}
                        >
                          {row.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
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
            <p>Total Parking datas: {fetchedData.length}</p>
            <p>
              Average data Size:{" "}
              {Math.round(
                fetchedData.reduce((acc, data) => acc + data.data_size, 0) /
                  fetchedData.length
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
