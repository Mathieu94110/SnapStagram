import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const initialValues = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
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
      className="flex flex-col gap-5 w-full mt-4"
    >
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Connectez vous !
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Bienvenue ! Veuillez renseigner les informations.
        </p>
        <h2 className="mb-10">Connexion</h2>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" {...register('email')} />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" {...register('password')} />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        {errors.generic && (
          <div className="mb-10">
            <p className="form-error">{errors.generic.message}</p>
          </div>
        )}
        <div>
          <button disabled={isSubmitting}>
            Connexion
          </button>
        </div>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Vous avez déja un compte ?
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