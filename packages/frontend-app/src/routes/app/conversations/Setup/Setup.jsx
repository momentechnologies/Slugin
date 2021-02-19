import React from 'react';
import SettingSetup from '../../settings/Setup';
import Theme from '../../settings/Theme';
import InitialMessages from '../../settings/InitialMessages';
import Notifications from '../../settings/Notifications';
import Storage from '../../../../helpers/storage';

import Step from './Step';
import { Col, Container, Jumbotron, Row } from 'reactstrap';

const Setup = () => {
    const [currentStep, setCurrentStep] = React.useState(
        Storage.get('slugin_setup_last_step') === '1' ? 3 : 0
    );

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Jumbotron>
                        <h2 className="display-3">Initial setup</h2>
                        <p className="lead">
                            We will go through some steps to help you get
                            started.
                        </p>
                        <p>You can always change those settings later.</p>
                    </Jumbotron>
                </Col>
            </Row>
            <Step
                name="1. Pick the color of your widget"
                active={currentStep === 0}
                done={currentStep > 0}
            >
                <Theme onSaveDone={() => setCurrentStep(1)} />
            </Step>
            <Step
                name="2. Messages to display on every conversations"
                active={currentStep === 1}
                done={currentStep > 1}
            >
                <InitialMessages
                    onlyForm
                    onSaveDone={() => setCurrentStep(2)}
                />
            </Step>
            <Step
                name="3. Choose when to be notified"
                active={currentStep === 2}
                done={currentStep > 2}
            >
                <Notifications
                    onlyForm
                    onSaveDone={() => {
                        setCurrentStep(3);
                        Storage.set('slugin_setup_last_step', '1');
                    }}
                />
            </Step>
            <Step
                name="4. Add chat widget to your website"
                active={currentStep === 3}
                done={currentStep > 3}
            >
                <SettingSetup withContainer={false} />
            </Step>
        </Container>
    );
};

export default Setup;
