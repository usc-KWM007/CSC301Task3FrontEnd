import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { submitLogin } from "../components/authentication"
import { useContext } from "react";
import UserContext from '../components/userContext';


function Login() {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);

    async function submitData(formData) {
        let response = await submitLogin(formData)
        console.log(response)
        if (response.status == 200){
            loginUser()
            navigate('/dashboard');
        }  
        else{
            console.log('Not allowed')
        }
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        //where we submit to backend
        submitData(formData);

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