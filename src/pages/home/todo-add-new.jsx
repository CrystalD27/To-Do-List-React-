import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useAddToDo } from '../../apis/todos/add-todo';
export const AddNewToDo = (props) => {
    const { todoListState, getTodoList } = props;
    const [newTodo, setNewTodo] = useState('');
    const { addToDoState, addToDo } = useAddToDo();
    const addItemHandler = async () => {
        if (newTodo === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the content',
                iconColor: '#FFBF00',
            });
            return;
        }

        try {
            await addToDo({ content: newTodo });
            if (addToDoState.isError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    iconColor: '#FFBF00',
                });
                return;
            } else {
                setNewTodo('');
                Swal.fire({
                    icon: 'success',
                    title: 'The item has been added',
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: '#FFBF00',
                });
            }
            await getTodoList();
            if (todoListState.isError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    iconColor: '#FFBF00',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form>
            <div className="relative flex justify-center">
                <input
                    type="text"
                    className="mb-4 w-full rounded-xl border py-3 pl-4"
                    placeholder="Add new todo.."
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addItemHandler();
                        }
                    }}
                    value={newTodo}
                />
                <button type="button" onClick={addItemHandler} className="absolute right-2 top-2">
                    <FiPlus className="rounded-xl bg-black text-4xl text-white" />
                </button>
            </div>
        </form>
    );
};
