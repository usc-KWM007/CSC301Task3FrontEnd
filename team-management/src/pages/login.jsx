import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const loginUrl = 'http://127.0.0.1:3000/login';

function Login() {
    const navigate = useNavigate();

    async function submitLogin(data){
        try {
            //using axios returns array of objects
            const response = await axios.post(loginUrl,{
                email: data.email,
                password: data.password,
            });
            console.log("Success")
            console.log(response);
            if (response == "Cool, it's you are allowed 🤞"){
                navigate('/dashboard');
            } else{
                console.log("failed");
            }          
        } catch (err) {
            //if error getting questions show an error
            /*const error = document.createElement("STRONG");
            error.innerHTML = err.message;
            networkError.insertBefore(error, networkError.firstChild);
            networkError.hidden = false;*/
            console.log(err)
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
        check = submitLogin(formData);
        
    }


    return (
        <>
            <h1>Login</h1>
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