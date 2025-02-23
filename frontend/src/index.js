import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import GuestDashboard from './components/Dashboard/GuestDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import Layout from './components/Navbar/Layout';


import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([  {
  path: '/',
  element: (
    <Layout>
      <App />
    </Layout>
  ),
},
{
  path: '/about',
  element: (
    <Layout>
      <About />
    </Layout>
  ),
},
{
  path: '/dashboard',
  element: (
    <Layout>
      <Dashboard />
    </Layout>
  ),
},
{
  path: '/guestDashboard',
  element: (
    <Layout>
      <GuestDashboard />
    </Layout>
  ),
},
{
  path: '/adminDashboard',
  element: (
    <Layout>
      <AdminDashboard />
    </Layout>
  ),
},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
