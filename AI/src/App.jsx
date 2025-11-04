import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// USER COMPONENTS
import Navbar from './Pages/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import Home from './Pages/Home';

// ADMIN COMPONENTS
import AdminNavbar from './Components/Admin/AdminNavbar';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignup from './Components/Admin/AdminSignup';
import AdminDashboard from './Components/Admin/AdminDashboard';

// MAIN ADMIN COMPONENTS
import MainAdminLogin from './Components/Admin/MainAdminLogin';
import MainAdminSignup from './Components/Admin/MainAdminSignup';
import MainAdminDashboard from './Components/Admin/MainAdminDashboard';

// ===== Protected Routes =====
function ProtectedMainAdminRoute({ children }) {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	return token && role === 'MAIN_ADMIN' ? (
		children
	) : (
		<Navigate to='/admin/main-admin-login' />
	);
}

function ProtectedAdminRoute({ children }) {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	return token && role === 'ADMIN' ? (
		children
	) : (
		<Navigate to='/admin/admin-login' />
	);
}

function ProtectedUserRoute({ children }) {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	return token && role === 'USER' ? children : <Navigate to='/login' />;
}

// ===== Main App =====
export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* ---------- USER ROUTES ---------- */}
				<Route
					path='/'
					element={
						<>
							<Navbar />
							<Login />
						</>
					}
				/>
				<Route
					path='/signup'
					element={
						<>
							<Navbar />
							<Signup />
						</>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<>
							<Navbar />
							<ForgotPassword />
						</>
					}
				/>
				<Route
					path='/home'
					element={
						<ProtectedUserRoute>
							<>
								<Navbar />
								<Home />
							</>
						</ProtectedUserRoute>
					}
				/>

				{/* ---------- ADMIN ROUTES ---------- */}
				<Route
					path='/admin/admin-login'
					element={
						<>
							<AdminNavbar />
							<AdminLogin />
						</>
					}
				/>
				<Route
					path='/admin/admin-signup'
					element={
						<>
							<AdminNavbar />
							<AdminSignup />
						</>
					}
				/>
				<Route
					path='/admin/dashboard'
					element={
						<ProtectedAdminRoute>
							<>
								<AdminNavbar />
								<AdminDashboard />
							</>
						</ProtectedAdminRoute>
					}
				/>

				{/* ---------- MAIN ADMIN ROUTES ---------- */}
				<Route
					path='/admin/main-admin-login'
					element={
						<>
							<AdminNavbar />
							<MainAdminLogin />
						</>
					}
				/>
				<Route
					path='/admin/main-admin-signup'
					element={
						<>
							<AdminNavbar />
							<MainAdminSignup />
						</>
					}
				/>
				<Route
					path='/admin/main-admin-dashboard'
					element={
						<ProtectedMainAdminRoute>
							<>
								<AdminNavbar />
								<MainAdminDashboard />
							</>
						</ProtectedMainAdminRoute>
					}
				/>

				{/* ---------- FALLBACK ---------- */}
				<Route
					path='*'
					element={<Navigate to='/' />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
