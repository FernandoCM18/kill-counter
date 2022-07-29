import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../../Layouts/Layout';
import { Button, Label, Input, Legend, WrapperForm, ParragraphLink, ErrorText } from '../../styles/FormStyle';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../gql/user';
import useAuth from '../../hooks/useAuth';
import { decodeToken, setToken } from '../../utils/token';

export const RegisterPage = () => {
  const [createUser, {error, loading}] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  
  return (
    <Layout title="Register" pageDescription="Página de registro de usuario">
      <Formik
        initialValues={{ name: '', username: '', email: '', password: '', }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, 'Debe de contener al menos 2 caracteres').required('El nombre es requerido'),
          username: Yup.string().min(2, 'Debe de contener al menos 2 caracteres').required('El username es requerido'),
          email: Yup.string().email('Revisa tu Email parece que no es valido').required('El email es requerido'),
          password: Yup.string().min(6, 'Debe de contener al menos 6 caracteres').required('La contraseña es requerida'),
        })}
        onSubmit={ async(values, { setSubmitting }) => {
          const newUser = values;

          await createUser({
            variables: {
              user: newUser
            },
            onCompleted: ({createUser}) => {
              const token = createUser.token;
              setToken(token);
              setUser(decodeToken(token));
              navigate('/home');
            },
            onError: (error) => {
              console.log(error);
            }
          })
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange }) => (
          <WrapperForm action="" onSubmit={handleSubmit}>
            <Legend>Registrarse</Legend>
            <Label htmlFor="name">Nombre</Label>
            <Input 
              type="text"
              name='name'
              placeholder="Ingrese su nombre"
              onChange={handleChange}
            />
            <ErrorMessage name="name" component={ErrorText} />
            
            <Label htmlFor="username">Username</Label>
            <Input 
              type="text" 
              name='username'
              placeholder="Ingrese su username"
              onChange={handleChange}
            />
            <ErrorMessage name="username" component={ErrorText} />

            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              name='email'
              placeholder="Ingrese su email"
              onChange={handleChange}
            />
            <ErrorMessage name="email" component={ErrorText} />
            
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              name='password'
              placeholder="Ingrese su password"
              onChange={handleChange}
            />
            <ErrorMessage name="password" component={ErrorText} />
            <Button type="submit">
              {loading ? 'Cargando...' : 'Registrarse'}
            </Button>
            <ParragraphLink>¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesion aquí</Link></ParragraphLink>
            {
              error && <p>{error.message}</p>
            }
          </WrapperForm>
        )}
      </Formik>
    </Layout>
  )
};






