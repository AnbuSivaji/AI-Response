import React, { useState } from 'react';
import api from '../../Api/api.jsx';

function AdminSignup() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/admin/signup', form);
			alert(res.data.message);
		} catch (err) {
			alert(err.response?.data?.message || 'Signup failed');
		}
	};

	return (
		<div>
			<h2>Admin Signup</h2>
			<form onSubmit={handleSignup}>
				<input
					type='text'
					placeholder='Name'
					onChange={(e) => setForm({ ...form, name: e.target.value })}
				/>
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
				<button type='submit'>Signup</button>
			</form>
		</div>
	);
}

export default AdminSignup;
