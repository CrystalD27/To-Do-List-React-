import { useState } from 'react';
import { baseURL, getToken } from '../../utils';

export const useGetTodoList = () => {
    const [todoListState, setTodoListState] = useState({
        data: null,
        isError: false,
        isLoading: false,
    });
    const getTodoList = async () => {
        try {
            setTodoListState((prev) => ({ ...prev, isError: false, isLoading: true }));
            const response = await fetch(baseURL + 'todos', {
                headers: {
                    Authorization: getToken(),
                },
            });
            const responseData = await response.json();
            if (response.status === 200) {
                setTodoListState((prev) => ({ ...prev, data: responseData }));
            } else {
                throw 'http status is not 200';
            }
        } catch (error) {
            console.error(error);
            setTodoListState((prev) => ({ ...prev, isError: true, data: null }));
        } finally {
            setTodoListState((prev) => ({ ...prev, isLoading: false }));
        }
    };
    return { getTodoList, todoListState };
};
