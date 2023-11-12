import React, {useEffect} from 'react';
import classes from './Auth.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectIsAuth} from "../../../store/auth/auth.slice";
import {fetchLogin} from "../../../store/auth/auth.action";
import {toast} from "react-toastify";

const Register = () => {
    const navigate = useNavigate()
    const isAuth = useAppSelector(selectIsAuth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    })

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<{ name: string; password: string; }> = async (values) => {
        const data = await dispatch(fetchLogin(values))

        if (!data.payload) {
            return toast.error('Invalid password or name')
        }

        if (data.payload.hasOwnProperty('token')) {
            localStorage.setItem('token', data.payload.token)
        }
    }

    return (
        <section className={classes.authForm}>
            <h4>Log in</h4>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <label>
                    <input
                        {...register('name', {required: 'Enter your name'})}
                        className={errors.name ? classes.error : ''}
                        type="text"
                        placeholder='name'
                    />
                    <p>{errors.name?.message}</p>
                </label>
                <label>
                    <input
                        {...register('password', {required: 'Enter your password'})}
                        className={errors.password ? classes.error : ''}
                        type="password"
                        placeholder='password'
                    />
                    <p>{errors.password?.message}</p>
                </label>
                <button className={!isValid ? classes.disabledBtn : ''} disabled={!isValid} type='submit'>Continue
                </button>
            </form>
            <p>Don't have an account? <Link to='/security/register'>Register now!</Link></p>
        </section>
    );
};

export default Register;