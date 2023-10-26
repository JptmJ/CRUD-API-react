import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import putUrl from './Url';
import getUrl from './Url';

function PUT() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [goal, setGoal] = useState({
        goalName: '',
        goalStatus: 'Pending',
        id: id,
    });

    useEffect(() => {
        fetch(getUrl().getUrl)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        const selectedGoal = data.find(item => item.id === Number(id));
        if (selectedGoal) {
            setGoal({
                goalName: selectedGoal.goalName,
                goalStatus: selectedGoal.goalStatus,
                id: id,
            });
        }
    }, [data, id]);

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "goalName": goal.goalName,
            "goalStatus": goal.goalStatus,
            "id": id
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(putUrl().putUrl, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Data Updated Successfully...");
                    window.location.href = '../';
                } else {
                    alert("Error sending Data " + response.status);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <div className='form_div'>
                <Form onSubmit={handleUpdateSubmit} className="goal-form">
                    <h3>Task Number {id} Update form</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Goal Name</Form.Label>
                        <Form.Control
                            value={goal.goalName}
                            onChange={(e) => setGoal({ ...goal, goalName: e.target.value })}
                            required
                            name='goalName'
                            type="text"
                            placeholder="Enter Goal"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Status</Form.Label>
                        <Form.Select
                            value={goal.goalStatus}
                            onChange={(e) => setGoal({ ...goal, goalStatus: e.target.value })}
                            required
                            name='goalStatus'>
                            <option value='Pending'>Pending</option>
                            <option value='Done'>Done</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default PUT;
