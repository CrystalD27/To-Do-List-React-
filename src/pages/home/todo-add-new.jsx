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
            Swal.fire('Please enter content'); //if the content is empty, it will be stored to arry,,,how to avoid it
            return;
        }

        try {
            await addToDo({ content: newTodo });
            if (addToDoState.isError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
                return;
            } else {
                setNewTodo('');
                Swal.fire('The item has been added');
            }
            await getTodoList();
            if (todoListState.isError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
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
                    className="w-full rounded-xl border py-3 pl-4"
                    placeholder="Add new todo.."
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addItemHandler();
                        }
                    }}
                    value={newTodo}
                ></input>
                <button type="button" onClick={addItemHandler} className="absolute right-2 top-2">
                    <FiPlus className="rounded-xl bg-black text-4xl text-white" />
                </button>
            </div>
        </form>
    );
};
