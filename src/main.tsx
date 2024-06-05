import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider } from "react-router-dom";
import router from './router';
import { AuthContextProvider } from './context/AuthContextProvider'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
)
