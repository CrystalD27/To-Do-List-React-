export const baseURL = 'https://todoo.5xcamp.us/';

// export const getToken = () => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
//     return userInfo?.authToken || '';
// };

export const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo.authToken;
};
