import React, { createContext, useState, useEffect } from 'react';

const UserContext = React.createContext({}); 
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;