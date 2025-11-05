// src/Pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';
import { Table, Button, Container, Alert, Tabs, Tab } from 'react-bootstrap';
import AnalyticsDashboard from './AnalyticsDashboard.jsx';

export default function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [queries, setQueries] = useState([]);
	const [settings, setSettings] = useState({
		aiEnabled: true,
		dailyQueryLimit: 10,
		subscriptionTiers: '',
	});
	const [message, setMessage] = useState('');
	const [activeTab, setActiveTab] = useState('users');

	useEffect(() => {
		fetchUsers();
		fetchQueries();
		fetchSettings();
	}, []);

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

	const fetchSettings = async () => {
		try {
			const res = await api.get('/admin/settings');
			setSettings(res.data);
		} catch {
			setMessage('Failed to load settings');
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

	const updateSettings = async () => {
		try {
			await api.put('/admin/settings', settings);
			setMessage('Settings updated successfully');
			fetchSettings();
		} catch {
			setMessage('Failed to update settings');
		}
	};

	return (
		<Container className='mt-5'>
			<h3>🎬 Admin Dashboard</h3>
			{message && <Alert variant='info'>{message}</Alert>}

			<Tabs
				activeKey={activeTab}
				onSelect={(k) => setActiveTab(k)}
				className='mb-3'
			>
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
								<th>Email</th>
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

				<Tab
					eventKey='settings'
					title='System Settings'
				>
					<div className='p-3'>
						<div className='mb-3'>
							<label>AI Enabled:</label>{' '}
							<input
								type='checkbox'
								checked={settings.aiEnabled}
								onChange={(e) =>
									setSettings({ ...settings, aiEnabled: e.target.checked })
								}
							/>
						</div>
						<div className='mb-3'>
							<label>Daily Query Limit:</label>
							<input
								type='number'
								className='form-control'
								value={settings.dailyQueryLimit}
								onChange={(e) =>
									setSettings({ ...settings, dailyQueryLimit: e.target.value })
								}
							/>
						</div>
						<div className='mb-3'>
							<label>Subscription Tiers (CSV):</label>
							<input
								type='text'
								className='form-control'
								value={settings.subscriptionTiers || ''}
								onChange={(e) =>
									setSettings({
										...settings,
										subscriptionTiers: e.target.value,
									})
								}
							/>
						</div>
						<Button
							variant='primary'
							onClick={updateSettings}
						>
							Save Changes
						</Button>
					</div>
				</Tab>

				<Tab
					eventKey='analytics'
					title='📈 Analytics'
				>
					<AnalyticsDashboard />
				</Tab>
			</Tabs>
		</Container>
	);
}
