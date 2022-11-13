import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout(){

	//get the setUser setter from App.js
	const { setUser } = useContext(UserContext);

	//clear localStorage
	localStorage.clear();

	//when the component mounts/page loads, set the user state to null
	useEffect(() => {
		setUser({
			id: null,
			isAdmin: null
		})
	}, [])

	return(
		//redirects the user to login page
		<Redirect to="/login"/>
	)
}