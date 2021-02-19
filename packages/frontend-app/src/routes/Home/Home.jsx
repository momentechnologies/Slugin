import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Button from '../../components/Button';

import styles from './home.module.scss';

import Circle from './Circle';
import GetStarted from './GetStarted';
import CircleText from './CircleText';
import Bubble from './Bubble';
import Logo from '../../components/Logo';

class Home extends React.Component {
    state = {
        email: '',
    };
    render() {
        return (
            <div className={styles.homeWrapper}>
                <div className={styles.home}>
                    <Container>
                        <Row className="pt-5">
                            <Col md={5} className={styles.slogan}>
                                Let your users
                                <br />
                                communicate
                                <br />
                                with you!
                                <br />
                                <strong>for free</strong>
                            </Col>
                            <Col md={2} style={{ paddingTop: 200 }}>
                                <Logo />
                            </Col>
                            <Col md={5}>
                                <Button size="xl" to="/register">
                                    Sign up
                                </Button>
                                <div
                                    className="mt-2"
                                    style={{ marginLeft: 60 }}
                                >
                                    2 minutes set-up | Free | Secure
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row style={{ marginTop: 200 }}>
                            <Col md={6}>
                                <GetStarted />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ offset: 2, size: 10 }}>
                                <CircleText size={600} className="text-center">
                                    <h2>Our goal</h2>
                                    <p className="mt-3">
                                        We want to provide you with the best
                                        online messaging service there is out
                                        there, for free. We are tired of having
                                        to pay monthly subscription for such a
                                        simple service.
                                    </p>
                                </CircleText>
                            </Col>
                        </Row>
                        <Row className="mt-5" style={{ marginBottom: -150 }}>
                            <Col md={{ offset: 3, size: 6 }}>
                                <Bubble color="darkGreen">
                                    <h2 className="text-center">
                                        Join us and <br />
                                        help us shaping <br />
                                        our platform.
                                    </h2>
                                </Bubble>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ offset: 2, size: 10 }}>
                                <CircleText
                                    size={600}
                                    className="text-center"
                                    color="yellow"
                                >
                                    <p>
                                        We want our customers to be satisfied,
                                        therefore we have created a page where
                                        you can vote for features you want to
                                        see happening and can also suggest new
                                        ones. You will get access to it after
                                        you have created an account
                                    </p>
                                </CircleText>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col md={6}>
                                <Bubble color="white">
                                    <h2 className="text-center">
                                        Questions
                                        <br />
                                        &<br />
                                        Answers
                                    </h2>
                                </Bubble>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col md={8}>
                                <Bubble color="darkGreenFilled" inverseTriangle>
                                    <div>
                                        <strong>
                                            1. How can you offer this for free?
                                        </strong>
                                    </div>
                                    <p className="mr-2">
                                        We are a newly created startup and we
                                        want to provide the best chat messaging
                                        platform there is out there. We will
                                        soon launch a new chat bot which will be
                                        able to answer your customer for you.
                                        This is how we plan on generating income
                                    </p>
                                    <div className="mt-3">
                                        <strong>
                                            2. How many agents can I have?
                                        </strong>
                                    </div>
                                    <p>
                                        <i>Unlimited.</i> You can add as many
                                        co-workers as you would like.
                                    </p>
                                </Bubble>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 150 }}>
                            <Col md={{ offset: 4, size: 4 }}>
                                <Button size="xl" to="/register">
                                    Sign up
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Circle size={800} top={-200} right={-100} />
                <Circle size={600} top={300} left={100} />
                <Circle size={600} top={800} left={800} />
            </div>
        );
    }
}

export default Home;
