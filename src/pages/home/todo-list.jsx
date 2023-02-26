import { ToDo } from './todo';
export const ToDoList = (props) => {
    const { todoList, getTodoList } = props;

    return (
        <ul className="pb-6">
            {todoList.map((todo) => (
                <ToDo
                    key={todo.id}
                    id={todo.id}
                    completedAt={todo.completed_at}
                    content={todo.content}
                    getTodoList={getTodoList}
                />
            ))}
        </ul>
    );
};
