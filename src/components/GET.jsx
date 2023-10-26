import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import handleDelete from './DELETE';
import getUrl from './Url';

function GET() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(getUrl().getUrl)
            .then((response) => response.json(),
            )
            .then((data) => {
                const sortedData = data.sort((a, b) => a.id - b.id);
                setData(sortedData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div className="get-component">
            <h1 className="task-list-header">Goals</h1>
            <Link to="/post">
                <button className="add-button">Add</button>
            </Link>
            {data.length > 0 ? (
                <table className="task-table">
                    <thead>
                        <tr className="task-header">
                            <th className="task-cell">Goal ID</th>
                            <th className="task-cell">Goal Name</th>
                            <th className="task-cell">Goal Status</th>
                            <th className="task-cell">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((goalData, index) => (
                            <tr key={goalData.id} className={index % 2 === 0 ? "task-row" : ""}>
                                <td className="task-cell">{goalData.id}</td>
                                <td className="task-cell">{goalData.goalName}</td>
                                <td className="task-cell">{goalData.goalStatus}</td>
                                <td className="task-cell">
                                    <Link to={`/update/${goalData.id}`}>
                                        <button onClick={() => {}} className='update-button'>Update</button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(goalData.id, data, setData)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data in this table right now</p>
            )}
        </div>
    );
}

export default GET;
