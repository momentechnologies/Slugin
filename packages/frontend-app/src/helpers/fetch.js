import axios from 'axios';
import RequestError from '../errors/RequestError';

export default (url, method = 'GET', data = null, axiosOptions = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url: process.env.REACT_APP_API_URL + '/api' + url,
            data: method !== 'GET' ? data : null,
            params: method === 'GET' ? data : null,
            withCredentials: true,
            ...axiosOptions,
        })
            .then(resolve)
            .catch(error => {
                if (error.response && error.response.data) {
                    return reject(
                        new RequestError(
                            error.response.data,
                            error.response.status
                        )
                    );
                }

                reject(new RequestError('Something happened on your end', 400));
            });
    });
};
