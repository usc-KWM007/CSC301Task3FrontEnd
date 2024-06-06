import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../components/authentication";
import { useContext } from "react";
import UserContext from '../components/userContext';
import { getTheme } from "../components/themeManager";

function SignOut() {
    const { logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function signingOut(){
        await signOut()
        logoutUser()
        navigate('/login')
    }
    
    useEffect(() => {signingOut()}, [])

    getTheme()

    return (
        <>
            <h1>Signing you out</h1>
        </>
    )
};


export default SignOut