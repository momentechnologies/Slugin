import React from 'react';
import Header from './components/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Conversations from './conversations';
import Settings from './settings';
import Me from './Me';
import Bot from './Bot';
import WhatsNew from './WhatsNew';
import Help from './Help';
import MeHoc from '../../hComponents/Me';
import Storage from '../../helpers/storage';

const OrganizationRoutes = props => {
    const organizationExists = props.me.organizations.find(
        userOrganization =>
            userOrganization.organization.id ===
            parseInt(props.match.params.organizationId)
    );

    const preferedOrganizationId = Storage.get(
        'Slugin_prefered_organization_id'
    );

    if (!organizationExists) {
        const organizationId =
            preferedOrganizationId &&
            props.me.organizations.find(
                o => o.organization.id === parseInt(preferedOrganizationId)
            )
                ? props.me.organizations.find(
                      o =>
                          o.organization.id === parseInt(preferedOrganizationId)
                  ).organization.id
                : props.me.organizations[0].organization.id;

        props.history.push(
            `${
                props.baseAppUrl
            }/${organizationId}${props.location.pathname.substring(
                props.baseAppUrl.length
            )}`
        );
    } else if (
        !preferedOrganizationId ||
        parseInt(preferedOrganizationId) !==
            parseInt(props.match.params.organizationId)
    ) {
        Storage.set(
            'Slugin_prefered_organization_id',
            props.match.params.organizationId
        );
    }

    return (
        <Header baseUrl={props.match.url}>
            {organizationExists ? (
                <Switch>
                    <Route
                        path={`${props.match.path}/conversations`}
                        component={Conversations}
                    />
                    <Route
                        path={`${props.match.path}/whats-new`}
                        component={WhatsNew}
                    />
                    <Route path={`${props.match.path}/help`} component={Help} />
                    <Route
                        path={`${props.match.path}/settings`}
                        render={cProps => (
                            <Settings
                                {...cProps}
                                baseAppUrl={props.baseAppUrl}
                            />
                        )}
                    />
                    <Route
                        path={`${props.match.path}/me`}
                        render={cProps => (
                            <Me {...cProps} baseAppUrl={props.baseAppUrl} />
                        )}
                    />
                    <Route path={`${props.match.path}/bot`} component={Bot} />
                    <Redirect to={props.match.url + '/conversations'} />
                </Switch>
            ) : null}
        </Header>
    );
};

export default MeHoc()(OrganizationRoutes);
