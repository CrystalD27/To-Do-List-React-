import { baseURL, getToken } from '../../utils';

export const useDeleteToDo = () => {
    const deleteToDo = async (id) => {
        try {
            await fetch(`${baseURL}todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getToken(),
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
    return { deleteToDo };
};
