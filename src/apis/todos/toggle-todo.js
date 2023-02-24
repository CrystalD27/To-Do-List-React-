import { baseURL, getToken } from '../../utils';

export const useToggleToDo = () => {
    const toggleToDo = async (id) => {
        try {
            await fetch(`${baseURL}todos/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getToken(),
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
    return { toggleToDo };
};
