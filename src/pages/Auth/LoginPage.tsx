import { Formik, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../gql/user';
import { Layout } from '../../Layouts/Layout';
import { Button, Label, Input, Legend, WrapperForm, ParragraphLink, ErrorText } from '../../components/styles/FormStyle';
import { setToken, decodeToken } from '../../utils/token';
import  useAuth  from '../../hooks/useAuth';

export const LoginPage = () => {

  const [login, {error, loading}] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return (
    <Layout title="Login" pageDescription="Página de login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Revisa tu Email parece que no es valido').required('El email es requerido'),
          password: Yup.string().min(6, 'Debe de contener al menos 6 caracteres').required('La contraseña es requerida'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const {data} = await login({
              variables: {
                email: values.email,
                password: values.password,
              },
              onCompleted: ({login}) => {
                const token = login.token;
                setToken(token);
                setUser(decodeToken(token));
                navigate('/home');
              }
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({isSubmitting, handleSubmit, handleChange, isValid}) => (
          <WrapperForm action="" onSubmit={handleSubmit}>
            <Legend>Iniciar sesión</Legend>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email"
              name="email"
              placeholder="Ingrese su email"
              onChange={handleChange}
            />
            <ErrorMessage name="email" component={ErrorText} />
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              name="password"
              placeholder="Ingrese su password"
              onChange={handleChange}
            />
            <ErrorMessage name="password" component={ErrorText} />
            <Button type="submit" disabled={!isValid || loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
            <ParragraphLink>¿No tienes cuenta? <Link to="/auth/register">Registrate aquí</Link></ParragraphLink>
            {
              error && <p>{error.message}</p>
            }
          </WrapperForm>
        )}
      </Formik>
    </Layout>
  )
};






