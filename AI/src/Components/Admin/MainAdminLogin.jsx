import React, { useState } from 'react';
import api from '../../Api/api.jsx';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const MainAdminLogin = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/admin/main/login', formData);
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('role', 'MAIN_ADMIN');
			setMessage('');
			// ✅ FIXED PATH
			navigate('/admin/main-admin-dashboard');
		} catch (err) {
			setMessage(err.response?.data?.message || 'Login failed');
		}
	};

	return (
		<Container
			className='mt-5'
			style={{ maxWidth: '400px' }}
		>
			<h3>Main Admin Login</h3>
			{message && <Alert variant='danger'>{message}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Button
					type='submit'
					variant='primary'
					className='w-100'
				>
					Login
				</Button>
			</Form>
		</Container>
	);
};

export default MainAdminLogin;
