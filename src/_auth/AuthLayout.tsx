import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = false;
    return (
        <>
            {!isAuthenticated ? (<Navigate to='/connexion' />) : <>
                <section className='flex flex-1 justify-center items-center flex-col py-10'>
                    <Outlet />
                </section>

                <img
                    src='/assets/images/social-media-app.jpg'
                    alt='logo snapstagram'
                    className='hidden lg:block h-screen w-1/2 object-cover bg-no-repeat'
                />
            </>}
        </>
    )
}

export default AuthLayout
