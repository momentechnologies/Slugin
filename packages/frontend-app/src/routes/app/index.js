import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Alert } from 'reactstrap';

import OrganizationRoutes from './OrganizationRoutes';
import MeHoc from '../../hComponents/Me';

const App = props => {
    if (!props.isAuthenticated) {
        return <Redirect to="/login" />;
    }

    if (props.me.organizations.length === 0) {
        return (
            <div>
                <Alert color="danger">
                    You must add yourself to an organization
                </Alert>
            </div>
        );
    }

    return (
        <Switch>
            <Route
                path={`${props.match.path}/:organizationId`}
                render={ownProps => (
                    <OrganizationRoutes
                        {...ownProps}
                        baseAppUrl={props.match.path}
                    />
                )}
            />
            <Route
                exact
                path={`${props.match.path}`}
                render={ownProps => (
                    <OrganizationRoutes
                        {...ownProps}
                        baseAppUrl={props.match.path}
                    />
                )}
            />
        </Switch>
    );
};

export default MeHoc()(App);
