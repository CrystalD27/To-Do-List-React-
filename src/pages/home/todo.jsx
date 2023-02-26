import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { useToggleToDo } from '../../apis/todos/toggle-todo';
import { useDeleteToDo } from '../../apis/todos/delete-todo';
import { useEditToDo } from '../../apis/todos/edit-todo';

export const ToDo = (props) => {
    const { id, completedAt, content, getTodoList } = props;
    const [isShownCross, setIsShownCross] = useState(false);
    const { toggleToDo } = useToggleToDo();
    const { deleteToDo } = useDeleteToDo();
    const { editToDo } = useEditToDo();
    const [editingState, setEditingState] = useState({
        id: null,
        content: null,
        isEditing: false,
    });
    const checkHandler = async (id) => {
        try {
            await toggleToDo(id);
            await getTodoList();
            Swal.fire({
                icon: 'success',
                title: 'The item has been updated',
                showConfirmButton: false,
                timer: 1500,
                iconColor: '#FFBF00',
            });
        } catch (error) {
            console.error(error);
        }
    };
    const deleteHandler = async (id) => {
        try {
            await deleteToDo(id);
            await getTodoList();
            Swal.fire({
                icon: 'success',
                title: 'The item has been deleted',
                showConfirmButton: false,
                timer: 1500,
                iconColor: '#FFBF00',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateToDoHandler = async () => {
        try {
            await editToDo({ id: editingState.id, content: editingState.content });
            await getTodoList();
        } catch (error) {
            console.error(error);
        }
    };
    const editingHandler = (id, content) => {
        setEditingState({
            id,
            content,
            isEditing: true,
        });
    };

    return (
        <li
            key={id}
            className="relative flex border-b py-4"
            onMouseEnter={() => {
                setIsShownCross(true);
            }}
            onMouseLeave={() => {
                setIsShownCross(false);
            }}
        >
            <input
                type="checkbox"
                checked={!!completedAt}
                onChange={() => {
                    checkHandler(id, completedAt);
                }}
                className="relative mr-3 h-6 w-6 rounded-full shadow"
            />

            <CgClose
                type="button"
                onClick={() => {
                    deleteHandler(id);
                }}
                className={`absolute right-0 bottom-4 text-xl ${isShownCross ? '' : 'hidden'}`}
            />
            {editingState.isEditing && id === editingState.id ? (
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
                            editingHandler(id, content);
                        }}
                    >
                        <div className={!completedAt ? '' : 'text-gray-400 line-through'}>
                            {content}
                        </div>
                    </button>
                </>
            )}
        </li>
    );
};
