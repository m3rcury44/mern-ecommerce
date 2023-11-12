import React, {useEffect} from 'react';
import classes from './Auth.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectIsAuth} from "../../../store/auth/auth.slice";
import {fetchRegister} from "../../../store/auth/auth.action";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(selectIsAuth)

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: '',
            password: '',
            passwordAgain: ''
        },
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<{ name: string; password: string; passwordAgain: string; }> = async (values) => {
        if (values.password !== values.passwordAgain) {
            return toast.error('Passwords do not match')
        }

        if (values.name.length < 2) {
            return toast.error('Your username must contain at least 2 characters')
        }

        if (values.name.length > 12) {
            return toast.error('Your username must contain no more than 12 characters')
        }

        if (values.password.length < 5) {
            return toast.error('Your password must contain at least 5 characters')
        }

        const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
            return toast.error('Failed to register')
        }

        if (data.payload.hasOwnProperty('token')) {
            localStorage.setItem('token', data.payload.token)
        }
    }

    return (
        <section className={classes.authForm}>
            {/*<div className={errorMessage ? `${classes.errorMessage} ${classes.active}` : classes.errorMessage}>{errorMessage}</div>*/}
            <h4>Create account</h4>
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
                <label>
                    <input
                        {...register('passwordAgain', {required: 'Enter your password again'})}
                        className={errors.passwordAgain ? classes.error : ''}
                        type="password"
                        placeholder='password again'
                    />
                    <p>{errors.passwordAgain?.message}</p>
                </label>
                <button className={!isValid ? classes.disabledBtn : ''} disabled={!isValid} type='submit'>Continue
                </button>
            </form>
            <p>Already have an account? <Link to='/security/login'>Log in.</Link></p>
        </section>
    );
};

export default Register;