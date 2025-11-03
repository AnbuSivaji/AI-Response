import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');

	const handleLogout = () => {
		localStorage.clear();
		navigate('/admin/main-admin-login');
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
									to='/admin/main-admin-login'
								>
									Main Admin Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/admin/main-admin-signup'
								>
									Main Admin Signup
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/admin/admin-login'
								>
									Admin Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/admin/admin-signup'
								>
									Admin Signup
								</Link>
							</li>
						</>
					) : (
						<>
							{role === 'MAIN_ADMIN' && (
								<li className='nav-item'>
									<Link
										className='nav-link'
										to='/admin/main-admin-dashboard'
									>
										Main Dashboard
									</Link>
								</li>
							)}
							{role === 'ADMIN' && (
								<li className='nav-item'>
									<Link
										className='nav-link'
										to='/admin/dashboard'
									>
										Admin Dashboard
									</Link>
								</li>
							)}
							<li className='nav-item'>
								<button
									className='btn btn-danger ms-3'
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}
