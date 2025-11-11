import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api/api.jsx';
import '../CSS/Login.css'; // ✅ Import CSS for this page only

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
			localStorage.setItem('role', 'USER');
			alert('Login successful!');
			navigate('/home');
		} catch (err) {
			setError('Invalid email or password');
		}
	};

	return (
		<div className='login-page'>
			<div className='login-container'>
				<h3>User Login</h3>
				<form onSubmit={handleLogin}>
					<input
						type='email'
						className='form-control'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type='password'
						className='form-control'
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
					{error && <p className='text-danger'>{error}</p>}
				</form>
				<div className='mt-3 text-center'>
					<Link to='/signup'>New user? Sign up</Link> |{' '}
					<Link to='/forgot-password'>Forgot password?</Link>
				</div>
			</div>
		</div>
	);
}
