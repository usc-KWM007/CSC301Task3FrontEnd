import { Outlet } from 'react-router-dom';
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
                <Navbar expand="sm" bg="primary">
                    <Container className="nav-container">
                        <Navbar.Text className='text-light navbar-brand'>Team Management</Navbar.Text>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav" className='justify-content-end'>
                            <Nav className="me-auto">
                                <Nav.Link href="/dashboard" className='text-light'>Home</Nav.Link>
                                <Nav.Link href="/addTask" className='text-light'>Add Task</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse id="navbar-nav" className='justify-content-end'>
                            <Nav>
                                <Nav.Link href="/settings" className='text-light'>Settings</Nav.Link>
                                <Nav.Link href="/signOut" className='text-light'>Sign Out</Nav.Link>
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
            <Navbar expand="sm" bg="primary">
                <Container className="nav-container">
                    <Navbar.Text className='navbar-brand text-light'>Team Management</Navbar.Text>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav" className='justify-content-end'>
                        <Nav>
                            <Nav.Link href="/login" className='text-light'>Login </Nav.Link>
                            <Nav.Link href="/signUp" className='text-light'>Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
};

export default NavBarLayout