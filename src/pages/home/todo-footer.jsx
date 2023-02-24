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
            completedTodos.forEach(async (todo) => {
                await deleteToDo(todo.id);
            });
            await getTodoList();
            console.log(completedTodos);
            if (completedTodos.length === 0) {
                Swal.fire('There is no complted item');
            } else {
                Swal.fire('Completed items have been deleted');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="footerBox flex justify-between pl-5 pt-6">
            <p>
                <span className="mr-2">{activeTodoCount}</span>
                <span>{activeTodoText}</span>
            </p>
            <button className="text-gray-400" type="button" onClick={deleteAllHandler}>
                clear completed items
            </button>
        </div>
    );
};
