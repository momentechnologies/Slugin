import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import Loader from '../components/Loader';

export default (
    options = {
        fetch: [],
        select: {},
    }
) => WrappedComponent => {
    class Fetcher extends React.Component {
        componentDidMount() {
            options.fetch.forEach(fetchFn => {
                this.props.dispatch(fetchFn(this.props));
            });
        }

        componentDidUpdate() {
            options.fetch.forEach(fetchFn => {
                this.props.dispatch(fetchFn(this.props));
            });
        }

        isLoading = () => {
            return !!Object.keys(options.select).find(
                key => this.props[key].meta.loading
            );
        };

        hasError = () => {
            return !!Object.keys(options.select).find(
                key => this.props[key].meta.error
            );
        };

        render() {
            if (this.isLoading()) {
                return <Loader />;
            }

            if (this.hasError()) {
                return <Alert color="danger">Noe skjedde</Alert>;
            }

            return <WrappedComponent {...this.props} />;
        }
    }

    return connect((state, ownProps) => {
        return Object.keys(options.select).reduce((componentState, key) => {
            componentState[key] = options.select[key](state, ownProps);
            return componentState;
        }, {});
    })(Fetcher);
};
