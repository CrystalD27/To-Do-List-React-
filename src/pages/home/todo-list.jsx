const getToDoList = () => {
    return (
        <>
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
        </>
    );
};

export default getToDoList;
