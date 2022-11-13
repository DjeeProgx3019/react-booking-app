import { useEffect, useState, useContext } from 'react';
// import courseData from '../data/courseData';
import CourseCard from '../components/CourseCard';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Courses(){

	const [coursesData, setCoursesData] = useState([]);

	const { user } = useContext(UserContext)

	// console.log(user)

	// Check to see if the mock data wa captured
	// console.log(courseData);
	// console.log(courseData[0]);

	// Props
		// is a shorthand for "property" since components are considered as object in ReactJS.
		// Props is a way to pass data from a parent component to a child component.
		// It is synonymous to the function parameter.

	//Fetch by default always makes a GET request, unless a different one is specified
	//ALWAYS add fetch requests for getting data in a useEffect hook

	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/all`)
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setCoursesData(data)
		})
	}

	useEffect(() => {
		// console.log(process.env.REACT_APP_API_URL)
		// changes to env files are applied ONLY at build time (when starting the project locally)

		fetchData()
	}, [])

	const courses = coursesData.map(course =>{
		if(course.isActive){
			return(
				<CourseCard courseProp={course} key={course._id} />
			)
		}else{
			return null
		}
	})

	return(
		(user.isAdmin) ?
		<AdminView coursesProp={coursesData} fetchData={fetchData}/>
		:
		<>
			<h1>Courses</h1>
			{courses}
		</>
	)
}