import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api/api.jsx';
import '../CSS/Signup.css'; // ✅ Import CSS for this page only

export default function Signup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		try {
			const res = await api.post('/auth/signup', {
				username,
				email,
				password,
				confirmPassword,
			});
			alert(res.data.message);
			navigate('/login');
		} catch (err) {
			alert('Signup failed. Try again.');
		}
	};

	return (
		<div
			className='container mt-5'
			style={{ maxWidth: '400px' }}
		>
			<h3 className='text-center mb-4'>User Signup</h3>
			<form onSubmit={handleSignup}>
				<input
					type='text'
					className='form-control mb-3'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
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
				<input
					type='password'
					className='form-control mb-3'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button
					type='submit'
					className='btn btn-success w-100'
				>
					Sign Up
				</button>
			</form>
			<div className='mt-3 text-center'>
				<Link to='/login'>Already have an account? Login</Link>
			</div>
		</div>
	);
}
