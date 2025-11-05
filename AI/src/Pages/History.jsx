import React, { useEffect, useState } from 'react';
import api from '../Api/api.jsx';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

export default function History() {
	const [queries, setQueries] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadQueries = async () => {
		try {
			const res = await api.get('/user/queries');
			setQueries(res.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadQueries();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm('Delete this query?')) {
			await api.delete(`/user/queries/${id}`);
			setQueries(queries.filter((q) => q.id !== id));
		}
	};

	return (
		<Container className='mt-5'>
			<h3 className='text-center mb-4'>Your AI Chat History</h3>
			{loading ? (
				<div className='text-center'>
					<Spinner animation='border' />
				</div>
			) : queries.length === 0 ? (
				<p className='text-center'>No chat history yet.</p>
			) : (
				<Table
					striped
					bordered
					hover
				>
					<thead>
						<tr>
							<th>#</th>
							<th>Query</th>
							<th>Response</th>
							<th>Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{queries.map((q, i) => (
							<tr key={q.id}>
								<td>{i + 1}</td>
								<td>{q.userQuery}</td>
								<td>{q.aiResponse}</td>
								<td>{new Date(q.createdAt).toLocaleString()}</td>
								<td>
									<Button
										variant='danger'
										size='sm'
										onClick={() => handleDelete(q.id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Container>
	);
}
