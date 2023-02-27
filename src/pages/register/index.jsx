import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { UnAuthHeader } from '../../components/unauth-header';
import { useRegister } from '../../apis/users/register';

export const Register = () => {
    const navigate = useNavigate();
    const { fetchRegister, registerState } = useRegister();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({});
    const password = useRef({});
    password.current = watch('password', '');
    const onSubmit = (formData) => {
        const { email, password, nickname } = formData;
        fetchRegister({ email, password, nickname });
    };
    useEffect(() => {
        if (registerState.data) {
            Swal.fire({
                icon: 'success',
                title: 'Congradulations!',
                text: 'Your account has been successfully created',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FFBF00',
            });
            navigate('/login');
        } else if (registerState.isError) {
            Swal.fire({
                icon: '',
                title: 'Failed to register ',
            });
        }
    }, [registerState]);
    return (
        <section className="bg">
            <div className="flex flex-col items-center justify-center py-20 sm:flex sm:flex-row sm:gap-28">
                <UnAuthHeader className="hidden sm:block" />
                <div className="w-7/12 sm:w-1/4">
                    <h2 className="pb-6 text-center text-2xl font-bold">Creat a new account</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="pb-4">
                            <label htmlFor="email">Email</label>
                            <input
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'email is required',
                                    },
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'email address is not correct',
                                    },
                                })}
                                className="w-full rounded-xl py-3 px-4"
                                type="text"
                                placeholder="youremail@gmail.com"
                            />
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                        <div className="pb-4">
                            <label htmlFor="nickname">Nickname</label>
                            <input
                                {...register('nickname', {
                                    required: {
                                        value: true,
                                        message: 'nickname is required',
                                    },
                                })}
                                className="w-full rounded-xl py-3 px-4"
                                type="text"
                                placeholder="enter your nickname"
                                name="nickname"
                            />
                            {errors.nickname && (
                                <p className="text-red-600">{errors.nickname.message}</p>
                            )}
                        </div>
                        <div className="pb-4">
                            <label htmlFor="password">Password</label>
                            <input
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
                                className="w-full rounded-xl py-3 px-4"
                                type="password"
                                placeholder="enter your password"
                                name="password"
                            />
                            {errors.password && (
                                <p className="text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="pb-4">
                            <label htmlFor="repeatPassword">Confirm Password</label>
                            <input
                                {...register('repeatPassword', {
                                    validate: (value) =>
                                        value === password.current || 'The passwords do not match',
                                })}
                                className="w-full rounded-xl py-3 px-4"
                                type="password"
                                placeholder="enter your password"
                                name="repeatPassword"
                            />
                            {errors.repeatPassword && (
                                <p className="text-red-600">{errors.repeatPassword.message}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-center pb-6">
                            <button
                                type="submit"
                                className="w-40 rounded-xl bg-slate-700 py-3 text-white"
                            >
                                {registerState.isLoading ? (
                                    <>
                                        <span className="flex items-center justify-center">
                                            <AiOutlineLoading3Quarters className="mr-3 animate-spin" />
                                            Loading...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>Register</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center">
                        <button className="font-bold text-yellow-900" onClick={() => navigate('/')}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
