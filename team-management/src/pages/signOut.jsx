import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import { loggedIn } from "../components/authentication";
import { useNavigate } from "react-router-dom";
import NavBarLayout from "../components/NavbarLayout";
import { signOut } from "../components/authentication";

function SignOut() {
    const navigate = useNavigate();

    async function signingOut(){
        await signOut()
        navigate('/login')
    }
    

    useEffect(() => {signingOut()}, [])


    return (
        <>
            <h1>We are signing you out</h1>
        </>
    )
};


export default SignOut