import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { submitLogin } from "../components/authentication"
import { useContext } from "react";
import UserContext from '../components/userContext';


function Login() {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);

    async function submitData(formData) {
        const submission = await submitLogin(formData)
        if (!("status" in submission) && !("response" in submission)){
            setSubmissionErrorCode("Failed to connect to server, come back again later, sorry for the inconvenience")
            setAlertShow(true)
            return
        }

        if (submission.status != 200) {
            setSubmissionErrorCode(submission.response.data)
            setAlertShow(true)
            return
        }
        
        loginUser()
        navigate('/dashboard');

    }


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [alertShow, setAlertShow] = useState(false);

    const [submissionErrorCode, setSubmissionErrorCode] = useState("");

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData(formData)

    }


    return (
        <>
            <h1>Login</h1>
            <div id="formBody">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" required value={formData.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="on" placeholder="Password" name="password" required value={formData.password} onChange={handleChange} />
                    </Form.Group>

                    {alertShow && <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                        <Alert.Heading>Error Logging in</Alert.Heading>
                        <p>
                            {submissionErrorCode}
                        </p>
                    </Alert>}

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


export default Login