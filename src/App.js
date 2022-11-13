import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //the as keyword gives an alias to the component upon import
import './App.css';
import AppNavBar from './components/AppNavBar';
import Courses from './pages/Courses';
import SpecificCourse from './pages/SpecificCourse';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import { UserProvider } from './UserContext';

/*
  All other components/pages will be contained in our main component: <App />
  
  <>..</> - Fragment which ensures that adjacent JSX elements will be rendered and avoid this error.
*/
function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  /*
  Since reloading the app resets our user state's properties to null, we need to re-retrieve the id and isAdmin values from our API

  To do so, we run a useEffect hook with a fetch request then re-set the user state's properties
  */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if(typeof data._id !== 'undefined'){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      }else{
        setUser({
          id: null,
          isAdmin: null
        })        
      }
    })
  }, [])


  return (
    //The UserProvider component has a value attribute that we can use to pass our user state to our components
    <UserProvider value={{user, setUser}}>
      <Router>
        <>
          <AppNavBar/>
          <Container>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/courses" component={Courses}/>
                <Route exact path="/courses/:courseId" component={SpecificCourse}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Logout}/>
                <Route component={Error} />
              </Switch>
          </Container>
        </>
      </Router>
    </UserProvider>
  );
}

export default App;
