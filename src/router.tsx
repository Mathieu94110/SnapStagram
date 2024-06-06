import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout.js";
import AuthLayout from "./_auth/AuthLayout.js";
import SigninForm from "./_auth/forms/SignInForm.js";
import SignupForm from "./_auth/forms/SignUpForm.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/home',
                element: <Home />
            }]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/connexion',
                index: true,
                element: <SigninForm />
            },
            {
                path: '/inscription',
                element: <SignupForm />
            }
        ]
    },
])

export default router;