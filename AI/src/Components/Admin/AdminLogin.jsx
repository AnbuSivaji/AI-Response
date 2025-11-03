import React, { useState } from 'react';
import api from '../../Api/api.jsx';

function AdminLogin() {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/admin/login', form);
			localStorage.setItem('token', res.data.token);
			alert('Admin Logged In');
		} catch (err) {
			alert(err.response?.data?.message || 'Login failed');
		}
	};

	return (
		<div>
			<h2>Admin Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					placeholder='Email'
					onChange={(e) => setForm({ ...form, email: e.target.value })}
				/>
				<input
					type='password'
					placeholder='Password'
					onChange={(e) => setForm({ ...form, password: e.target.value })}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}

export default AdminLogin;
