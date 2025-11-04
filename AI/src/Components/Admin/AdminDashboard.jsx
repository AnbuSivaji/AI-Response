import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';
import { Table, Button, Container, Alert } from 'react-bootstrap';

export default function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState('');

	const fetchUsers = async () => {
		try {
			const res = await api.get('/admin/users/all');
			setUsers(res.data);
		} catch {
			setMessage('Failed to load users');
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const toggleUser = async (id) => {
		try {
			const res = await api.put(`/admin/users/toggle/${id}`);
			setMessage(res.data.message);
			fetchUsers();
		} catch {
			setMessage('Failed to toggle user status');
		}
	};

	const deleteUser = async (id) => {
		try {
			const res = await api.delete(`/admin/users/delete/${id}`);
			setMessage(res.data.message);
			fetchUsers();
		} catch {
			setMessage('Failed to delete user');
		}
	};

	return (
		<Container className='mt-5'>
			<h3>Admin Dashboard 🎬</h3>
			<p>Manage Users</p>
			{message && <Alert variant='info'>{message}</Alert>}

			<Table
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((u) => (
						<tr key={u.id}>
							<td>{u.id}</td>
							<td>{u.username}</td>
							<td>{u.email}</td>
							<td>{u.enabled ? '🟢 Active' : '🔴 Blocked'}</td>
							<td>
								<Button
									size='sm'
									variant={u.enabled ? 'warning' : 'success'}
									onClick={() => toggleUser(u.id)}
								>
									{u.enabled ? 'Block' : 'Unblock'}
								</Button>{' '}
								<Button
									size='sm'
									variant='danger'
									onClick={() => deleteUser(u.id)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
}
