import { Navigate } from 'react-router-dom';

const AuthRoute = (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    const hasAuthToken = !localStorage.getItem('userInfo')?.authToken;
    console.log(hasAuthToken);
    return hasAuthToken ? <>{children}</> : <Navigate to="/login" />;
};
export default AuthRoute;