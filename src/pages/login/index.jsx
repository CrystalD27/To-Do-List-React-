import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Header from '../../components/header';
import { useLogIn } from '../../apis/users/log-in';

const Login = () => {
    const navigate = useNavigate();

    const { fetchLogIn, loginState } = useLogIn();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '456@gmail.com' },
    });

    const onSubmit = (formData) => {
        const { email, password } = formData;
        fetchLogIn({ email, password });
    };

    useEffect(() => {
        if (loginState.data) {
            localStorage.setItem(
                'userInfo',
                JSON.stringify({
                    ...loginState.data.userInfo,
                })
            );
            navigate('/');
        } else if (loginState.isError) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to log in ',
            });
        }
    }, [loginState]); // dependency is call by reference, not call by value.

    return (
        <>
            <section className="bg">
                <div className=" flex items-center justify-center gap-28 px-3  py-20">
                    <Header />
                    <section className="w-1/4 ">
                        <h2 className="text-center text-2xl font-bold ">Making A To Do List </h2>
                        <h3 className="pb-6 text-center font-bold text-yellow-900">
                            - making your life easier -
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pb-4">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'email is required',
                                        },
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'email address is not correct ',
                                        },
                                    })}
                                    className="w-full rounded-xl py-3 px-4"
                                />
                                {errors.email && (
                                    <p className="text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                            <div className=" pb-6">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full rounded-xl py-3 px-4"
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: 'password is required',
                                        },

                                        minLength: {
                                            value: 6,
                                            message: "password can't be less than 6 numbers",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-center pb-6">
                                <button
                                    type="submit"
                                    className="   w-40 rounded-xl bg-slate-700 py-3 text-white "
                                >
                                    {loginState.isLoading ? (
                                        <>
                                            <span className="  flex items-center justify-center">
                                                <AiOutlineLoading3Quarters className=" mr-3 animate-spin " />
                                                Loading...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Log in</span>
                                        </>
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
                </div>
            </section>
        </>
    );
};
export default Login;
