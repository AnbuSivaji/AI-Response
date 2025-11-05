import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');

	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
			<Link
				className='navbar-brand'
				to='/home'
			>
				AI Assistant 🤖
			</Link>

			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav ms-auto'>
					{!token ? (
						<>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/login'
								>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/signup'
								>
									Signup
								</Link>
							</li>
						</>
					) : (
						role === 'USER' && (
							<>
								<li className='nav-item'>
									<Link
										className='nav-link'
										to='/home'
									>
										Home
									</Link>
								</li>
								<li className='nav-item'>
									<button
										className='btn btn-danger ms-3'
										onClick={handleLogout}
									>
										Logout
									</button>
								</li>
							</>
						)
					)}
				</ul>
			</div>
		</nav>
	);
}
