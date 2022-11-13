import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Redirect } from 'react-router-dom';

export default function Register(props){

	// console.log(props)

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [isActive, setIsActive] = useState(false);

	const { user } = useContext(UserContext);

	/*
	To properly change and save input values, we must implement two-way binding
	We need to capture whatever the user types in the input as they are typing
	Meaning we need the input's .value
	To get the .value, we capture the event (in this case, onChange). The target of the onChange event is the input, meaning we can get the .value
	*/

	useEffect(() => {
		// console.log(email)
		// console.log(password1)
		// console.log(password2)

		//if all fields are populated, mobile number is exactly 11 characters, and passwords match
		if((firstName !== '' && lastName !== '' && email !== '' && mobileNo.length === 11 && password1 !== '' && password2 !== '') && (password1 === password2)){
			setIsActive(true)
		}else{
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password1, password2])

	function registerUser(e){
		e.preventDefault() //prevent default form behavior, so that the form does not submit

		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				alert("Duplicate email exists")
			}else{
				fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1
					})
				})
				.then(res => res.json())
				.then(data => {
					if(data){
						alert("Successfully registered")
						//redirect the user to the login page
						props.history.push("/login");
					}else{
						alert("Something went wrong")
					}
				})
			}
		})
		
		// alert('Thank you for registering');
	}

	return(
		(user.id !== null) ?
		<Redirect to="/" />
		:
		<Form onSubmit={e => registerUser(e)}>

			<Form.Group controlId="firstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter first name"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="lastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter last name"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</Form.Group>

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

			<Form.Group controlId="mobileNo">
				<Form.Label>Mobile Number</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter mobile number"
					value={mobileNo}
					onChange={e => setMobileNo(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="password1">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter password"
					value={password1}
					onChange={e => setPassword1(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="password2">
				<Form.Label>Verify Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Verify password"
					value={password2}
					onChange={e => setPassword2(e.target.value)}
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