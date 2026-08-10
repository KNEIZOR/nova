import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { loginSchema, type LoginFormValues } from '../../schema';

import './LoginForm.scss';

export function LoginForm() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        setServerError('');

        try {
            await login(values);

            navigate('/admin', {
                replace: true,
            });
        } catch (error) {
            setServerError(
                error instanceof Error ? error.message : 'Не удалось войти',
            );
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form__field">
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    {...register('email')}
                />

                {errors.email && (
                    <span className="login-form__error">
                        {errors.email.message}
                    </span>
                )}
            </div>

            <div className="login-form__field">
                <label htmlFor="password">Пароль</label>

                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register('password')}
                />

                {errors.password && (
                    <span className="login-form__error">
                        {errors.password.message}
                    </span>
                )}
            </div>

            {serverError && (
                <div className="login-form__server-error">{serverError}</div>
            )}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Входим...' : 'Войти'}
            </button>
        </form>
    );
}
