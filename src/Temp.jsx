import React, { useEffect, useState } from 'react';

function GET() {
    const [data, setData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // To control the visibility of the add form
    const [newGoalData, setNewGoalData] = useState({
        goalName: '',
        goalStatus: '',
    });

    const [showUpdateForm, setShowUpdateForm] = useState(false); // To control the visibility of the update form
    const [selectedGoal, setSelectedGoal] = useState(null);

    useEffect(() => {
        // Fetch data here
    }, []);

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleUpdateClick = (taskId) => {
        // Find the goal to update based on the taskId from your data
        const goalToUpdate = data.find((goal) => goal.taskId === taskId);
        if (goalToUpdate) {
            setSelectedGoal(goalToUpdate);
            setShowUpdateForm(true);
        }
    };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to add the new goal to your API
            const response = await fetch('http://localhost:3010/addGoal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGoalData),
            });
            if (response.ok) {
                // Data added successfully, refresh or update your data
                setShowAddForm(false); // Hide the add form
            } else {
                // Handle error
            }
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const handleUpdateFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedGoal) {
                // Send a PUT request to update the selected goal in your API
                const response = await fetch(`http://localhost:3010/updateGoal/${selectedGoal.taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedGoal),
                });
                if (response.ok) {
                    // Data updated successfully, refresh or update your data
                    setShowUpdateForm(false); // Hide the update form
                    setSelectedGoal(null); // Clear the selected goal
                } else {
                    // Handle error
                }
            }
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    return (
        <div className="get-component">
            <h1 className="task-list-header">Goals</h1>
            <button className="add-button" onClick={handleAddClick}>Add</button>

            {showAddForm && (
                <form onSubmit={handleAddFormSubmit}>
                    <input
                        type="text"
                        placeholder="Goal Name"
                        value={newGoalData.goalName}
                        onChange={(e) => setNewGoalData({ ...newGoalData, goalName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Goal Status"
                        value={newGoalData.goalStatus}
                        onChange={(e) => setNewGoalData({ ...newGoalData, goalStatus: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}

            {/* Your existing code here */}

            {showUpdateForm && selectedGoal && (
                <form onSubmit={handleUpdateFormSubmit}>
                    <input
                        type="text"
                        placeholder="Goal Name"
                        value={selectedGoal.goalName}
                        onChange={(e) => setSelectedGoal({ ...selectedGoal, goalName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Goal Status"
                        value={selectedGoal.goalStatus}
                        onChange={(e) => setSelectedGoal({ ...selectedGoal, goalStatus: e.target.value })}
                    />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
}

export default GET;
