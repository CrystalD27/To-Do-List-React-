import { useState } from 'react';
import { baseURL, getToken } from '../../utils';

export const useAddToDo = () => {
    const [addToDoState, setAddToDoState] = useState({
        isError: false,
        isLoading: false,
    });
    const addToDo = async ({ content }) => {
        try {
            setAddToDoState((prev) => ({
                ...prev,
                isError: false,
                isLoading: true,
            }));
            const payload = {
                todo: {
                    content,
                },
            };
            await fetch(baseURL + 'todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getToken(),
                },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.log(error);
            setAddToDoState((prev) => ({
                ...prev,
                isError: true,
            }));
        } finally {
            setAddToDoState((prev) => ({
                ...prev,
                isLoading: false,
            }));
        }
    };
    return { addToDo, addToDoState };
};
