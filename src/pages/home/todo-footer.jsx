import { useDeleteToDo } from '../../apis/todos/delete-todo';
import Swal from 'sweetalert2';
export const ToDoFooter = (props) => {
    const { getTodoList, todoListState } = props;
    const { deleteToDo } = useDeleteToDo();
    const deleteAllHandler = async () => {
        try {
            const todoList = props.todoListState.data.todos;
            todoList.forEach(async (todo) => {
                await deleteToDo(todo.id);
            });

            await getTodoList();
            Swal.fire('All items have been deleted');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="footerBox flex justify-between pl-5 pt-6">
            <p>
                <span className="mr-2">
                    {todoListState.data?.todos?.filter((item) => !item.completed_at)?.length ?? 0}
                </span>
                <span>active item</span>
            </p>
            <button type="button" onClick={deleteAllHandler}>
                clear completed item
            </button>
        </div>
    );
};
