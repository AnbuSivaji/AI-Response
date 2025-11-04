import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';
import { Table, Button, Container, Alert } from 'react-bootstrap';

const MainAdminDashboard = () => {
	const [admins, setAdmins] = useState([]);
	const [message, setMessage] = useState('');

	const fetchAdmins = async () => {
		try {
			const token = localStorage.getItem('token');
			const res = await api.get('/admin/all', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setAdmins(res.data);
		} catch {
			setMessage('Failed to load admins');
		}
	};

	useEffect(() => {
		fetchAdmins();
	}, []);

	const approveAdmin = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const res = await api.put(
				`/admin/approve/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setMessage(res.data.message);
			fetchAdmins();
		} catch {
			setMessage('Failed to approve admin');
		}
	};

	const deleteAdmin = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const res = await api.delete(`/admin/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setMessage(res.data.message);
			fetchAdmins();
		} catch {
			setMessage('Failed to delete admin');
		}
	};

	return (
		<Container className='mt-5'>
			<h3>Main Admin Dashboard</h3>
			{message && <Alert variant='info'>{message}</Alert>}
			<Table
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Approved</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{admins.map((a) => (
						<tr key={a.id}>
							<td>{a.id}</td>
							<td>{a.name}</td>
							<td>{a.email}</td>
							<td>{a.approved ? '✅' : '❌'}</td>
							<td>
								{!a.approved && (
									<Button
										size='sm'
										variant='success'
										onClick={() => approveAdmin(a.id)}
									>
										Approve
									</Button>
								)}{' '}
								<Button
									size='sm'
									variant='danger'
									onClick={() => deleteAdmin(a.id)}
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
};

export default MainAdminDashboard;
