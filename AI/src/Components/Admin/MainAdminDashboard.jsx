import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';

export default function MainAdminDashboard() {
	const [admins, setAdmins] = useState([]);

	const fetchAdmins = async () => {
		const res = await api.get('/admin/all');
		setAdmins(res.data);
	};

	const approveAdmin = async (id) => {
		await api.put(`/admin/approve/${id}`);
		fetchAdmins();
	};

	const deleteAdmin = async (id) => {
		await api.delete(`/admin/delete/${id}`);
		fetchAdmins();
	};

	useEffect(() => {
		fetchAdmins();
	}, []);

	return (
		<div className='container mt-4'>
			<h3>Main Admin Dashboard</h3>
			<table className='table table-striped mt-3'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>Name</th>
						<th>Approved</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{admins.map((a) => (
						<tr key={a.id}>
							<td>{a.id}</td>
							<td>{a.email}</td>
							<td>{a.name}</td>
							<td>{a.approved ? '✅' : '❌'}</td>
							<td>
								{!a.approved && (
									<button
										className='btn btn-success btn-sm me-2'
										onClick={() => approveAdmin(a.id)}
									>
										Approve
									</button>
								)}
								<button
									className='btn btn-danger btn-sm'
									onClick={() => deleteAdmin(a.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
