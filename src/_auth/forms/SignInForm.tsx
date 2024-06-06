import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


type UserSigninInput = {
  email: string;
  password: string;
  generic: null | {
    generic: {
      message: string | undefined;
    };
  };
}

function SigninForm() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Il faut préciser votre email')
      .email("l'email n'est pas valide"),
    password: yup
      .string()
      .required('Il faut préciser votre mot de passe')
      .min(6, 'Mot de passe trop court'),
  });

  const defaultValues: UserSigninInput = {
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
  } = useForm<UserSigninInput>({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  const submit = handleSubmit(async (credentials) => {
    try {
      clearErrors();
      console.log(credentials);
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
          Connectez vous !
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-sm font-normal mb-7 text-center text-wrap">
          Bienvenue ! Merci de renseigner les informations.
        </p>
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
            <input type="password"  {...register('password')} className='pl-2 outline-none border-none bg-transparent' placeholder="Mot de passe" />
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
          <button disabled={isSubmitting} className="block w-full bg-primary-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Connexion</button>
        </div>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Vous n'avez pas encore de compte ?
          <Link
            to="/inscription"
            className="text-primary-500 text-small-semibold ml-1">
            S'inscrire
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SigninForm;