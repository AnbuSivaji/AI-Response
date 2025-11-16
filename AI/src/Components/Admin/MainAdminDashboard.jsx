// src/Pages/Admin/MainAdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';
import { Table, Button, Container, Alert, Tabs, Tab } from 'react-bootstrap';
import AnalyticsDashboard from './AnalyticsDashboard.jsx';
import '../../CSS/MainAdminDashboard.css'; // ✅ Import CSS for this page only

export default function MainAdminDashboard() {
	const [admins, setAdmins] = useState([]);
	const [users, setUsers] = useState([]);
	const [queries, setQueries] = useState([]);
	const [message, setMessage] = useState('');
	const [activeTab, setActiveTab] = useState('admins');

	useEffect(() => {
		fetchAdmins();
		fetchUsers();
		fetchQueries();
	}, []);

	const fetchAdmins = async () => {
		try {
			const res = await api.get('/admin/all');
			setAdmins(res.data);
		} catch {
			setMessage('Failed to load admins');
		}
	};

	const fetchUsers = async () => {
		try {
			const res = await api.get('/admin/users/all');
			setUsers(res.data);
		} catch {
			setMessage('Failed to load users');
		}
	};

	const fetchQueries = async () => {
		try {
			const res = await api.get('/admin/queries/all');
			setQueries(res.data);
		} catch {
			setMessage('Failed to load queries');
		}
	};

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

	const deleteQuery = async (id) => {
		try {
			const res = await api.delete(`/admin/queries/${id}`);
			setMessage(res.data);
			fetchQueries();
		} catch {
			setMessage('Failed to delete query');
		}
	};

	return (
		<Container className='mt-5'>
			<h3>🧩 Main Admin Dashboard</h3>
			{message && <Alert variant='info'>{message}</Alert>}

			<Tabs
				activeKey={activeTab}
				onSelect={(k) => setActiveTab(k)}
				className='mb-3'
			>
				{/* Manage Admins */}
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

				{/* Manage Users */}
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

				{/* Manage Queries */}
				<Tab
					eventKey='queries'
					title='Manage Queries'
				>
					<Table
						striped
						bordered
						hover
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>User Email</th>
								<th>Query</th>
								<th>Time</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{queries.map((q) => (
								<tr key={q.id}>
									<td>{q.id}</td>
									<td>{q.email}</td>
									<td>{q.queryText}</td>
									<td>{new Date(q.timestamp).toLocaleString()}</td>
									<td>
										<Button
											size='sm'
											variant='danger'
											onClick={() => deleteQuery(q.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>

				{/* Analytics */}
				<Tab
					eventKey='analytics'
					title='📊 Analytics'
				>
					<AnalyticsDashboard />
				</Tab>
			</Tabs>
		</Container>
	);
}
