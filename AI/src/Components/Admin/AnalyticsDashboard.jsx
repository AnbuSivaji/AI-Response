// src/Pages/Admin/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../Api/api.jsx';
import { Card, Spinner, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function AnalyticsDashboard() {
	const [summary, setSummary] = useState({});
	const [chartData, setChartData] = useState([]);
	const [view, setView] = useState('daily');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchSummary();
		fetchData(view);
	}, [view]);

	const fetchSummary = async () => {
		try {
			const res = await api.get('/admin/analytics/summary');
			setSummary(res.data);
		} catch (e) {
			console.error('Failed to load summary');
		}
	};

	const fetchData = async (type) => {
		setLoading(true);
		try {
			const res = await api.get(`/admin/analytics/${type}`);
			setChartData(res.data);
		} catch {
			console.error('Failed to load analytics data');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-3'>
			<h5>📊 AI Usage Analytics</h5>

			<div className='d-flex gap-3 my-3'>
				<Button
					variant={view === 'daily' ? 'primary' : 'outline-primary'}
					onClick={() => setView('daily')}
				>
					Daily
				</Button>
				<Button
					variant={view === 'weekly' ? 'primary' : 'outline-primary'}
					onClick={() => setView('weekly')}
				>
					Weekly
				</Button>
				<Button
					variant={view === 'monthly' ? 'primary' : 'outline-primary'}
					onClick={() => setView('monthly')}
				>
					Monthly
				</Button>
			</div>

			{loading ? (
				<div className='text-center'>
					<Spinner animation='border' /> Loading...
				</div>
			) : (
				<Card className='p-3'>
					<Line
						data={{
							labels: chartData.map((d) => d.label),
							datasets: [
								{
									label: 'Queries',
									data: chartData.map((d) => d.count),
									borderColor: '#007bff',
									backgroundColor: 'rgba(0, 123, 255, 0.3)',
									tension: 0.3,
								},
							],
						}}
						options={{
							responsive: true,
							plugins: { legend: { position: 'top' } },
						}}
					/>
				</Card>
			)}

			<div className='mt-4'>
				<Card className='p-3'>
					<h6>Summary</h6>
					<p>
						<strong>Total Users:</strong> {summary.totalUsers || 0}
					</p>
					<p>
						<strong>Total Queries:</strong> {summary.totalQueries || 0}
					</p>
				</Card>
			</div>
		</div>
	);
}
