import React, { useState } from 'react';
import api from '../../Api/api.jsx';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AdminSignup = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/admin/signup', formData);
			setMessage(res.data.message);
			setTimeout(() => navigate('/admin/login'), 1500);
		} catch (err) {
			setMessage(err.response?.data?.message || 'Signup failed');
		}
	};

	return (
		<Container
			className='mt-5'
			style={{ maxWidth: '400px' }}
		>
			<h3>Admin Signup</h3>
			{message && <Alert variant='info'>{message}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</Form.Group>
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
					Signup
				</Button>
			</Form>
		</Container>
	);
};

export default AdminSignup;
