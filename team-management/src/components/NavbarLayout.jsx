import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css'
import { useContext } from 'react';
import UserContext from './userContext';




function NavBarLayout() {
    //variable for if the user is logged in
    const { user } = useContext(UserContext);

    //if user is logged in
    if (user) {
        return (
            <>
                <Navbar expand="sm" className="bg-primary-subtle">
                    <Container className="nav-container">
                        <Navbar.Text className='navbar-brand'>Team Management</Navbar.Text>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav" className='justify-content-end'>
                            <Nav className="me-auto">
                                <Nav.Link href="/dashboard">Home</Nav.Link>
                                <Nav.Link href="/addTask">Add Task</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse id="navbar-nav" className='justify-content-end'>
                            <Nav>
                                <Nav.Link href="/settings">Settings</Nav.Link>
                                <Nav.Link href="/signOut">Sign Out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Outlet />
            </>
        )
    }
    //if the user is not logged in
    return (
        <>
            <Navbar expand="sm" className="bg-primary-subtle">
                <Container className="nav-container">
                    <Navbar.Text className='navbar-brand'>Team Management</Navbar.Text>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav" className='justify-content-end'>
                        <Nav>
                            <Nav.Link href="/login">Login </Nav.Link>
                            <Nav.Link href="/signUp">Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
};

export default NavBarLayout