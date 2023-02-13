import { baseURL } from '../../utils';
import { useState } from 'react';
export const useGetData = () => {
    const [data, setData] = useState({});
    const fetchData = async () => {
        try {
            const userInfo = localStorage.userInfo;
            const token = JSON.parse(userInfo).authToken;
            const response = await fetch(baseURL + 'todos', {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (response == '') {
                throw 'login http status not 200';
            }
            const data = await response.json();
            setData(data);
            //mistake with data in useState
        } catch (error) {
            console.log(error.message);
        }
    };
    return { fetchData, data };
};
