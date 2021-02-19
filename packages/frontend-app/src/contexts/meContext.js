import React from 'react';

export default React.createContext({
    isAuthenticated: false,
    isAuthenticating: true,
    isAdmin: true,
    user: null,
    clients: [],
});
