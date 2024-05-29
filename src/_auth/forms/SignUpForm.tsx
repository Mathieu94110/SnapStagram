import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';

type UserSignupInput = {
  name: string;
  userName: string,
  email: string;
  password: string;
  generic: null | {
    generic: {
      message: string;
    };
  };
}

function SignupForm() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Il faut préciser votre nom')
      .min(2, 'Un vrai nom'),
    userName: yup
      .string()
      .required("Il faut préciser votre nom d'utilisateur")
      .min(2, "Un vrai nom d'utilisateur"),
    email: yup
      .string()
      .required('Il faut préciser votre email')
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required('Il faut préciser votre mot de passe')
      .min(6, 'Mot de passe trop court'),
  });

  const defaultValues: UserSignupInput = {
    name: "",
    userName: "",
    email: "",
    password: "",
    generic: null,
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<UserSignupInput>({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  const submit = handleSubmit(async (user) => {
    try {
      clearErrors();
      console.log(user)
      navigate('/connection');
    } catch (message) {
      setError('generic', { type: 'generic', message });
    }
  });

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-5 w-full mt-4 justify-center items-center"
    >
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white font-bold text-2xl mb-1">
          Créer un nouveau compte
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-sm font-normal mb-7 text-center text-wrap">
          Pour utiliser snapstagram, Veuillez renseigner les informations
        </p>
        <div className="d-flex flex-column w-3/4">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd" />
            </svg>
            <input
              type="text"
              className='pl-2 outline-none border-none bg-transparent'
              name="name"
              {...register("email")}
              placeholder="Nom"
            />
          </div>
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column w-3/4">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <input
              type="text"
              className='pl-2 outline-none border-none bg-transparent'
              name="userName"
              {...register("email")}
              placeholder="Nom d'utilisateur"
            />
          </div>
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column w-3/4">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input
              type="text"
              className='pl-2 outline-none border-none bg-transparent'
              name="email"
              {...register("email")}
              placeholder="Adresse mail"
            />
          </div>
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column w-3/4">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
            <input type="password" name="password" {...register('password')} className='pl-2 outline-none border-none bg-transparent' placeholder="Mot de passe" />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
        </div>
        {errors.generic && (
          <div className="mb-10">
            <p className="form-error">{errors.generic.message}</p>
          </div>
        )}
        <div className="d-flex flex-column w-3/4">
          <button disabled={isSubmitting} className="block w-full bg-primary-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">S'inscrire</button>
        </div>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Vous avez déja un compte ?
          <Link
            to="/connexion"
            className="text-primary-500 text-small-semibold ml-1">
            Se connecter
          </Link>
        </p>
      </div >
    </form>
  );
}

export default SignupForm;