import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/');
        }
    }, []);
    const login = async () => {
        setIsLoading(true);
        try {
            const payload = {
                user: {
                    email,
                    password,
                },
            };
            const response = await fetch('https://todoo.5xcamp.us/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            const authToken = response.headers.get('authorization');
            localStorage.setItem(
                'user-info',
                JSON.stringify({
                    ...data,
                    message: undefined,
                })
            );
            localStorage.setItem('authToken', authToken);
            navigate('/');
        } catch (error) {
            alert('系統錯誤');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const {
        register, //state
        handleSubmit,
        // watch, //can get value of register from useForm (can only do eventlistner)
        control, // to know which one is current rigister
        getValues, //get current value
        // setValue, //write new value
        formState: { errors },
    } = useForm({
        defaultValues: { email: '456@gmail.com' },
    });
    const onSubmit = (formData) => {
        console.log(formData);
    };
    console.log('errors:', errors);
    //useWatch+useEffect can monitor the specific value
    const watchForm = useWatch({ control });
    useEffect(() => {
        console.log('getValues:', getValues());
    }, [watchForm]);
    // const submitHandler = (e) => {
    //     e.preventDefault();
    // };

    return (
        <>
            <section className="w-1/4 ">
                <h2 className="text-center text-2xl font-bold ">Making A To Do List </h2>
                <h3 className="pb-6 text-center font-bold text-yellow-900">
                    - making your life easier -
                </h3>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="pb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            // {...register('email', {
                            //     required: {
                            //         value: true,
                            //         message: 'email is a required filed',
                            //     },
                            //     pattern: {
                            //         value: /^\S+@\S+$/i,
                            //         message: 'email address is not correct ',
                            //     },
                            // })}
                            className="w-full rounded-xl py-3 px-4"
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                    <div className=" pb-6">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-full rounded-xl py-3 px-4"
                            // {...register('password', {
                            //     required: {
                            //         value: true,
                            //         message: 'password is a required filed',
                            //     },

                            //     minLength: {
                            //         value: 6,
                            //         message: "password can't be less than 6 numbers",
                            //     },
                            // })}
                        />
                        {errors.password && (
                            <p className="text-red-600">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center pb-6">
                        <button
                            onClick={login}
                            type="submit"
                            className="rounded-xl  bg-slate-700 py-3 px-12 text-white"
                        >
                            {isLoading ? (
                                <>
                                    <div type="button" className=" flex  bg-slate-700" disabled>
                                        <svg className=" animation: spin 2s linear infinite; mr-3 h-6 w-6 animate-spin  bg-white"></svg>
                                        Loading...
                                    </div>
                                </>
                            ) : (
                                'Log in'
                            )}
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => navigate('/register')}
                        className=" font-bold text-yellow-900"
                    >
                        Need an Account?
                    </button>
                </div>
            </section>
        </>
    );
};
export default LogIn;
