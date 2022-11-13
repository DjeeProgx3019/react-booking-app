import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Destructuring is done in the parameter to retrieve the courseProp.
export default function CourseCard({courseProp}) {

	//console.log(props);
	// console.log(courseProp);

	const {_id, name, description, price} = courseProp;

	// Use the state hook for this component to be able to store its state
	// States are used to keep track of information related to individual components
	// Syntax: 
		// const [getter, setter] = useState(initialGetterValue)

	//when a component mounts (loads for the first time), any associated states will undergo a state change from null to the given initial/default state

	//e.g. count below goes from null to 0, since 0 is our initial state

	// const [count, setCount] = useState(0);
	// Using the state hook returns an array with the first element being a value and the second element as a function that's used to change the value of the first element.
	// const [seats, setSeats] = useState(10)
	// 1. Create a "seats" state hook on the "CourseCard" component to represent the available seats.

	// Function that keeps track of the enrollees for a course
	// By default JavaScript is synchronous, as it executes code from the top of the file all the way to the bottom and will wait for the completion of one expression before it proceeds to the next
	// The setter function for useStates are asynchronous, allowing it to execute seperately from other codes in the program.
	// The "setCount" function is being executed while the "console.log" is already being completed resulting in the console to be behind by one count.

	// 2. Modify the "enroll" function where a seat will be taken and the number of enrollees will go up on clicking the "Enroll" button
	// function enroll () {
	// // 4. Create a condition that will check if the "seats" is "0" alert the user of no more courses.
	// 	// setCount(count + 1);
	// 	// console.log('Enrollees: ' + count)
	// 		setCount(count + 1);
	// 		// console.log('Enrollees: ' + 1);
	// 		setSeats(seats - 1)
	// 		// console.log('Seats: ' + seats)
	// }

	//useEffect makes any given code block happen when a state changes AND when a component first mounts (such as on initial page load)

	//in the example below, since count and seats are in the array of our useState, the code block will execute whenever those states change

	//if the array is blank, the code will be executed on component mount ONLY

	//Do NOT omit the array completely

	// useEffect(() => {
	// 	if(seats === 0){
	// 		alert('No more seats available')
	// 	}
	// }, [count, seats])

	//syntax:
	/*
	useEffect(() => {
		code to be executed
	}, [state(s) to monitor])
	*/

	// 3. Include the number of seats to be printed out in the card.
	return (
	    <Card className="mb-2">
	        <Card.Body>
	            <Card.Title>{name}</Card.Title>
	            <Card.Subtitle>Description:</Card.Subtitle>
	            <Card.Text>{description}</Card.Text>
	            <Card.Subtitle>Price:</Card.Subtitle>
	            <Card.Text>PhP {price}</Card.Text>
{/*	            <Card.Text>Enrollees: {count}</Card.Text>
	            <Card.Text>Seats: {seats}</Card.Text>
	            <Button variant="primary" onClick={enroll}>Enroll</Button>*/}
	            <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
	        </Card.Body>
	    </Card>
	)
}