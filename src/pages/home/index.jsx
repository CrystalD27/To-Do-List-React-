import { MdAssignmentTurnedIn } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import background from '../../assets/img/bg.png';
import { CgClose } from 'react-icons/cg'; //CgShapeSquare, CgCheck,
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useGetTodoList } from '../../apis/todos/get-todo-list';
import { useAddToDo } from '../../apis/todos/add-todo';
// import { useDeleteToDo } from '../../apis/todos/delete-todo';
import { baseURL, getToken } from '../../utils';
// import { useEditToDo } from '../../apis/todos/edit-todo';

const Home = () => {
    const [isShownCross, setIsShownCross] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const navigate = useNavigate();
    const userInfo = localStorage.userInfo;

    const GetNickname = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo.nickname;
    };

    const logOutHandler = () => {
        localStorage.clear(userInfo);
        navigate('/login');
    };

    const { todoListState, getTodoList } = useGetTodoList();
    const { addToDoState, addToDo } = useAddToDo();
    // const { deleteToDo } = useDeleteToDo();
    // const { editToDo, editToDoState } = useEditToDo();
    useEffect(() => {
        getTodoList();
    }, []); //useEffect lifetime will interfer the data.map because first time it will be

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
    const [editingState, setEditingState] = useState({
        id: null,
        content: null,
        isEditing: false,
    });
    const editingHandler = (id, content) => {
        setEditingState({
            id,
            content,
            isEditing: true,
        });
    };

    const editToDo = async ({ content }) => {
        try {
            const payload = {
                todo: { content },
            };
            await fetch(baseURL + 'todos' + `/${editingState.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getToken(),
                },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateToDoHandler = async () => {
        try {
            await editToDo({ content: editingState.content });
            await getTodoList();
        } catch (error) {
            console.error(error);
        }
    };
    //delete single item
    const deleteToDo = async (id) => {
        await fetch(baseURL + 'todos' + `/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
        });
    };
    const deleteHandler = async (id) => {
        try {
            await deleteToDo(id);
            await getTodoList();
            Swal.fire('The item has been deleted');
        } catch (error) {
            console.error(error);
        }
    };
    const checkToDo = async (id) => {
        await fetch(baseURL + 'todos' + `/${id}` + '/toggle', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
        });
    };
    const checkHandler = async (id) => {
        try {
            await checkToDo(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section
            className="h-screen"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <div className="px-9 pt-4">
                <nav className="flex justify-between">
                    <div className="flex items-center justify-center">
                        <MdAssignmentTurnedIn />
                        <h3 className="font-bold">ONLINE TODO LIST</h3>
                    </div>
                    <div className="flex">
                        <button type="button" className="mr-6">
                            <span className="text-xl font-bold text-blue-500 underline">
                                <GetNickname />
                            </span>{' '}
                            to do list
                        </button>
                        <button onClick={logOutHandler}>Log out</button>
                    </div>
                </nav>

                <div
                    className="container mt-10 flex justify-center
                border pb-6"
                >
                    <div className=" todoList_content flex  flex-col rounded-xl border py-4">
                        <div className="inputBox relative flex justify-center">
                            <input
                                type="text"
                                className="  w-full rounded-xl border py-3 pl-4"
                                placeholder="Add new to do.."
                                onChange={(e) => setNewTodo(e.target.value)}
                                value={newTodo} //two way binding
                            ></input>
                            <button
                                type="button"
                                onClick={addItemHandler}
                                className="absolute right-2 top-2"
                            >
                                <FiPlus className=" rounded-xl bg-black text-4xl text-white " />
                            </button>
                        </div>
                        <div className="todoList_title mt-4  rounded-xl border bg-white pb-8">
                            <ul className="todoList_tab flex justify-between text-stone-500">
                                <li className="relative border-b">
                                    <button
                                        type="button"
                                        className="  px-14 py-4 content-[''] after:absolute  after:left-0 after:bottom-0  after:h-[3px] after:w-0  after:bg-stone-700 hover:text-black hover:after:w-full"
                                    >
                                        Overview
                                    </button>
                                </li>

                                <li className="relative border-b ">
                                    <button
                                        type="button"
                                        className=" py-4  px-16 content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-stone-700  hover:text-black hover:after:w-full"
                                    >
                                        Active
                                    </button>
                                </li>
                                <li className="relative border-b">
                                    <button
                                        type="button"
                                        className=" px-12  py-4 content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px]  after:w-0 after:bg-stone-700  hover:text-black hover:after:w-full"
                                    >
                                        Completed
                                    </button>
                                </li>
                            </ul>
                            <div className="todlList_list mt-2 mr-11 pl-5">
                                <ul>
                                    {/* Q3 why can't use chaining operation? */}
                                    {todoListState.data &&
                                        todoListState.data.todos.map((todo) => {
                                            return (
                                                <li
                                                    key={todo.id}
                                                    className="relative flex border-b py-4"
                                                    onMouseEnter={() => {
                                                        setIsShownCross(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setIsShownCross(false);
                                                    }}
                                                >
                                                    {/* seperate each line and show each  cross? also use hover to change color  for seperate line*/}
                                                    <input
                                                        type="checkbox"
                                                        value={!!todo.completed_at} //!!Q2 make it to boolean cuz it can't be null
                                                        onClick={() => {
                                                            checkHandler(todo.id);
                                                        }}
                                                        className="relative mr-3 h-6 w-6 rounded-full shadow"
                                                    />

                                                    {/* {deleteSingleToDo.id &&
                                                    todo.id === deleteSingleToDo.id ? (
                                                        <CgClose
                                                            // value={deleteSingleToDo.id}
                                                            className={`absolute right-0 bottom-4 text-xl ${
                                                                isShownCross ? '' : 'hidden'
                                                            }`}
                                                        />
                                                    ) : ( */}
                                                    <CgClose
                                                        type="button"
                                                        onClick={() => {
                                                            deleteHandler(todo.id);
                                                        }}
                                                        className={`absolute right-0 bottom-4 text-xl ${
                                                            isShownCross ? '' : 'hidden'
                                                        }`}
                                                    />
                                                    {editingState.isEditing &&
                                                    todo.id === editingState.id ? (
                                                        <input
                                                            value={editingState.content}
                                                            onChange={(e) => {
                                                                setEditingState((prev) => ({
                                                                    ...prev,
                                                                    content: e.target.value,
                                                                }));
                                                            }}
                                                            onBlur={updateToDoHandler}
                                                        />
                                                    ) : (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    editingHandler(
                                                                        todo.id,
                                                                        todo.content
                                                                    );
                                                                }}
                                                            >
                                                                {todo.content}
                                                            </button>
                                                        </>
                                                    )}
                                                </li>
                                            );
                                        })}
                                </ul>
                                <div>
                                    <div className="footerBox flex justify-between pl-5 pt-6 ">
                                        <p>
                                            <span className="mr-2">
                                                {todoListState.data?.todos?.filter(
                                                    (item) => !!item.completed_at
                                                )?.length ?? 0}
                                                {/* ?? if its undefined or null, it will excecute later which shows 0 */}
                                            </span>
                                            <span>active item</span>
                                        </p>
                                        <p>clear completed item</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Home;
