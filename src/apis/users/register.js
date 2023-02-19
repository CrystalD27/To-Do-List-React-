import { useState } from 'react';
import { baseURL } from '../../utils';

export const useRegister = () => {
    const [registerState, setRegisterState] = useState({
        isLoading: false,
        isError: false,
        data: null,
    });
    const fetchRegister = async ({ email, nickname, password }) => {
        try {
            setRegisterState((prev) => ({
                ...prev,
                isLoading: true,
                // isError: false,
                // data: null,
            }));
            const payload = {
                user: {
                    email,
                    nickname,
                    password,
                },
            };
            const response = await fetch(baseURL + 'users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log(responseData);
            if (response.status === 201) {
                setRegisterState((prev) => ({
                    ...prev,
                    isLoading: false,
                    // isError: false,
                    data: responseData,
                }));
            } else {
                throw 'login http status not 201';
            }
        } catch (error) {
            console.error(error);
            setRegisterState((prev) => ({
                ...prev,
                // isLoading: false,
                isError: true,
                // data: null,
            }));
        }
    };
    return {
        fetchRegister,
        registerState,
    };
};
