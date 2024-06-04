import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { getAccountData, saveAccountChanges } from "../components/authentication";

function Settings() {

    const navigate = useNavigate(); 

    const themeOptions = [
        { name: 'light', value: '1' },
        { name: 'dark', value: '2' }
    ]

    const defaultOrderOptions = [
        { name: 'Name Asc', value: '1', code: 'taskNameAsc' },
        { name: 'Name Dsc', value: '2', code: 'taskNameDsc' },
        { name: 'Date Asc', value: '3', code: 'taskDateAsc' },
        { name: 'Date Dsc', value: '4', code: 'taskDateDsc' },
        { name: 'Overdue', value: '5', code: 'taskOverDue' }
    ]

    const [isLoading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: ""
    });

    async function getData() {
        let received = await getAccountData()
        setFormData({
            email: received.email,
            password: "",
            firstName: received.firstname,
            lastName: received.lastname,
            role: received.role
        })
        
        setLoading(false)
        return
    }

    async function submitData(formData) {
        console.log(formData)
        let submission = await saveAccountChanges(formData);
        if (submission.status == 200)
            navigate('/dashboard');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        submitData(formData)
    }

    useEffect(() => { getData() }, [])

    const [themeChoice, setThemeChoice] = useState(localStorage.getItem("theme"));
    const [defaultOrderChoice, setDefaultOrderChoice] = useState(localStorage.getItem("defaultSortOrder"));

    const handleChangeDefaultSort = (event) => {
        let newDefaultSort
        for (let i=0; i < defaultOrderOptions.length; i++){
            if(defaultOrderOptions[i].value == event.currentTarget.value){
                newDefaultSort=defaultOrderOptions[i].code;
            }
        }
        localStorage.setItem("defaultSortOrder",newDefaultSort)
        setDefaultOrderChoice(newDefaultSort)
    }

    const handleChangeTheme = (event) => {
        let newTheme
        for (let i=0; i < themeOptions.length; i++){
            if(themeOptions[i].value == event.currentTarget.value){
                newTheme=themeOptions[i].name;
                setThemeChoice(newTheme)
            }
        }
        localStorage.setItem("theme",newTheme)
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <>
            <h1>Settings</h1>
            <h2>Modify Account</h2>
            <h4>Email: {formData.email}</h4>
            <div id="formBody">
                <Form onSubmit={handleSubmit} >
                    <Form.Group  className="mb-3">
                        <Form.Label>Change Password</Form.Label>
                        <Form.Control type="password" autoComplete="on" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
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
                <br />

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
                                    checked={themeChoice === theme.name}
                                    onChange={handleChangeTheme}
                                >
                                    {theme.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <h3 id="formCenterText">Default Order for Tasks</h3>
                        <ButtonGroup style={{marginBottom : "4rem"}}>
                            {defaultOrderOptions.map((defaultOrder, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`defaultOrder-${idx}`}
                                    type="radio"
                                    variant={'outline-primary'}
                                    name="defaultOrder"
                                    value={defaultOrder.value}
                                    checked={defaultOrderChoice === defaultOrder.code}
                                    onChange={handleChangeDefaultSort}
                                >
                                    {defaultOrder.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
            </div>
        </>
    )
};


export default Settings