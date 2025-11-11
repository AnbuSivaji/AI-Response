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
	const [paymentLoading, setPaymentLoading] = useState(false);
	const chatEndRef = useRef(null);

	// ✅ Auto scroll chat to bottom
	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	// ✅ Fetch user profile
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await api.get('/user/profile');
				setProfile(res.data);
			} catch (err) {
				console.error(err);
				setError('Failed to load profile.');
			} finally {
				setProfileLoading(false);
			}
		};
		fetchProfile();
	}, []);

	// ✅ Dynamically load Razorpay script
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	// ✅ Handle chat message send
	const handleSend = async (e) => {
		e.preventDefault();
		if (!query.trim()) return;

		const userMsg = { sender: 'user', text: query };
		setMessages((prev) => [...prev, userMsg]);
		setHistory((prev) => [query, ...prev.slice(0, 9)]);
		setQuery('');
		setLoading(true);
		setError('');

		try {
			const res = await api.post('/ai/chat', { query });
			const aiMsg = { sender: 'ai', text: res.data.response };
			setMessages((prev) => [...prev, aiMsg]);
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.error || 'Error communicating with AI.');
		} finally {
			setLoading(false);
		}
	};

	// ✅ Handle Razorpay payment
	const handlePayment = async () => {
		if (!window.Razorpay) {
			alert('Razorpay SDK not loaded yet. Please wait a moment.');
			return;
		}
		if (!profile?.email) {
			alert('Please wait until your profile loads.');
			return;
		}

		try {
			setPaymentLoading(true);

			// Step 1: Create order in backend
			const receiptId = `receipt_${Date.now()}`;
			const orderRes = await api.post(
				`/payment/create-order?amount=199&receipt=${receiptId}`
			);

			let order;
			try {
				order = JSON.parse(orderRes.data); // backend returns JSON string
			} catch {
				order = orderRes.data; // in case backend already returns JSON
			}

			// Step 2: Razorpay configuration
			const options = {
				key: import.meta.env.VITE_RAZORPAY_KEY_ID,
				amount: order.amount,
				currency: order.currency,
				name: 'AI Assistant Pro',
				description: 'Upgrade for more queries',
				order_id: order.id,
				handler: async (response) => {
					try {
						await api.post(
							`/payment/verify?email=${profile.email}&success=true`
						);
						alert('✅ Payment Successful! Confirmation email sent.');
					} catch (verifyErr) {
						console.error(verifyErr);
						alert('Payment succeeded but verification failed.');
					}
				},
				prefill: {
					email: profile.email,
					name: profile.username || 'User',
				},
				theme: { color: '#5a57ff' },
				modal: {
					ondismiss: async () => {
						await api.post(
							`/payment/verify?email=${profile.email}&success=false`
						);
						alert('❌ Payment cancelled or failed.');
					},
				},
			};

			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (err) {
			console.error(err);
			alert('Payment error. Please try again.');
		} finally {
			setPaymentLoading(false);
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

						{/* Razorpay Payment Button */}
						<Button
							variant='success'
							className='w-100 mt-2'
							onClick={handlePayment}
							disabled={paymentLoading}
						>
							{paymentLoading ? 'Processing...' : '💳 Buy More Queries (₹199)'}
						</Button>
					</>
				) : (
					<p className='text-danger'>Failed to load profile.</p>
				)}

				{/* Recent Queries */}
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
