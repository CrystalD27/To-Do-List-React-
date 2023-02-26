import { useState, useEffect, useMemo } from 'react';
import { Header } from '../../components/header';
import { AddNewToDo } from './todo-add-new';
import { ToDoList } from './todo-list';
import { ToDoFooter } from './todo-footer';
import { useGetTodoList } from '../../apis/todos/get-todo-list';

export const Home = () => {
    const { todoListState, getTodoList } = useGetTodoList();

    const typeList = [
        {
            type: 'all',
            text: 'All',
        },

        {
            type: 'active',
            text: 'Active',
        },
        {
            type: 'completed',
            text: 'Completed',
        },
    ];
    const [typeState, setTypeState] = useState(typeList[0].type);
    const todoList = useMemo(() => {
        if (todoListState.data === null) {
            return [];
        }
        if (typeState === 'all') {
            return todoListState.data.todos;
        } else if (typeState === 'active') {
            return todoListState.data.todos.filter((todo) => todo.completed_at === null);
        } else if (typeState === 'completed') {
            return todoListState.data.todos.filter((todo) => todo.completed_at !== null);
        }
    }, [todoListState.data, typeState]);
    console.log(todoListState);
    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <section className="h-screen bg-[url('assets/img/bg.png')] bg-cover bg-no-repeat p-4">
            <div className="px-9">
                <Header />
                <div className="flex justify-center pb-6">
                    <div className="flex flex-col rounded-xl py-4">
                        <AddNewToDo todoListState={todoListState} getTodoList={getTodoList} />
                        {todoListState?.data?.todos.length === 0 ? (
                            <div className="mt-14">
                                <p className="mb-4 text-center text-xl">There is no todo</p>
                                <img
                                    className="w-[487.3px]"
                                    src="/src/assets/img/empty.png"
                                    alt="empty"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl bg-white pb-8">
                                <ul className="mb-2 flex justify-between text-stone-500">
                                    {typeList.map((item) => (
                                        <li key={item.type} className="relative border-b">
                                            <button
                                                type="button"
                                                className={`px-14 py-4 ${
                                                    item.type === typeState
                                                        ? ' text-black after:w-full'
                                                        : ''
                                                } after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-stone-700 after:content-[''] hover:text-black hover:after:w-full`}
                                                onClick={() => {
                                                    setTypeState(item.type);
                                                }}
                                            >
                                                {item.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mr-11 pl-5">
                                    <ToDoList todoList={todoList} getTodoList={getTodoList} />
                                    <ToDoFooter
                                        todoListState={todoListState}
                                        getTodoList={getTodoList}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
