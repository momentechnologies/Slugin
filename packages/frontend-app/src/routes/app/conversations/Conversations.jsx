import React, { useEffect } from 'react';
import { Alert } from 'reactstrap';
import { matchPath, Redirect, Route, Switch } from 'react-router-dom';

import Loader from '../../../components/Loader';
import Conversation from './Conversation';
import Setup from './Setup';
import Threads from './Threads';
import Filters from './Filters';
import styles from './styles.module.scss';

export default ({ filters, displaySetup, ...props }) => {
    if (displaySetup) {
        return <Setup />;
    }

    if (props.error) {
        return <Alert color="danger">SomethingHappened</Alert>;
    }

    useEffect(() => {
        props.subscribe();
    }, []);

    const threadMatch = matchPath(props.location.pathname, {
        path: props.match.path + '/:threadId',
        exact: false,
    });

    const selectedThread = threadMatch
        ? parseInt(threadMatch.params.threadId)
        : null;

    return (
        <div className={styles.conversations}>
            <Filters filters={filters} onFilterChange={props.onFilterChange} />
            <Threads
                threads={props.data.threads}
                selectedThread={selectedThread}
                loading={props.loading}
            />
            <div className={styles.conversation}>
                {props.loading ? (
                    <Loader />
                ) : (
                    <Switch>
                        {props.data.threads.map(t => (
                            <Route
                                key={t.id}
                                path={props.match.path + '/' + t.id}
                                render={ownProps => (
                                    <Conversation {...ownProps} thread={t} />
                                )}
                            />
                        ))}
                        {props.data.threads.length !== 0 ? (
                            <Redirect
                                to={`${props.match.url}/${
                                    props.data.threads[0].id
                                }`}
                            />
                        ) : (
                            ''
                        )}
                    </Switch>
                )}
            </div>
        </div>
    );
};
