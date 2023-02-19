import { useState } from 'react';
import { baseURL } from '../../utils';

export const useLogIn = () => {
    const [loginState, setLoginState] = useState({
        isLoading: false,
        isError: false,
        data: null,
    });

    const fetchLogIn = async ({ email, password }) => {
        try {
            setLoginState((prev) => ({
                ...prev,
                isLoading: true,
                isError: false,
                data: null,
            }));
            const payload = {
                user: {
                    email,
                    password,
                },
            };
            const response = await fetch(baseURL + 'users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            console.log(response);
            const responseData = await response.json();
            console.log(responseData);
            if (response.status === 200) {
                const authToken = response.headers.get('authorization');
                setLoginState((prev) => ({
                    ...prev,
                    isLoading: false,
                    isError: false,
                    data: {
                        userInfo: {
                            nickname: responseData.nickname,
                            email: responseData.email,
                            authToken,
                        },
                    },
                }));
            } else {
                throw 'login http status not 200';
            }
        } catch (error) {
            console.error(error);
            setLoginState((prev) => ({
                ...prev,
                isLoading: false,
                isError: true,
                data: null,
            }));
        }
    };

    return {
        fetchLogIn,
        loginState,
    };
};
