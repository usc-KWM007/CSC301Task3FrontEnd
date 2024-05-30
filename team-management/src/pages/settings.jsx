import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap"

function Settings() {

    const placeHolderData = {
        email: "test@email.com",
        password: "password",
        firstName: "Jeff",
        lastName: "Smith",
        role: "Coder",
    }

    let appPref = {
        theme: "1",
        defaultOrder: "1"
    }

    const themeOptions = [
        { name: 'light', value: '1' },
        { name: 'dark', value: '2' }
    ]

    const defaultOrderOptions = [
        { name: 'Name Asc', value: '1' },
        { name: 'Name Dsc', value: '2' },
        { name: 'Date Asc', value: '3' },
        { name: 'Date Dsc', value: '4' },
        { name: 'Applying to you', value: '5' },
        { name: 'Overdue', value: '6' }
    ]

    const [themeChoice, setThemeChoice] = useState(appPref.defaultOrder);

    const handleThemeChoice = (event) => {
        setThemeChoice(event.currentTarget.value)
    }

    const [defaultOrderChoice, setDefaultOrderChoice] = useState(appPref.theme);

    const handleDefaultOrderChoice = (event) => {
        setDefaultOrderChoice(event.currentTarget.value)
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
        console.log(themeChoice);
        console.log(defaultOrderChoice);
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


                    <h2 id="formCenterText">Preferences</h2>

                    <div id="formButton">
                        <h3 id="formCenterText">Theme</h3>
                        <ButtonGroup>
                            {themeOptions.map((theme, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`theme-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-dark' : 'outline-primary'}
                                    name="theme"
                                    value={theme.value}
                                    checked={themeChoice === theme.value}
                                    onChange={handleThemeChoice}
                                >
                                    {theme.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <h3 id="formCenterText">Default Order for Tasks</h3>
                        <ButtonGroup>
                            {defaultOrderOptions.map((defaultOrder, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`defaultOrder-${idx}`}
                                    type="radio"
                                    variant={'outline-primary'}
                                    name="defaultOrder"
                                    value={defaultOrder.value}
                                    checked={defaultOrderChoice === defaultOrder.value}
                                    onChange={handleDefaultOrderChoice}
                                >
                                    {defaultOrder.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>

                    </div>


                    <div id="formButton">
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>

        </>
    )
};


export default Settings