// Long method
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// Short method
import { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavBar(){

	//A context object such as our UserContext can be "opened" with React's useContext hook
	const { user } = useContext(UserContext);

	return(
		<Navbar bg="light" expand="lg">
		  <Container>
		    <Link className="navbar-brand" to="/">Zuitt</Link>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
			{/*
				- className is use instead class, to specify a CSS class

				- changes for Bootstrap 5
				from mr -> to me
				from ml -> to ms
			*/}
		      <Nav className="ms-auto">
		        <Link className="nav-link" to="/">Home</Link>
		        <Link className="nav-link" to="/courses" exact>Courses</Link>

		        {(user.id !== null) ?
		        	<Link className="nav-link" to="/logout">Logout</Link>
		        	:
		        	<>
			        	<Link className="nav-link" to="/login">Login</Link>
			        	<Link className="nav-link" to="/register">Register</Link>
		        	</>
		        }

		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}