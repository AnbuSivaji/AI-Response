// src/Pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import api from '../Api/api.jsx';
import { Button, Form, Spinner } from 'react-bootstrap';
import '../CSS/Home.css';

export default function Home() {
	const [query, setQuery] = useState('');
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [profile, setProfile] = useState(null);
	const [history, setHistory] = useState([]);
	const [profileLoading, setProfileLoading] = useState(true);
	const chatEndRef = useRef(null);

	// Scroll to bottom
	useEffect(() => {
		if (chatEndRef.current)
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Fetch profile
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await api.get('/user/profile');
				setProfile(res.data);
			} catch (err) {
				setError('Failed to load profile.');
			} finally {
				setProfileLoading(false);
			}
		};
		fetchProfile();
	}, []);

	const handleSend = async (e) => {
		e.preventDefault();
		if (!query.trim()) return;

		const userMsg = { sender: 'user', text: query };
		setMessages((prev) => [...prev, userMsg]);
		setHistory((prev) => [query, ...prev.slice(0, 9)]); // Store 10 recent queries
		setQuery('');
		setLoading(true);
		setError('');

		try {
			const res = await api.post('/ai/chat', { query });
			const aiMsg = { sender: 'ai', text: res.data.response };
			setMessages((prev) => [...prev, aiMsg]);
		} catch (err) {
			setError(err.response?.data?.error || 'Error communicating with AI.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='chatgpt-container'>
			{/* Sidebar */}
			<aside className='sidebar'>
				<h5>👤 Profile</h5>
				{profileLoading ? (
					<div className='text-center'>
						<Spinner
							animation='border'
							size='sm'
						/>{' '}
						Loading...
					</div>
				) : profile ? (
					<>
						<p>
							<strong>Username:</strong> {profile.username}
						</p>
						<p>
							<strong>Email:</strong> {profile.email}
						</p>
						<p>
							<strong>Total Queries:</strong> {profile.totalQueriesUsed}
						</p>
						<p>
							<strong>Remaining:</strong> {profile.remainingQueries}
						</p>
					</>
				) : (
					<p className='text-danger'>Failed to load profile.</p>
				)}

				{/* Recent Search History */}
				<div className='history'>
					<h6>🕓 Recent Queries</h6>
					<ul>
						{history.length === 0 ? (
							<li className='empty'>No history yet</li>
						) : (
							history.map((item, i) => <li key={i}>{item}</li>)
						)}
					</ul>
				</div>
			</aside>

			{/* Chat Section */}
			<main className='chat-area'>
				<div className='chat-card'>
					<div className='chat-box'>
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`message ${
									msg.sender === 'user' ? 'user-msg' : 'ai-msg'
								}`}
							>
								<div className='message-content'>
									<strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong>{' '}
									{msg.text}
								</div>
							</div>
						))}
						{loading && (
							<div className='ai-msg'>
								<Spinner
									animation='border'
									size='sm'
								/>{' '}
								Thinking...
							</div>
						)}
						<div ref={chatEndRef}></div>
					</div>

					<Form
						onSubmit={handleSend}
						className='chat-input'
					>
						<Form.Control
							as='textarea'
							rows={2}
							placeholder='Ask me anything...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<Button
							type='submit'
							variant='primary'
							disabled={loading}
							className='send-btn'
						>
							Send
						</Button>
					</Form>

					{error && <p className='text-danger mt-2'>{error}</p>}
				</div>
			</main>
		</div>
	);
}
