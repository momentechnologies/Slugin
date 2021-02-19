import React from 'react';
import cn from 'classnames';
import { Route, Switch, Redirect, matchPath, Link } from 'react-router-dom';

import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';

import Info from './Info';

const pages = [
    {
        alias: 'info',
        text: 'My info',
        component: Info,
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
                    <Redirect to={`${match.path}/info`} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default Index;
