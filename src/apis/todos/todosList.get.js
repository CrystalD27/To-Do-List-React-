import { baseURL } from '../../utils';
import { useState } from 'react';
export const useGetData = () => {
    const [data, setData] = useState({
        data: null,
    });
    const fetchData = async () => {
        try {
            const userInfo = localStorage.userInfo;
            const token = JSON.parse(userInfo).authToken;
            const response = await fetch(baseURL + 'todos', {
                headers: {
                    Authorization: `${token}`,
                },
            });
            const responseData = await response.json();
            console.log(responseData);
            if (data) {
                setData({ data: responseData });
            } else {
                throw 'http status is not 201';
            }

            //mistake with data in useState?
        } catch (error) {
            console.error(error);
            setData({ data: null });
        }
    };
    return { fetchData, data };
};
