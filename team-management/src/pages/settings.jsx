import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"

function Settings() {

    const placeHolderData = {
        email: "test@email.com",
        password: "password",
        firstName: "Jeff",
        lastName: "Smith",
        role: "Coder"
    }

    const [formData, setFormData] = useState({
        email: placeHolderData.email,
        password: placeHolderData.password,
        firstName: placeHolderData.firstName,
        lastName: placeHolderData.lastName,
        role: placeHolderData.role
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
            <h1>Settings</h1>
            <h2>Account</h2>
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
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
            <div>
                <h2>Preferences</h2>
            </div>
        </>
    )
};


export default Settings