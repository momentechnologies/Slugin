import React from 'react';
import cn from 'classnames';
import { Route, Switch, Redirect, matchPath, Link } from 'react-router-dom';

import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';

import Users from './Users';
import Theme from './Theme';
import Setup from './Setup';
import Organizations from './Organizations';
import Notifications from './Notifications';
import InitialMessages from './InitialMessages';

const pages = [
    {
        alias: 'setup',
        text: 'Setup',
        component: Setup,
    },
    {
        alias: 'users',
        text: 'Users',
        component: Users,
    },
    {
        alias: 'theme',
        text: 'Theme',
        component: Theme,
    },
    {
        alias: 'organizations',
        text: 'My organizations',
        component: Organizations,
    },
    {
        alias: 'notifications',
        text: 'Notifications',
        component: Notifications,
    },
    {
        alias: 'initial-message',
        text: 'Initial messages',
        component: InitialMessages,
    },
];

const Index = ({ location, match }) => {
    const threadMatch = matchPath(location.pathname, {
        path: match.path + '/:settingPageAlias',
        exact: false,
    });

    const settingPageAlias = threadMatch
        ? threadMatch.params.settingPageAlias
        : null;

    return (
        <React.Fragment>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Nav tabs>
                            {pages.map((p, index) => (
                                <NavItem key={index}>
                                    <NavLink
                                        className={cn({
                                            active:
                                                settingPageAlias === p.alias,
                                        })}
                                        tag={Link}
                                        to={`${match.url}/${p.alias}`}
                                    >
                                        {p.text}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                    </Col>
                </Row>
            </Container>
            <div>
                <Switch>
                    {pages.map(p => (
                        <Route
                            key={p.alias}
                            path={`${match.path}/${p.alias}`}
                            render={p.component}
                        />
                    ))}
                    <Redirect to={`${match.path}/users`} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default Index;
