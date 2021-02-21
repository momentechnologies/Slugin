import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import MeHoc from '../../../../hComponents/Me';

import styles from './setup.module.scss';

const Content = ({ selectedOrganization }) => (
    <>
        <Row>
            <Col>
                <h2>Add html code below</h2>
                <p>
                    In order to start receiving messages you must install the
                    messenger on your website.
                </p>
                <p>Add the tag below to the bottom of the html body</p>
            </Col>
        </Row>
        <Row>
            <Col className={styles.codeSample}>
                <pre>
                    <code>
                        {`
<script>
    window.sluginSettings = {
        organizationKey: '${selectedOrganization.organizationKey}',
    };
</script>
<script src="https://cw.slugin.io/setup.js"></script>
`}
                    </code>
                </pre>
            </Col>
        </Row>
        <Row>
            <Col>
                <h3 className="mt-3">Send test message</h3>
                <p>
                    In order to continue you must send a test message from the
                    chat widget on your website.
                </p>
            </Col>
        </Row>
    </>
);

const Setup = ({ withContainer = true, ...props }) =>
    withContainer ? (
        <Container className="mt-5">
            <Content {...props} />
        </Container>
    ) : (
        <Content {...props} />
    );

export default MeHoc()(Setup);
