import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

function Dashboard() {
    const router = useRouter();
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [approve, setApprove] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/clients')
            .then((response) => {
                if (response.data.success && Array.isArray(response.data.clients)) {
                    const data = response.data.clients;
                    const mappedRows = data.map((item) => {
                        const start = new Date(item.startDate);
                        const end = new Date(start);
                        end.setDate(start.getDate() + parseInt(item.numberOfDays) - 1);

                        return {
                            id: item._id,
                            reason: item.reason,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            numberOfDays: item.numberOfDays,
                            approve: item.approve,
                        };
                    });
                    setRows(mappedRows);
                } else {
                    console.error('Unexpected API response structure:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    const handleLogout = () => {
        router.push('/login');
    };

    const handleLeaveRequest = () => {
        const newRow = {
            startDate,
            endDate,
            numberOfDays,
            reason,
            approve,
        };

        axios.post('http://localhost:5000/clients', newRow)
            .then((response) => {
                if (response.data.success) {
                    console.log('Leave request submitted:', response.data);
                    const newClient = response.data.client;
                    if (newClient._id) {
                        newClient.id = newClient._id;
                    }
                    setRows((prevRows) => [...prevRows, newClient]);
                    setReason('');
                    setStartDate('');
                    setEndDate('');
                    setNumberOfDays('');
                    setUpdateId('');
                    setApprove('');
                } else {
                    console.error('Leave request submission failed:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error submitting leave request:', error);
            });
    };


    const handleUpdate = () => {
        if (!updateId) {
            console.error('Please enter an ID for the update.');
            return;
        }

        const updatedRow = {
            id: updateId,
            reason,
            startDate,
            endDate,
            numberOfDays,
            approve,
        };

        axios.put(`http://localhost:5000/clients/${updateId}`, updatedRow)
            .then((response) => {
                if (response.data.success) {
                    console.log('Leave request updated:', response.data.message);

                    // Update the state to reflect the change
                    const updatedRows = rows.map((row) => {
                        if (row.id === updateId) {
                            return updatedRow;
                        }
                        return row;
                    });
                    setRows(updatedRows);

                    // Clear the input fields
                    setReason('');
                    setStartDate('');
                    setEndDate('');
                    setNumberOfDays('');
                    setUpdateId('');
                    setApprove('');
                } else {
                    console.error('Leave request update failed:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error updating leave request:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/clients/${id}`)
            .then((response) => {
                if (response.data.success) {
                    console.log('Leave request deleted:', response.data.message);

                    // Update the state to remove the deleted row
                    const updatedRows = rows.filter((row) => row.id !== id);
                    setRows(updatedRows);
                } else {
                    console.error('Leave request deletion failed:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error deleting leave request:', error);
            });
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'reason', headerName: 'Reason', width: 200 },
        { field: 'startDate', headerName: 'Start Date', width: 130 },
        { field: 'endDate', headerName: 'End Date', width: 130 },
        { field: 'numberOfDays', headerName: 'Number of Days', width: 130 },
        { field: 'approve', headerName: 'Approve', width: 130 },
        {
            field: 'update',
            headerName: 'Update',
            width: 90,
            renderCell: (params) => (
                <button onClick={() => setUpdateId(params.row.id)}>Update</button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 90,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)}>Delete</button>
            ),
        },
    ];

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>Demande de congé</h3>
                <div>
                    <label>Raison:</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date de début :</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date de fin :</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Number of Days :</label>
                    <input
                        type="number"
                        value={numberOfDays}
                        onChange={(e) => setNumberOfDays(e.target.value)}
                    />
                </div>
                <div>
                    <label>approve :</label>
                    <input
                        type="text"
                        value={approve}
                        onChange={(e) => setApprove(e.target.value)}
                    />
                </div>

                <button onClick={handleLeaveRequest}>Soumettre la demande de congé</button>
            </div>
            <div>
                <label>Enter ID for Update:</label>
                <input
                    type="text"
                    value={updateId}
                    onChange={(e) => setUpdateId(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
            </div>
            <button onClick={handleLogout}>Logout</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.startDate + row.endDate}
                    />
                </div>
            )}
        </div>
    );
}

export default Dashboard;
