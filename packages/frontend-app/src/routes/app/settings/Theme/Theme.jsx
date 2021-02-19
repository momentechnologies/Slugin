import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Jumbotron,
} from 'reactstrap';

import styles from './theme.module.css';
import MeHoc from '../../../../hComponents/Me';

class Theme extends Component {
    state = {
        displayColorPicker: false,
        values: {
            themeColor: '#fff',
        },
    };

    componentDidMount() {
        this.sync();
    }

    componentDidUpdate(prevProps, prevState) {
        this.sync(prevProps);
    }

    sync = prevProps => {
        if (
            (!prevProps || prevProps.settings !== this.props.settings) &&
            this.props.settings
        ) {
            this.setState({
                values: this.props.settings.reduce((state, setting) => {
                    state[setting.name] = setting.value;
                    return state;
                }, this.state.values),
            });
        }
    };

    getValue = key => {
        return this.state.values[key];
    };

    setValue = (key, value) => {
        this.setState({
            values: {
                ...this.state.values,
                [key]: value,
            },
        });
    };

    handleSubmit = e => {
        Object.keys(this.state.values)
            .map(key => ({
                name: key,
                value: this.state.values[key],
            }))
            .forEach(s => this.props.updateSetting(s.name, s.value));

        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        return (
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Jumbotron>
                            <h2 className="display-3">Theme</h2>
                            <p className="lead">
                                Use those settings to configure the theme of the
                                chat window you have on your website
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Theme Color</Label>
                                <div>
                                    <div
                                        className={styles.swatch}
                                        onClick={() =>
                                            this.setState({
                                                displayColorPicker: true,
                                            })
                                        }
                                    >
                                        <div
                                            className={styles.color}
                                            style={{
                                                backgroundColor: this.getValue(
                                                    'themeColor'
                                                ),
                                            }}
                                        />
                                    </div>
                                    {this.state.displayColorPicker ? (
                                        <div className={styles.popover}>
                                            <div
                                                className={styles.cover}
                                                onClick={() =>
                                                    this.setState({
                                                        displayColorPicker: false,
                                                    })
                                                }
                                            />
                                            <SketchPicker
                                                color={this.getValue(
                                                    'themeColor'
                                                )}
                                                onChange={color =>
                                                    this.setValue(
                                                        'themeColor',
                                                        color.hex
                                                    )
                                                }
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </FormGroup>
                            <Button>Save</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MeHoc()(Theme);
