import React from 'react';
import { withRouter } from 'react-router-dom';
import MeContext from '../contexts/meContext';

export default options => WrappedComponent => {
    return withRouter(props => (
        <MeContext.Consumer>
            {({ state, refetchMe }) => {
                const selectedOrganization =
                    props.match.params.organizationId &&
                    state.organizations &&
                    !state.isAuthenticating
                        ? state.organizations.find(
                              o =>
                                  o.id ===
                                  parseInt(props.match.params.organizationId)
                          )
                        : null;

                return (
                    <WrappedComponent
                        {...props}
                        isAuthenticating={state.isAuthenticating}
                        isAuthenticated={state.isAuthenticated}
                        me={state.user}
                        selectedOrganization={selectedOrganization}
                        refetchMe={refetchMe}
                    />
                );
            }}
        </MeContext.Consumer>
    ));
};
