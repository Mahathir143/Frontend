import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Shield } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

const TwoFactorAuth = ({ token, onSuccess }) => {
    const { login } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const verify2FAMutation = useMutation({
        mutationFn: ({ code }) => authService.verify2FA(token, code),
        onSuccess: (data) => {
            login(data.user, data.token);
            toast.success('Authentication successful!');
            onSuccess();
        },
        onError: (error) => {
            const message = error.response?.data?.message || '2FA verification failed';
            toast.error(message);
        },
    });

    const onSubmit = (data) => {
        verify2FAMutation.mutate(data);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <Shield size={48} className="mb-3" />
                    <h2 className="mb-0">Two-Factor Authentication</h2>
                    <p className="mb-0 mt-2 opacity-75">
                        Enter the 6-digit code from your authenticator app
                    </p>
                </div>

                <div className="login-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="form-label">Authentication Code</label>
                            <input
                                type="text"
                                className={`form-control text-center ${errors.code ? 'is-invalid' : ''}`}
                                placeholder="000000"
                                maxLength="6"
                                style={{ fontSize: '1.5rem', letterSpacing: '0.5rem' }}
                                {...register('code', {
                                    required: 'Authentication code is required',
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message: 'Code must be 6 digits',
                                    },
                                })}
                            />
                            {errors.code && (
                                <div className="invalid-feedback">{errors.code.message}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={verify2FAMutation.isPending}
                        >
                            {verify2FAMutation.isPending ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Verifying...
                                </>
                            ) : (
                                'Verify Code'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Didn't receive a code?{' '}
                            <a href="#" className="text-decoration-none">
                                Resend code
                            </a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorAuth;