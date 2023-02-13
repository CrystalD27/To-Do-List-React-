import { MdAssignmentTurnedIn } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import background from '../../assets/img/bg.png';
import { CgClose } from 'react-icons/cg'; //CgShapeSquare, CgCheck,
import { useTodosAdd } from '../../apis/todos/todosAdd.post';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseURL } from '../../utils';
import { useState, useEffect } from 'react';
import { useGetData } from '../../apis/todos/todosList.get';

const Home = () => {
    const [items, setItems] = useState([]);
    const [itemData, setItemData] = useState({});
    const [newItem, setNewItem] = useState('');
    const navigate = useNavigate();
    const userInfo = localStorage.userInfo;
    const nickname = JSON.parse(userInfo).nickname;

    //log out
    const logOutHandler = () => {
        localStorage.clear(userInfo);
        navigate('/login');
    };

    const { fetchData, data } = useGetData();

    useEffect(() => {
        if (userInfo) {
            fetchData(data);
        } else if (!userInfo) {
            console.log('no auth');
        }
    }, []);

    // //add an item
    const addItemHandler = async (e) => {
        const item = {
            id: Math.floor(Math.random() * 1000),
            value: newItem,
        };
        setItems((oldList) => [...oldList, item]);
        setNewItem(''); //two way binding
        e.preventDefault();
        if (newItem == '') {
            Swal.fire('Please enter content'); //if the content is empty, it will be stored to arry,,,how to avoid it
        } else {
            try {
                const payload = {
                    todo: {
                        content: `${item.value}`,
                    },
                };
                const userInfo = localStorage.userInfo;
                const token = JSON.parse(userInfo).authToken;
                const response = await fetch(baseURL + 'todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                setItemData(data);
                console.log(itemData, data); // get data?itemData?
                fetchData(data);
                if (response.status === 201) {
                    Swal.fire('The item has been added');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                }
            } catch (error) {
                console.log(error);
            }
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
                                {nickname}
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
                                placeholder="Add new to do list..."
                                onChange={(e) => setNewItem(e.target.value)}
                                value={newItem} //two way binding
                            ></input>
                            <button onClick={addItemHandler} className="absolute right-2 top-2">
                                <FiPlus className=" rounded-xl bg-black text-4xl text-white " />
                            </button>
                        </div>
                        <div className="todoList_title mt-4  rounded-xl border bg-white pb-8">
                            <ul className="todoList_tab flex justify-between text-stone-500">
                                <li className="relative border-b" key={itemData.id}>
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
                            <div className="todlList_list mt-2  pl-5 pr-12">
                                <ul>
                                    {items.map((item) => {
                                        return (
                                            <li key={item.id} className="border-b">
                                                <label className="todoList_label relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        value="completed"
                                                        className="relative h-6 w-6 rounded-full shadow"
                                                    />

                                                    <div className="flex items-center  py-4 pl-4 ">
                                                        <div
                                                            className="flex items-center  hover:text-black"
                                                            key={item.id}
                                                        ></div>{' '}
                                                        <button>
                                                            {' '}
                                                            <CgClose className="absolute right-[-2rem] bottom-4 text-xl  text-white  hover:text-black" />
                                                            {item.value}
                                                        </button>
                                                    </div>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div>
                                    <div className="footerBox flex justify-between  pl-5 pt-6 ">
                                        <p>0 active item</p>
                                        <p>remove completed item</p>
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
