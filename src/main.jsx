import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { NotFound } from './pages/not-found';
import { AuthRoute } from './components/auth-route';
import { UnAuthRoute } from './components/unauth-route';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Home />
            </AuthRoute>
        ),
    },
    {
        path: '/login',
        element: (
            <UnAuthRoute>
                <Login />
            </UnAuthRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <UnAuthRoute>
                <Register />
            </UnAuthRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
