import { baseURL, getToken } from '../../utils';
import { useState } from 'react';

export const useToggleToDo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toggleToDo = async (id) => {
        try {
            await fetch(`${baseURL}todos/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getToken(),
                },
            });
            setIsLoading(true);
        } catch (error) {
            console.error(error);
            setIsLoading(true);
        } finally {
            setIsLoading(false);
        }
    };
    return { toggleToDo, isLoading };
};
