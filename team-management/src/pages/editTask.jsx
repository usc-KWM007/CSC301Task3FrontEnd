import { useState, useEffect } from "react";
import { Button, Alert, Form } from "react-bootstrap"
import Select from 'react-select'
import { getEmployeesList, submitEditTask } from '../components/authentication';
import { useNavigate, useLocation } from "react-router-dom";
import { getTheme, getColorSchemeTheme, getSelectColorScheme } from "../components/themeManager";


let data = [];
let dataExists = [];

function EditTask() {

    const navigate = useNavigate();
    const location = useLocation();

    try { //check if data exists to prevent user from going to editTask url
        if (location.state.data) {
            dataExists.push(true)
        }
    } catch {
        dataExists.push(false)

    }

    if (dataExists[dataExists.length - 1] == false) { //if data does not exist send user back to dashboard
        console.log(dataExists)
        useEffect(() => { navigate('/dashboard') }, [])

        return <div className="App">Loading...</div>;
    }



    const originalTaskData = location.state.data;

    const [alertShow, setAlertShow] = useState(true);
    const [employeeErrorCode, setEmployeeErrorCode] = useState("");

    const [editAlertShow, setEditAlertShow] = useState(false);
    const [editErrorCode, setEditErrorCode] = useState("");

    const [isLoading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);

    const [formData, setFormData] = useState({
        taskId: originalTaskData.taskid,
        taskName: originalTaskData.taskname,
        taskDueDate: originalTaskData.taskduedate ? originalTaskData.taskduedate.slice(0, -1) : "",
        taskLocation: originalTaskData.tasklocation,
        taskDescription: originalTaskData.taskdescription,
    });

    async function getData() {
        let holder = []
        let originalTaskDataAssignedEmployees = [];
        let submission = await getEmployeesList();

        if (submission.status != 200) {
            setEmployeeErrorCode(submission.response.data)
            setAlertShow(true)
            setLoading(false)
            return
        }
        setAlertShow(false)

        let received = submission.data;
        for (let i = 0; i < received.length; i++) {
            data.push(received[i])
            holder.push({ value: i + 1, label: `${received[i].firstname} ${received[i].lastname}` })
            //if (originalTaskData.assignedEmployees.includes(received[i].empid)){
            if (originalTaskData.assignedEmployees.some(e => e.empid == received[i].empid)) {
                originalTaskDataAssignedEmployees.push({ value: i + 1, label: `${received[i].firstname} ${received[i].lastname}` })
            }
        }
        setSelectedEmployees(originalTaskDataAssignedEmployees)
        setOptions(holder);
        setLoading(false)
        return
    }

    async function submitData(formData) {
        let submission = await submitEditTask(formData);

        if (submission.status != 200) {
            setEditErrorCode(submission.response.data)
            setEditAlertShow(true)
            return
        }
        navigate('/dashboard');
    }

    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => { getData() }, [])


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

    getTheme()
    const color = getColorSchemeTheme()
    const selectScheme = getSelectColorScheme()

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    if (alertShow) {
        return (
            <>
                <Alert variant="danger">
                    <Alert.Heading>Error Getting Employee List</Alert.Heading>
                    <p>
                        {employeeErrorCode}
                    </p>
                </Alert>
            </>
        )
    }

    return (
        <>
            <h1>Edit Task</h1>
            <div id="formBody">
                <Form data-bs-theme={color} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Name *</Form.Label>
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
                        <Form.Label>Task Description *</Form.Label>
                        <Form.Control as="textarea" rows="4" name="taskDescription" placeholder="Enter task description" required value={formData.taskDescription} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Assigned Employees</Form.Label>
                        <Select options={options} styles={selectScheme} value={selectedEmployees} onChange={handleEmployeeChange} isMulti={true} />
                    </Form.Group>

                    {editAlertShow && <Alert variant="danger" onClose={() => setEditAlertShow(false)} dismissible>
                        <Alert.Heading>Error Editing Task</Alert.Heading>
                        <p>
                            {editErrorCode}
                        </p>
                    </Alert>}

                    <div id="formButton">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>

            </div >
        </>
    )
};

export default EditTask