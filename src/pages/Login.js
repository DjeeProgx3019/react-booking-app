import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Redirect } from 'react-router-dom';

export default function Login(props){

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		if(email !== '' && password !== ''){
			setIsActive(true)
		}else{
			setIsActive(false)
		}
	}, [email, password])

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			//set our user state to include the user's id and isAdmin values
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	function authenticateUser(e){
		e.preventDefault() //prevent default form behavior, so that the form does not submit

		//localStorage.setItem allows us to save a key/value pair to localStorage
		//Syntax: (key, value)

		//ACTIVITY:
		/*
		Create a fetch request inside this function to allow users to log in. Log in the console the response.
		*/
		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(typeof data.access !== "undefined"){
				//save JWT to localStorage so that it can be retrieved later
				localStorage.setItem("token", data.access)
				//call the retrieveUserDetails function and pass the JWT to it
				retrieveUserDetails(data.access)

				alert("Successfully logged in.")
				props.history.push("/courses");
			}else{
				alert("Login failed. Please try again");
				setEmail("");
				setPassword("");
			}
		})

		// setEmail("")
		// setPassword("")
		
		// alert('Thank you for logging in');
	}

	return(
		(user.id !== null) ?
		<Redirect to="/" />
		:
		<Form onSubmit={e => authenticateUser(e)}>
			<Form.Group controlId="userEmail">
				<Form.Label>Email Address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</Form.Group>

			{isActive ?
				<Button className="mt-3" variant="primary" type="submit" id="submitBtn">
				Submit
				</Button>
				:
				<Button className="mt-3" variant="primary" id="submitBtn" disabled>
				Submit
				</Button>				
			}
		</Form>
	)
}