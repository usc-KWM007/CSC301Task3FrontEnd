import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"

function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: ""
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        //where we submit to backend
    }


    return (
        <>
            <h1>Sign up</h1>
            <div id="formBody">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter task email" required value={formData.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="on" placeholder="Password" name="password" required value={formData.password} onChange={handleChange} />
                    </Form.Group>

                    <div id="twoRowForm">
                        <Form.Group className="mb-3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" name="firstName" placeholder="First name" required value={formData.firstName} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="Last name" required value={formData.lastName} onChange={handleChange} />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" name="role" placeholder="Role" required value={formData.role} onChange={handleChange} />
                    </Form.Group>

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