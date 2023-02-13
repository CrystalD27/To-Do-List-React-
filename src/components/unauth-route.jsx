import { Navigate } from 'react-router-dom';

const UnAuthRoute = (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    const UnAuthToken = !!localStorage.getItem('userInfo')?.authToken;
    console.log(UnAuthToken);

    return UnAuthToken ? <Navigate to="/login" /> : <>{children}</>;
};
export default UnAuthRoute;
