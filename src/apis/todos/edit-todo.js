// import { useState } from 'react';
// import { baseURL, getToken } from '../../utils';

// export const useEditToDo = () => {
//     const editToDo = async ({ id, content }) => {
//         try {
//             const payload = {
//                 todo: { content },
//             };
//             await fetch(baseURL + 'todos' + `/${editingState.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: getToken(),
//                 },
//                 body: JSON.stringify(payload),
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     return { editToDo };
// };
