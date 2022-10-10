import { useCallback, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    if (action.type === 'PENDING')
        return { pending: true, status: 'pending', result: 'pending' };
    if (action.type === 'SUCCESS')
        return { pending: false, status: 'completed', result: 'success' };
    if (action.type === 'ERROR')
        return { pending: false, status: 'completed', result: 'error' };
    if (action.type === 'RESET') return { pending: false, status: '', result: '' };
    return state;
};

const useFetch = (pending = false) => {
    const [fetchState, dispatch] = useReducer(reducer, {
        pending,
        status: '',
        result: '',
    });

    const sendRequest = useCallback(async (reqConfig, dataHandler = () => {}) => {
        dispatch({ type: 'PENDING' });

        try {
            const res = await axios(reqConfig);
            dataHandler(res.data);

            dispatch({ type: 'SUCCESS' });
        } catch (err) {
            dispatch({ type: 'ERROR' });
            console.error(err);
        }

        setTimeout(() => dispatch({ type: 'RESET' }), 5000);
    }, []);

    return {
        sendRequest,
        pending: fetchState.pending,
        result: fetchState.result,
        status: fetchState.status,
    };
};

export default useFetch;
