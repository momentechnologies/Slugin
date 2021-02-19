import React from 'react';
import Routes from './routes';

const AuthContext = React.createContext({
    user: null,
    organizations: [],
});

export default () => (
    <AuthContext.Provider>
        <Routes />
    </AuthContext.Provider>
);
