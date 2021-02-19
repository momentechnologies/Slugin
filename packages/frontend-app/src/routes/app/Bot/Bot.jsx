import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Alert } from 'reactstrap';

import RepliesList from './RepliesList';
import EditReply from './EditReply';

import styles from './bot.module.scss';

export default props => {
    const selectedThread = null;
    if (props.error) {
        return <Alert color="danger">Something happened</Alert>;
    }

    return (
        <div className={styles.repliesWrapper}>
            <RepliesList
                replies={props.replies}
                selectedThread={selectedThread}
                baseUrl={props.match.url}
            />
            <div className={styles.reply}>
                <Switch>
                    <Route
                        path={props.match.path + '/new'}
                        render={ownProps => (
                            <EditReply
                                {...ownProps}
                                baseUrl={props.match.url}
                            />
                        )}
                    />
                    {props.replies.map(reply => (
                        <Route
                            key={reply.id}
                            path={props.match.path + '/' + reply.id}
                            render={ownProps => (
                                <EditReply {...ownProps} reply={reply} />
                            )}
                        />
                    ))}
                    {props.replies.length !== 0 ? (
                        <Redirect
                            to={`${props.match.url}/${props.replies[0].id}`}
                        />
                    ) : (
                        ''
                    )}
                </Switch>
            </div>
        </div>
    );
};
