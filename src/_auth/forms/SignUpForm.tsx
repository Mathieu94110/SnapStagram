import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';

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

  const initialValues = {
    name: '',
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
    <div className="sm:w-420 flex-center flex-col">
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Créer un nouveau compte
      </h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        Pour utiliser snapstagram, Veuillez renseigner les informations
      </p>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-5 w-full mt-4"
      >
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" {...register('name')} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Nom d&apos;utilisateur</label>
          <input type="text" name="userName" {...register('userName')} />
          {errors.userName && <p className="form-error">{errors.userName.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" {...register('email')} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
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
          <button disabled={isSubmitting} className="btn btn-primary">
            Inscription
          </button>
        </div>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link
            to="/sign-in"
            className="text-primary-500 text-small-semibold ml-1">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;