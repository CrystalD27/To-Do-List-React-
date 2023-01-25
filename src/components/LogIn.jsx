import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/');
        }
    }, []);
    async function login() {
        let item = { email, pass };
        let response = await fetch('https://todoo.5xcamp.us/users/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(item),
        });
        response = await response.json();
        localStorage.setItem('user-info', JSON.stringify(response));
        navigate('/');
    }

    return (
        <>
            <section className="w-1/4 ">
                <h2 className="text-center text-2xl font-bold ">Making A To Do List </h2>
                <h3 className="pb-6 text-center font-bold text-yellow-900">
                    - making your life easier -
                </h3>
                <form action="" onSubmit={submitHandler}>
                    <div className="pb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl py-3 px-4"
                            type="text"
                            placeholder="youremail@gmail.com"
                        />
                    </div>
                    <div className=" pb-6">
                        <label htmlFor="password">Password</label>
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            className="w-full rounded-xl py-3 px-4"
                            placeholder="********"
                        />
                    </div>
                    <div className="flex items-center justify-center pb-6">
                        <button
                            onClick={login}
                            type="submit"
                            className="rounded-xl  bg-slate-700 py-3 px-12 text-white"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center">
                    <button type="" className=" font-bold text-yellow-900">
                        Need an Account?
                    </button>
                </div>
            </section>
        </>
    );
};
export default LogIn;
