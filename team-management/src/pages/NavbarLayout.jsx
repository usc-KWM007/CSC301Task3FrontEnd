import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../App.css'




const NavBarLayout = () => {
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
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
        </>
    )
};

export default NavBarLayout