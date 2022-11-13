import React from 'react';

//Creates a React context object
//A context object contains data that can be passed around to multiple props
//Think of it like a delivery container or a box
const UserContext = React.createContext();

//A provider is what is used to distribute the context object to the components
export const UserProvider = UserContext.Provider;

export default UserContext;