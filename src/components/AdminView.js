import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

export default function AdminView(props){
	// console.log(props)

	//destructure the coursesProp and the fetchData function from Courses.js
	const { coursesProp, fetchData } = props;

	const [coursesArr, setCoursesArr] = useState([])
	const [courseId, setCourseId] = useState("")
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)
	//states for handling modal visibility
	const [showEdit, setShowEdit] = useState(false)

	const token = localStorage.getItem("token")

	//Functions to handle opening and closing modals
	const openEdit = (courseId) => {
		// console.log(courseId)
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setCourseId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setShowEdit(true)
	}

	const closeEdit = () => {
		setCourseId("")
		setName("")
		setDescription("")
		setPrice(0)
		setShowEdit(false)
	}

	const editCourse = (e) => {
		e.preventDefault()

		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				alert("Course successfully updated")
				//close the modal and set all states back to default values
				closeEdit()
				fetchData()
				//we call fetchData here to update the data we receive from the database
				//calling fetchData updates our coursesProp, which the useEffect below is monitoring
				//since the courseProp updates, the useEffect runs again, which re-renders our table with the updated data
			}else{
				alert("Something went wrong")
			}
		})
	}

	const archiveToggle = (courseId, isActive) => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: !isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				let bool

				isActive ? bool = "disabled" : bool = "enabled"

				alert(`Course successfully ${bool}`)

				fetchData()
			}else{
				alert("Something went wrong")
			}
		})
	}

	useEffect(() => {
		//map through the coursesProp to generate table contents
		const courses = coursesProp.map(course => {
			return(
				<tr key={course._id}>
					<td>{course.name}</td>
					<td>{course.description}</td>
					<td>{course.price}</td>
					<td>
							{/*Dynamically render course availability*/}
							{course.isActive
								? <span>Available</span>
								: <span>Unavailable</span>
							}
					</td>
					<td>
						<Button variant="primary" size="sm" onClick={() => openEdit(course._id)}>Update</Button>
						{course.isActive
							//dynamically render which button show depending on course availability
							? <Button variant="danger" size="sm" onClick={() => archiveToggle(course._id, course.isActive)}>Disable</Button>
							: <Button variant="success" size="sm" onClick={() => archiveToggle(course._id, course.isActive)}>Enable</Button>
						}
					</td>
				</tr>
			)
		})

		//set the CoursesArr state with the results of our mapping so that it can be used in the return statement
		setCoursesArr(courses)

	}, [coursesProp])
	
	return(
		<>
			<h2>Admin Dashboard</h2>

			{/*Course info table*/}
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{/*Mapped table contents dynamically generated from the coursesProp*/}
					{coursesArr}
				</tbody>
			</Table>

			{/*Edit Course Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editCourse(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Update Course</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group controlId="courseName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								value={name}
								onChange={e => setName(e.target.value)}
								type="text"
								required
							/>
						</Form.Group>

						<Form.Group controlId="courseDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								value={description}
								onChange={e => setDescription(e.target.value)}
								type="text"
								required
							/>
						</Form.Group>

						<Form.Group controlId="coursePrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								value={price}
								onChange={e => setPrice(e.target.value)}
								type="number"
								required
							/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}