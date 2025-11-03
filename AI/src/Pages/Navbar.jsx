// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
			<Link
				className='navbar-brand'
				to='/'
			>
				Admin Portal
			</Link>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav ms-auto'>
					{!token ? (
						<>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/main-admin-login'
								>
									Main Admin Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/main-admin-signup'
								>
									Main Admin Signup
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/admin-login'
								>
									Admin Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/admin-signup'
								>
									Admin Signup
								</Link>
							</li>
						</>
					) : (
						<li className='nav-item'>
							<button
								className='btn btn-danger'
								onClick={handleLogout}
							>
								Logout
							</button>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
}
