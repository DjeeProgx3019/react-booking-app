import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const name = 'John Smith';

// let element = <h1>Hello, {name}</h1>

// /*
//   root.render() - allows to render/display our reactJS elements and display in our HTML.

// */

// // JSX (JavaScript + XML)
//   // It is an extension of JavaScript that let's us create objects which will be then compiled and added as HTML elements.

//   // Create a user object
//   const user = {
//     firstName: 'Jane',
//     lastName: 'Smith'
//   }

//   // Create a function that will use the user as parameter
//   function formatName(profile){
//     return profile.firstName +' '+ profile.lastName;
//   }

//   // <h1> tag is an exampele of JSX
//     // JSX allows us to create HTML elements and at the same time allows us to apply JavaScript code to these elements making it easy to write both HTML and JavaScript code in a single file as opposed to creating two separate files (One for HTML and another for JavaScript syntax).
//   element = <h1>Hello, {formatName(user)}</h1>

// root.render(element);