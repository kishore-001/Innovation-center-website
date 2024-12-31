import "./ideas.css";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function IdeaPrev() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const [error, setError] = useState(null);
  const [updatedRecords, setUpdatedRecords] = useState([]);
  const [modifiedRecords, setModifiedRecords] = useState({});

  // Fetching the xlsx data from the API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/fetch/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const hello = await response.json();

        if (hello.length === 0) {
          throw new Error("No data found in the API response.");
        }

        setRecords(hello.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp));
    return date.toISOString().slice(0, 10); // Formats the timestamp to a readable date
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  // Status Handle

  useEffect(() => {
    setUpdatedRecords(records);
  }, [records]);

  const handleStatusChange = (index, newStatus) => {
    const newRecords = [...updatedRecords];
    if (newRecords[index]) {
      newRecords[index]["Status"] = newStatus;
      setUpdatedRecords(newRecords);
      setModifiedRecords({
        ...modifiedRecords,
        [index]: newRecords[index]
      });
    }
  };

  const handleSave = async () => {
    const recordsToUpdate = Object.values(modifiedRecords).map(record => ({
      Id: record["ID"],
      Emp_Id: record["Employee ID"],
      Date: formatDate(record["Start time"]),
      Status: record["Status"],
    }));
    try {
      const response = await axios.put('http://localhost:5001/api/update/review', recordsToUpdate);
      if (response.status === 200) {
        alert('Status updated successfully');
        setModifiedRecords({});
        window.location.reload();
      } else {
        alert('Failed to update status');
      }
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
      window.location.reload();
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Innovation Center</title>
      </Helmet>
      <div className="id-body">
        <Sidebar />
        <div className="id-container">
          <Header />
          <div className="id-content-1">
            {error ? (
              <div>Error: {error}</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Idea ID</th>
                    <th>Emp ID</th>
                    <th>Start Time</th>
                    <th>Name</th>
                    <th>Idea</th>
                    <th>Dept</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record["ID"]}</td>
                        <td>{record["Employee ID"]}</td>
                        <td>{formatDate(record["Start time"])}</td>
                        <td>{record["Please Enter your Name"] || "N/A"}</td>
                        <td>
                          {record[
                            "What is your Innovative idea which you propose for the mentioned concern? ( நீங்கள் குறிப்பிட்டுள்ள  பிரச்சனையை சரிசெய்ய உங்களின் புதுமையான யோசனை என்ன?"
                          ] || "N/A"}
                        </td>
                        <td>{record["Department ( நீங்கள் வேலை செய்யும் துறை )"] || "N/A"}</td>
                        <td>
                  <select
                    defaultValue={record["Status"] || "Pending"}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="L4">L4</option>
                    <option value="L5">L5</option>
                  </select>
                </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="id-content-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
            <button id="id-save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
