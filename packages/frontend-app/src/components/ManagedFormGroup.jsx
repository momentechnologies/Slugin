import React from 'react';
import { FormFeedback, FormGroup } from 'reactstrap';

const getError = (error, inputKey) => {
    if (!error || error.key !== 'validation_failed') {
        return false;
    }

    const inputErrors = error.error.errors.filter(e => e.key === inputKey);

    if (inputErrors.length === 0) {
        return false;
    }

    return inputErrors.map(ie => ie.message);
};

export default ({ error, inputKey, children, otherProps }) => {
    const inputErrors = getError(error, inputKey);

    return (
        <FormGroup {...otherProps}>
            {children(inputErrors)}
            {inputErrors
                ? inputErrors.map((message, index) => (
                      <FormFeedback key={index}>{message}</FormFeedback>
                  ))
                : null}
        </FormGroup>
    );
};
