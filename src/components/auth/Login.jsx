import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import TwoFactorAuth from './TwoFactorAuth';

const Login = () => {
    const navigate = useNavigate();
    const { login, setRequires2FA } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [pendingAuth, setPendingAuth] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const loginMutation = useMutation({
        mutationFn: ({ email, password, recaptchaToken }) =>
            authService.login(email, password, recaptchaToken),
        onSuccess: (data) => {
            if (data.requires2FA) {
                setRequires2FA(true);
                setPendingAuth(data.token);
                toast.success('Please enter your 2FA code');
            } else {
                login(data.user, data.token);
                toast.success('Login successful!');
                navigate('/dashboard');
            }
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);

            if (error.response?.status === 400) {
                setError('email', { message: 'Invalid credentials' });
                setError('password', { message: 'Invalid credentials' });
            }
        },
    });

    const onSubmit = (data) => {
        if (!recaptchaToken) {
            toast.error('Please complete the reCAPTCHA verification');
            return;
        }

        loginMutation.mutate({
            ...data,
            recaptchaToken,
        });
    };

    const onRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    if (pendingAuth) {
        return <TwoFactorAuth token={pendingAuth} onSuccess={() => navigate('/dashboard')} />;
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2 className="mb-0">Welcome Back</h2>
                    <p className="mb-0 mt-2 opacity-75">Sign in to your account</p>
                </div>

                <div className="login-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter your email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password.message}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={onRecaptchaChange}
                                onExpired={() => setRecaptchaToken(null)}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-decoration-none">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Don't have an account?{' '}
                            <a href="#" className="text-decoration-none">
                                Sign up here
                            </a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;