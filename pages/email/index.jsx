const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'walidos.major06@gmail.com', //employee
        pass: 'your-email-password',
    },
});

const mailOptions = {
    from: 'walios.major06@gmail.com',
    to: 'walid.meftah97@gmail.com', // boss
    subject: 'Leave Request Submitted',
    text: 'A leave request has been submitted by an employee. Please review and approve it.',

};

const handleLeaveRequest = () => {
    const newRow = {
        id: uuidv4(),
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

                // Send an email to the manager after the leave request is submitted
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email to manager:', error);
                    } else {
                        console.log('Email sent to manager:', info.response);
                    }
                });
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

    const updatedRows = rows.map((row) => {
        if (row.id === updateId) {
            return {
                ...row,
                reason: reason || row.reason,
                startDate: startDate || row.startDate,
                endDate: endDate || row.endDate,
                numberOfDays: numberOfDays || row.numberOfDays,
                approve: approve || row.approve,
            };
        }
        return row;
    });

    setRows(updatedRows);
    setReason('');
    setStartDate('');
    setEndDate('');
    setNumberOfDays('');
    setUpdateId('');
    setApprove('');

};