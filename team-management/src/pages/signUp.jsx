import { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { submitSignUp } from "../components/authentication"
import PasswordStrengthBar from 'react-password-strength-bar';

function SignUp() {
    const navigate = useNavigate();

    async function submitData(formData) {
        const submission = await submitSignUp(formData)
        if (!("status" in submission) && !("response" in submission)){
            setSubmissionErrorCode("Failed to connect to server, come back again later, sorry for the inconvenience")
            setAlertShow(true)
            return
        }
        if (submission.status != 200){
            setSubmissionErrorCode(submission.response.data)
            setAlertShow({ ...alertShow, ["invalidSubmit"]: true})
            return
        }
            navigate('/login');
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: ""
    });

    const [alertShow, setAlertShow] = useState({
        invalidPassword: false,
        invalidSubmit: false
    });

    const [submissionErrorCode, setSubmissionErrorCode] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordStrength <= 1) {
            setAlertShow({ ...alertShow, ["invalidPassword"]: true})
            return
        }
        submitData(formData)

    }

    const passwordStrengthHandle = (score) => {
        setPasswordStrength(score)
    }

    return (
        <>
            <h1>Sign up</h1>
            <div id="formBody">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" required value={formData.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password *</Form.Label>
                        <Form.Control type="password" autoComplete="on" placeholder="Password" name="password" required value={formData.password} onChange={handleChange} />
                        {(formData.password.length > 0) &&<PasswordStrengthBar minLength={6} onChangeScore={passwordStrengthHandle} password={formData.password} />}
                    </Form.Group>

                    {alertShow.invalidPassword && <Alert variant="danger" onClose={() => setAlertShow({ ...alertShow, ["invalidPassword"]: false})} dismissible>
                        <Alert.Heading>Not a strong enough password</Alert.Heading>
                        <p>
                            Password needs to be rated at at least an okay,
                            try adding a mix of capital letters, numbers, special symbols.
                        </p>
                    </Alert>}

                    <div id="twoRowForm">
                        <Form.Group className="mb-3">
                            <Form.Label>First name *</Form.Label>
                            <Form.Control type="text" pattern="[A-Za-z]+" onInput={e=> {try{e.target.setCustomValidity('')}catch(err){}}} onInvalid={e => e.target.setCustomValidity('Please enter letters only.')} name="firstName" placeholder="First name" required value={formData.firstName} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last name *</Form.Label>
                            <Form.Control type="text" pattern="[A-Za-z]+" onInput={e=> {try{e.target.setCustomValidity('')}catch(err){}}} onInvalid={e => e.target.setCustomValidity('Please enter letters only.')} name="lastName" placeholder="Last name" required value={formData.lastName} onChange={handleChange} />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Role *</Form.Label>
                        <Form.Control type="text" name="role" placeholder="Role" required value={formData.role} onChange={handleChange} />
                    </Form.Group>

                    {alertShow.invalidSubmit && <Alert variant="danger" onClose={() => setAlertShow({ ...alertShow, ["invalidSubmit"]: false})} dismissible>
                        <Alert.Heading>Error Creating Account</Alert.Heading>
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


export default SignUp