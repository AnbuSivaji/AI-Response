import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api/api.jsx';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [step, setStep] = useState(1);
	const [message, setMessage] = useState('');

	const handleRequestOtp = async () => {
		try {
			const res = await api.post('/auth/forgot-password', { email });
			setMessage(res.data.message);
			setStep(2);
		} catch {
			setMessage('Failed to send OTP');
		}
	};

	const handleResetPassword = async () => {
		try {
			const res = await api.post('/auth/forgot-password', {
				email,
				otp,
				newPassword,
			});
			setMessage(res.data.message);
			setStep(3);
		} catch {
			setMessage('Invalid OTP or error');
		}
	};

	return (
		<div
			className='container mt-5'
			style={{ maxWidth: '400px' }}
		>
			<h3 className='text-center mb-4'>Forgot Password</h3>

			{step === 1 && (
				<>
					<input
						type='email'
						className='form-control mb-3'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						className='btn btn-warning w-100'
						onClick={handleRequestOtp}
					>
						Send OTP
					</button>
				</>
			)}

			{step === 2 && (
				<>
					<input
						type='text'
						className='form-control mb-3'
						placeholder='Enter OTP'
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
					/>
					<input
						type='password'
						className='form-control mb-3'
						placeholder='New Password'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<button
						className='btn btn-success w-100'
						onClick={handleResetPassword}
					>
						Reset Password
					</button>
				</>
			)}

			{step === 3 && <div className='alert alert-success mt-3'>{message}</div>}

			{message && <p className='text-info mt-2'>{message}</p>}
			<div className='mt-3 text-center'>
				<Link to='/login'>Back to Login</Link>
			</div>
		</div>
	);
}
