import { useUserContext } from '@/context/AuthContextProvider'

const Home = () => {
    const { user } = useUserContext()
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <h1>Bonjour {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1>
        </div>
    )
}

export default Home
