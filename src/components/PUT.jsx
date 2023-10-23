import React, { useState } from 'react';

function PUT({ id, handleUpdateClick }) {
    // Define the updatedata state to hold the updated data
    const [updatedata, setUpdatedata] = useState({});

    const updateTask = () => {
        // Construct the URL with the taskId
        const url = `http://localhost:3010/updateGoal/${id}`;

        // Define the request headers and method
        const requestOptions = {
            method: 'PUT',  // Use 'PUT' for updating data
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content type
            },
            body: JSON.stringify(updatedata), // Convert the updatedata to JSON
        };

        // Send the update request
        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Request was successful, handle success here
                    alert('Goal updated successfully');
                    // You can also trigger a callback to handle updates in your parent component if needed
                    handleUpdateClick();
                } else {
                    // Handle errors here
                    alert('Failed to update goal');
                }
            })
            .catch((error) => {
                // Handle network errors here
                console.error('Network error:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Updated Goal Name"
                onChange={(e) => setUpdatedata({ ...updatedata, goalName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Updated Goal Status"
                onChange={(e) => setUpdatedata({ ...updatedata, goalStatus: e.target.value })}
            />

            <button onClick={updateTask} className="update-button">
                Update
            </button>
        </div>
    );
}

export default PUT;
