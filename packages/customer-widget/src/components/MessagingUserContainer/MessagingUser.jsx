import React, { useEffect } from 'react';
import Loader from '../Loader';

export default props => {
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if (!props.messagingUserToken) {
            setLoading(true);
            props.createMessagingUserToken().then(() => setLoading(false));
        }
    }, []);

    if (props.messagingUserToken) {
        return props.children(props.messagingUserToken, false);
    }

    if (loading) {
        return <Loader />;
    }

    return <div>Something happened</div>;
};
