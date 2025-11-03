import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 🧑‍💻 USER COMPONENTS
import Navbar from './Pages/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';

// 👑 ADMIN COMPONENTS
import AdminNavbar from './Components/Admin/AdminNavbar';
import MainAdminLogin from './Components/Admin/MainAdminLogin';
import MainAdminSignup from './Components/Admin/MainAdminSignup';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignup from './Components/Admin/AdminSignup';
import MainAdminDashboard from './Components/Admin/MainAdminDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';

// 🔒 PROTECTED ROUTES
function ProtectedMainAdminRoute({ children }) {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	if (!token || role !== 'MAIN_ADMIN')
		return <Navigate to='/admin/main-admin-login' />;
	return children;
}

function ProtectedAdminRoute({ children }) {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	if (!token || role !== 'ADMIN') return <Navigate to='/admin/admin-login' />;
	return children;
}

// 🌍 APP
function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* USER ROUTES */}
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

				{/* ADMIN ROUTES */}
				<Route
					path='/admin/*'
					element={<AdminRoutes />}
				/>

				{/* FALLBACK */}
				<Route
					path='*'
					element={<Navigate to='/' />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

function AdminRoutes() {
	return (
		<>
			<AdminNavbar />
			<Routes>
				<Route
					path='main-admin-login'
					element={<MainAdminLogin />}
				/>
				<Route
					path='main-admin-signup'
					element={<MainAdminSignup />}
				/>
				<Route
					path='admin-login'
					element={<AdminLogin />}
				/>
				<Route
					path='admin-signup'
					element={<AdminSignup />}
				/>

				<Route
					path='main-admin-dashboard'
					element={
						<ProtectedMainAdminRoute>
							<MainAdminDashboard />
						</ProtectedMainAdminRoute>
					}
				/>
				<Route
					path='dashboard'
					element={
						<ProtectedAdminRoute>
							<AdminDashboard />
						</ProtectedAdminRoute>
					}
				/>
				<Route
					path='*'
					element={<Navigate to='/admin/main-admin-login' />}
				/>
			</Routes>
		</>
	);
}

export default App;
