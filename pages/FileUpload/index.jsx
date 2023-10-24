import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ handleFileChange, handleLeaveRequest }) {
    const [file, setFile] = useState(null);

    const internalHandleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        handleFileChange(e); 
    };

    const handleFileUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:5000/clients', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    if (response.data.success) {
                        console.log('File uploaded:', response.data.message);
                    } else {
                        console.error('File upload failed:', response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    return (
        <div>
            
        </div>
    );
}

export default FileUpload;
