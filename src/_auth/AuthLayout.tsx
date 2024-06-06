import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/AuthContextProvider';

const AuthLayout = () => {
    const { isAuthenticated } = useUserContext();
    return (
        <>
            {isAuthenticated ? (<Navigate to='/home' />) : <>
                <div className='flex'>
                    <section className='flex flex-1 justify-center items-center flex-col py-10'>
                        <Outlet />
                    </section>

                    <img
                        src='/assets/images/social-media-app.jpg'
                        alt='logo snapstagram'
                        className='hidden lg:block h-screen w-1/2 object-cover bg-no-repeat'
                    />
                </div>
            </>}
        </>
    )
}

export default AuthLayout
