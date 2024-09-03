import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, } from './hooks/reduxHooks';
import useApi from './hooks/useApi';
import { authActions } from './store/auth';
import { getAuthDataFromLocal, setAuthDataInLocal, } from './utils/authUtils';
const AuthenticatedRoute = props => {
    const navigate = useNavigate();
    const headerSet = useAppSelector(state => state.auth.httpHeaderSet);
    const generalInfoSet = useAppSelector(state => state.auth.generalInfoSet);
    const dispatch = useAppDispatch();
    const { sendRequest } = useApi();
    useEffect(() => {
        if (!headerSet) {
            const authData = getAuthDataFromLocal();
            if (authData) {
                setAuthDataInLocal(authData);
                dispatch(authActions.setToken(authData));
            }
            else {
                navigate('/auth');
            }
            return;
        }
    }, [headerSet, sendRequest, dispatch, navigate, generalInfoSet]);
    return _jsx(_Fragment, { children: headerSet && _jsx(props.component, {}) });
};
export default AuthenticatedRoute;
