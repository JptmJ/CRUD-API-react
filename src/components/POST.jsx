import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function POST() {
  const url = "http://localhost:3010/addGoal";
  const [goal, setGoal] = useState({
    goalName: '',
    goalStatus: 'Pending'
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(url, JSON.stringify({
      goalName: goal.goalName,
      goalStatus: goal.goalStatus
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert("Data Inserted Successfully...");
          window.location.href = './';
        } else {
          alert("Error sending Data " + response.status);
        }
      });
  }

  function handleInput(e) {
    const newGoal = { ...goal };
    newGoal[e.target.name] = e.target.value;
    setGoal(newGoal);
  }

  return (
    <div className='form_div'>
      <Form className="goal-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Goal Name</Form.Label>
          <Form.Control required name='goalName' onChange={(e) => handleInput(e)} type="text" placeholder="Enter Goal" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Status</Form.Label>
          <Form.Select required name='goalStatus' onChange={(e) => handleInput(e)}>
            <option value='Pending'>Pending</option>
            <option value='Done'>Done</option>
          </Form.Select>

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default POST;
