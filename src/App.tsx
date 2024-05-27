import { Routes, Route } from "react-router-dom";
import './globals.css';
import SignInForm from "./_auth/forms/SignInForm";
import { Home } from "./_root/pages";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/connexion" element={<SignInForm />} />
                    <Route path="/inscription" element={<SignUpForm />} />
                </Route>

                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>

            </Routes>

        </main>
    )
}

export default App
