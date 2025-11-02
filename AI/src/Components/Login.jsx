import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api/api.jsx';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/auth/login', { email, password });
			localStorage.setItem('token', res.data.token);
			alert('Login successful!');
			navigate('/chat'); // later connect to chat page
		} catch (err) {
			setError('Invalid email or password');
		}
	};

	return (
		<div
			className='container mt-5'
			style={{ maxWidth: '400px' }}
		>
			<h3 className='text-center mb-4'>User Login</h3>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					className='form-control mb-3'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					className='form-control mb-3'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button
					type='submit'
					className='btn btn-primary w-100'
				>
					Login
				</button>
				{error && <p className='text-danger mt-2'>{error}</p>}
			</form>
			<div className='mt-3 text-center'>
				<Link to='/signup'>New user? Sign up</Link> |{' '}
				<Link to='/forgot-password'>Forgot password?</Link>
			</div>
		</div>
	);
}
