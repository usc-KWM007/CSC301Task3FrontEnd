import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"
import Select from 'react-select'
import { getEmployeesList, submitTask } from '../components/authentication';
import { useNavigate } from "react-router-dom";

//Need to collect employeeData from backend in id,label, label being fname,lname

let data = [];
function AddTask() {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);

    async function getData() {
        let holder = []
        let received = await getEmployeesList()
        for (let i = 0; i < received.length; i++) {
            data.push(received[i])
            holder.push({ value: i + 1, label: `${received[i].firstname} ${received[i].lastname}` })
        }
        setOptions(holder);
        setLoading(false)
        return
    }

    async function submitData(formData){
        let submission = await submitTask(formData);
        if(submission.status == 200)
            navigate('/dashboard');
    }

    useEffect(() => { getData() }, [])

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

        let taskEmployees = []
        for (let i = 0; i < selectedEmployees.length; i++) {
            let index = selectedEmployees[i].value - 1
            taskEmployees.push(data[index].empid)

        }
        formData.taskEmployees = taskEmployees;
        submitData(formData);
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <>
            <h1>New Task</h1>
            <div id="formBody">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" name="taskName" placeholder="Enter task name" required value={formData.taskName} onChange={handleChange} />
                    </Form.Group>

                    <div id="twoRowForm">
                        <div id="column49">
                            <Form.Group className="mb-3">
                                <Form.Label>Task Due Date</Form.Label>
                                <Form.Control type="datetime-local" placeholder="" name="taskDueDate" value={formData.taskDueDate} onChange={handleChange} />
                            </Form.Group>
                        </div>

                        <div id="column49">
                            <Form.Group className="mb-3">
                                <Form.Label>Task Location</Form.Label>
                                <Form.Control type="text" name="taskLocation" placeholder="Enter task location" value={formData.taskLocation} onChange={handleChange} />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control as="textarea" rows="4" name="taskDescription" placeholder="Enter task description" required value={formData.taskDescription} onChange={handleChange} />
                    </Form.Group>

                    <Select options={options} value={selectedEmployees} onChange={handleEmployeeChange} isMulti={true} />

                    <div id="formButton">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

            </div>
        </>
    )
};

export default AddTask