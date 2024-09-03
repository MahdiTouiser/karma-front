import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { authActions } from '../store/auth';
import { removeAuthDataFromLocal } from '../utils/authUtils';
import { useAppDispatch, useAppSelector } from './reduxHooks';
export const axiosIntance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});
export default function useApi() {
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState(undefined);
    const [data, setData] = useState(null);
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();
    const sendRequest = useCallback(async function (config, applyData, onError) {
        setIsPending(true);
        try {
            const response = await axiosIntance.request(config);
            setData(response.data);
            if (applyData) {
                applyData(response.data);
            }
            setErrors(undefined);
        }
        catch (error) {
            const axiosError = error;
            setErrors(axiosError.response?.data);
            if (onError) {
                onError(axiosError.response?.data);
            }
        }
        finally {
            setIsPending(false);
        }
    }, []);
    useEffect(() => {
        if (token) {
            axiosIntance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axiosIntance.interceptors.response.use(response => {
                return response;
            }, (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    removeAuthDataFromLocal();
                    dispatch(authActions.logOut());
                    return;
                }
                return Promise.reject(error);
            });
            dispatch(authActions.setHttpHeader());
        }
    }, [token, dispatch]);
    return { isPending, errors, sendRequest, data };
}
