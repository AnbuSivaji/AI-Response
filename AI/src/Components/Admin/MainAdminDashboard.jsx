import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';
import { Table, Button, Container, Alert, Tabs, Tab } from 'react-bootstrap';

const MainAdminDashboard = () => {
	const [admins, setAdmins] = useState([]);
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState('');
	const [activeTab, setActiveTab] = useState('admins');

	// ---- Fetch Admins ----
	const fetchAdmins = async () => {
		try {
			const res = await api.get('/admin/all');
			setAdmins(res.data);
		} catch {
			setMessage('Failed to load admins');
		}
	};

	// ---- Fetch Users ----
	const fetchUsers = async () => {
		try {
			const res = await api.get('/admin/users/all');
			setUsers(res.data);
		} catch {
			setMessage('Failed to load users');
		}
	};

	useEffect(() => {
		fetchAdmins();
		fetchUsers();
	}, []);

	const approveAdmin = async (id) => {
		try {
			const res = await api.put(`/admin/approve/${id}`);
			setMessage(res.data.message);
			fetchAdmins();
		} catch {
			setMessage('Failed to approve admin');
		}
	};

	const deleteAdmin = async (id) => {
		try {
			const res = await api.delete(`/admin/delete/${id}`);
			setMessage(res.data.message);
			fetchAdmins();
		} catch {
			setMessage('Failed to delete admin');
		}
	};

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
			<h3>Main Admin Dashboard 🧩</h3>
			{message && <Alert variant='info'>{message}</Alert>}

			<Tabs
				id='main-admin-tabs'
				activeKey={activeTab}
				onSelect={(k) => setActiveTab(k)}
				className='mb-3'
			>
				<Tab
					eventKey='admins'
					title='Manage Admins'
				>
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
				</Tab>

				<Tab
					eventKey='users'
					title='Manage Users'
				>
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
				</Tab>
			</Tabs>
		</Container>
	);
};

export default MainAdminDashboard;
