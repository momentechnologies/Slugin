import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import App from './app';
import ConfirmEmail from './ConfirmEmail';
import MeContainer from './MeContainer';
import TermsAndPolicies from './TermsAndPolicies';
import MeContext from '../contexts/meContext';

const NormalRoutes = () => (
    <div>
        <Header forApp={false} />
        <div style={{ minHeight: '90vh' }}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/confirm-email" component={ConfirmEmail} />
                <Route path="/tp" component={TermsAndPolicies} />
            </Switch>
        </div>
        <Footer />
    </div>
);

const IndexRoutes = () => (
    <MeContext.Consumer>
        {({ state }) => {
            if (state.isAuthenticating) {
                return <Loader />;
            }

            return (
                <Switch>
                    <Route path="/app" component={App} />
                    <Route component={NormalRoutes} />
                </Switch>
            );
        }}
    </MeContext.Consumer>
);

export default MeContainer()(IndexRoutes);
