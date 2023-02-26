import { Navigate } from 'react-router-dom';

export const AuthRoute = (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hasAuthToken = !!userInfo?.authToken;
    return hasAuthToken ? <>{children}</> : <Navigate to="/login" />;
};
