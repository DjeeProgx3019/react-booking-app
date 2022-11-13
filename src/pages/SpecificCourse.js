import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';

export default function SpecificCourse({match}) {

	// console.log(match)

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	//match.params holds the ID of our course in the courseId property
	const courseId = match.params.courseId;

	// console.log(courseId)

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})
	}, [])

	return(
		<Container className="mt-5">
			<Card>
				<Card.Body className="text-center">
					<Card.Subtitle>Name:</Card.Subtitle>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle>Description:</Card.Subtitle>
					<Card.Text>{description}</Card.Text>
					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>PhP {price}</Card.Text>
				</Card.Body>
			</Card>
		</Container>
	)
}
