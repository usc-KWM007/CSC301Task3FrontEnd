import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"
import employeeData from '../data/testDataEmployee.json'
import Select from 'react-select'

const options = employeeData; //Need to collect employeeData from backend in id,label, label being fname,lname

function AddTask() {

    const [formData, setFormData] = useState({
        taskName: "",
        taskDueDate: "",
        taskLocation: "",
        taskDescription: "",
    });

    const [selectedEmployees, setSelectedEmployees] = useState([])

    const handleEmployeeChange = (event) => {
        setSelectedEmployees(event);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        console.log(selectedEmployees)
        //where we submit to backend
    }


    return (
        <>
            <h1>New Task</h1>
            <div id = "formBody">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" name = "taskName" placeholder="Enter task name" required value={formData.taskName} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Task Due Date</Form.Label>
                        <Form.Control type="datetime-local" data-bs-theme="light" placeholder = "" name = "taskDueDate" value={formData.taskDueDate} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Task Location</Form.Label>
                        <Form.Control type="text" name = "taskLocation" placeholder="Enter task location" value={formData.taskLocation} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control type="textarea" name = "taskDescription" placeholder="Enter task description" required value={formData.taskDescription} onChange={handleChange} />
                    </Form.Group>

                    <Select options = {options} value = {selectedEmployees} onChange={handleEmployeeChange} isMulti={true}/>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
            </div>
        </>
    )
};

export default AddTask