import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './globals.css';
import router from './router';
import { AuthContextProvider } from '@/context/AuthContextProvider'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Toaster toastOptions={{
            success: {
                style: {
                    background: '#32CD32',
                    border: '1px solid #fff',
                    color: '#fff',
                    fontWeight: 600
                },
            },
            error: {
                style: {
                    background: '#FF003F',
                    border: '1px solid #fff',
                    color: '#fff',
                    fontWeight: 600
                },
            },
        }}

        />
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
)
