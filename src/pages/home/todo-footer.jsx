import { useDeleteToDo } from '../../apis/todos/delete-todo';
import Swal from 'sweetalert2';
export const ToDoFooter = (props) => {
    const { getTodoList, todoListState } = props;
    const { deleteToDo } = useDeleteToDo();
    const activeTodoCount =
        todoListState.data?.todos?.filter((item) => !item.completed_at)?.length ?? 0;
    const activeTodoText = activeTodoCount <= 1 ? 'active item' : 'active items';
    const deleteAllHandler = async () => {
        try {
            const completedTodos = todoListState.data?.todos?.filter((todo) => todo.completed_at);
            await Promise.all(completedTodos.map((todo) => deleteToDo(todo.id)));
            await getTodoList();
            if (completedTodos.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There is no completed item',
                    iconColor: '#FFBF00',
                });
                Swal.fire('There is no completed item');
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Completed items have been deleted',
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: '#FFBF00',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-between sm:pl-5">
            <p>
                <span className="mr-2 sm:mr-2">{activeTodoCount}</span>
                <span>{activeTodoText}</span>
            </p>
            <button className="text-gray-400" type="button" onClick={deleteAllHandler}>
                clear completed items
            </button>
        </div>
    );
};
