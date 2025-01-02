import "./Admin.css";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FetchRole from "../../components/fetchrole";

export default function Admin() {
	const role = FetchRole().role;

	const [records, setRecords] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 7;
	const [error, setError] = useState(null);
	const [username, setUsername] = useState("");
	const [file, setFile] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:5001/api/fetch/review",
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				if (!data || data.length === 0) {
					throw new Error("No Reviews is pending ...");
				}

				setRecords(data);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error.message);
			}
		};

		fetchData();
	}, []);

	if (!(role === "admin")) {
		// Pagination logic
		const indexOfLastRecord = currentPage * recordsPerPage;
		const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
		const currentRecords = records.slice(
			indexOfFirstRecord,
			indexOfLastRecord,
		);

		const totalPages = Math.ceil(records.length / recordsPerPage);

		const handleNextPage = () => {
			if (currentPage < totalPages) setCurrentPage(currentPage + 1);
		};

		const handlePreviousPage = () => {
			if (currentPage > 1) setCurrentPage(currentPage - 1);
		};

		// Handle accept action
		const handleAccept = async (Id, Status) => {
			try {
				// Delete API
				const deleteResponse = await fetch(
					`http://localhost:5001/api/delete/review/${Id}`,
					{
						method: "DELETE",
					},
				);

				if (!deleteResponse.ok) {
					throw new Error(`Failed to delete record with id ${Id}`);
				}

				// Update Status API
				const statusResponse = await fetch(
					"http://localhost:5001/api/update/status",
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ Id, Status: Status }),
					},
				);

				if (!statusResponse.ok) {
					throw new Error(
						`Failed to update status for record with id ${Id}`,
					);
				}

				alert(`Record with ID ${Id} has been updated.`);
				setRecords((prevRecords) =>
					prevRecords.filter((record) => record.Id !== Id),
				);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		// Handle reject action
		const handleReject = async (Id) => {
			try {
				const deleteResponse = await fetch(
					`http://localhost:5001/api/delete/review/${Id}`,
					{
						method: "DELETE",
					},
				);

				if (!deleteResponse.ok) {
					throw new Error(`Failed to delete record with id ${Id}`);
				}

				alert(`Record with ID ${Id} has been rejected.`);
				setRecords((prevRecords) =>
					prevRecords.filter((record) => record.Id !== Id),
				);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		// Upload funtionality

		const handleFileChange = (event) => {
			setFile(event.target.files[0]);
		};

		const handleFileUpload = async () => {
			if (!file) {
				alert("Please select a file to upload.");
				return;
			}

			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await fetch(
					"http://localhost:5001/api/upload",
					{
						method: "POST",
						body: formData,
					},
				);

				if (!response.ok) {
					throw new Error(
						`Failed to upload file: ${response.statusText}`,
					);
				}

				alert("File uploaded successfully!");
			} catch (error) {
				console.error("Error uploading file:", error);
				alert("Error uploading file. Please try again.");
			}
		};

		const handleAddUser = async () => {
			if (!username) {
				alert("Please enter a username.");
				return;
			}

			try {
				const response = await fetch(
					"http://localhost:5001/api/add/user",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username }),
					},
				);

				if (!response.ok) {
					throw new Error(
						`Failed to add user: ${response.statusText}`,
					);
				}

				alert("User added successfully!");
				setUsername("");
			} catch (error) {
				console.error("Error adding user:", error);
				alert("Error adding user. Please try again.");
			}
		};

		const handleRemoveUser = async () => {
			if (!username) {
				alert("Please enter a username.");
				return;
			}

			try {
				const response = await fetch(
					`http://localhost:5001/api/delete/user/${username}`,
					{
						method: "DELETE",
					},
				);

				if (!response.ok) {
					throw new Error(
						`Failed to remove user: ${response.statusText}`,
					);
				}

				alert("User removed successfully!");
				setUsername("");
			} catch (error) {
				console.error("Error removing user:", error);
				alert("Error removing user. Please try again.");
			}
		};

		return (
			<>
				<Helmet>
					<title>Admin - Innovation Center</title>
				</Helmet>
				<div className="ad-body">
					<Sidebar />
					<div className="ad-container">
						<Header />
						<div className="ad-content">
							<div className="ad-card ad-card-1">
								<img src={icons.icon13} alt="icon" />
								<h2>Sync</h2>
								<input
									type="file"
									accept=".xlsx"
									onChange={handleFileChange}
								/>
								<button
									className="ad-button-blue"
									type="button"
									onClick={handleFileUpload}
								>
									Upload
								</button>
							</div>
							<div className="ad-card ad-card-2">
								<img src={icons.icon14} alt="icon" />
								<h2>Add staff</h2>
								<input
									type="text"
									placeholder="User Name"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
								<div className="ad-content-card-box-3">
									<button
										className="ad-button-blue"
										type="button"
										onClick={handleAddUser}
									>
										Add
									</button>
									<button
										className="ad-button-red"
										type="button"
										onClick={handleRemoveUser}
									>
										Remove
									</button>
								</div>
							</div>
							<div className="ad-card ad-card-3">
								<img src={icons.icon15} alt="icon" />
								<h2>Excel</h2>
								<p>To Download the excel up-to-date</p>
								<button
									className="ad-button-blue"
									type="button"
									onClick={async () => {
										try {
											const response = await fetch(
												"http://localhost:5001/api/download",
											);
											if (!response.ok) {
												throw new Error(
													`Failed to download file: ${response.statusText}`,
												);
											}
											const blob = await response.blob();
											const url =
												window.URL.createObjectURL(
													blob,
												);
											const a =
												document.createElement("a");
											a.href = url;
											a.download = "file.xlsx";
											document.body.appendChild(a);
											a.click();
											a.remove();
										} catch (error) {
											console.error(
												"Error downloading file:",
												error,
											);
											alert(
												"Error downloading file. Please try again.",
											);
										}
									}}
								>
									Download
								</button>
							</div>
							<div className="ad-card-4">
								<div className="ad-card-4-box1">
									<img src={icons.icon16} alt="icon" />
									<h2>Review</h2>
								</div>
								<div className="ad-card-4-box2">
									{error ? (
										<div className="error-message">
											{error}
										</div>
									) : (
										<table>
											<thead>
												<tr>
													<th>Idea ID</th>
													<th>Emp ID</th>
													<th>Date</th>
													<th>Status</th>
													<th>Decision</th>
												</tr>
											</thead>
											<tbody>
												{currentRecords.length > 0 ? (
													currentRecords.map(
														(record) => (
															<tr key={record.Id}>
																<td>
																	{record.Id}
																</td>
																<td>
																	{
																		record.Emp_Id
																	}
																</td>
																<td>
																	{
																		record.Date
																	}
																</td>
																<td>
																	{
																		record.Status
																	}
																</td>
																<td>
																	<button
																		type="button"
																		onClick={() =>
																			handleAccept(
																				record.Id,
																				record.Status,
																			)
																		}
																	>
																		✔
																	</button>
																	<button
																		type="button"
																		onClick={() =>
																			handleReject(
																				record.Id,
																			)
																		}
																	>
																		✘
																	</button>
																</td>
															</tr>
														),
													)
												) : (
													<tr>
														<td colSpan="5">
															No records found
														</td>
													</tr>
												)}
											</tbody>
										</table>
									)}
									<div className="pagination">
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
											disabled={
												currentPage === totalPages
											}
											className="pagination-button"
										>
											Next
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="ad-forbiddenaccess">
					<h1>Forbidden Access</h1>
					<p>You do not have permission to access this page.</p>
					<button
						type="button"
						onClick={() => {
							window.location.href = "/";
						}}
					>
						Home
					</button>
				</div>
			</>
		);
	}
}
