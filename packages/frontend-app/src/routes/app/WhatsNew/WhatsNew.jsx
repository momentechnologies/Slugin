import React from 'react';
import {
    Col,
    Container,
    Jumbotron,
    Row,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from 'reactstrap';

const releases = [
    {
        version: '1.5',
        date: '8. mai 2019',
        description: (
            <React.Fragment>
                <ul>
                    <li>
                        We are now tracking the last seen message on the chat
                        widget.
                    </li>
                </ul>
            </React.Fragment>
        ),
    },
    {
        version: '1.4',
        date: '5. mai 2019',
        description: (
            <React.Fragment>
                <ul>
                    <li>
                        A notification pop-up now appears when a customer
                        receives a message
                    </li>
                    <li>
                        Started tracking website visitors for future features
                    </li>
                </ul>
            </React.Fragment>
        ),
    },
    {
        version: '1.3',
        date: '4. mai 2019',
        description: (
            <React.Fragment>
                <p>Chat window for clients is now mobile-friendly</p>
            </React.Fragment>
        ),
    },
    {
        version: '1.2',
        date: '1. mai 2019',
        description: (
            <React.Fragment>
                <ul>
                    <li>
                        Posibility to add an initial message to conversations to
                        improve support quality
                    </li>
                    <li>Added documentation page</li>
                    <li>Improvements to the assign button</li>
                    <li>
                        Can now click the profile picture to update first name
                        and last name
                    </li>
                    <li>
                        Add automatic linkifying of links in customer chat
                        window
                    </li>
                    <li>
                        Improve customer chat input Improve customer chat input
                    </li>
                </ul>
            </React.Fragment>
        ),
    },
    {
        version: '1.1',
        date: '28. april 2019',
        description: (
            <React.Fragment>
                <p>Many small fixes and</p>
                <ul>
                    <li>
                        We are now sending notifications correctly to business
                        owners
                    </li>
                    <li>
                        Live update when a new conversation is started and when
                        a new message is received
                    </li>
                    <li>
                        Added posibility to update notification under settings
                    </li>
                    <li>
                        Improved validation of inputs given in the chat that you
                        put on your website
                    </li>
                    <li>Improved registration</li>
                </ul>
            </React.Fragment>
        ),
    },
    {
        version: '1.0',
        date: '15. april 2019',
        description: 'First release of our website',
    },
];

export default () => (
    <Container className="mt-3">
        <Row>
            <Col>
                <Jumbotron>
                    <h2 className="display-3">What's new</h2>
                    <p className="lead">A list of our latest updates</p>
                    <p>
                        We aim to release a new version at least every 3 days.
                    </p>
                </Jumbotron>
            </Col>
        </Row>
        <Row>
            <Col>
                {releases.map((release, index) => (
                    <Card key={index} className="mb-2">
                        <CardHeader>Version: {release.version}</CardHeader>
                        <CardBody>{release.description}</CardBody>
                        <CardFooter>{release.date}</CardFooter>
                    </Card>
                ))}
            </Col>
        </Row>
    </Container>
);
