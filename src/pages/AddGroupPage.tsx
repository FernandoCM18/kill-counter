import { Layout } from '../Layouts/Layout';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, ErrorText, Input, Label, Legend, Textarea, WrapperForm } from '../styles/FormStyle';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../gql/group';
import { useNavigate } from 'react-router-dom';
import { ME } from '../gql/user';


export const AddGroupPage = () => {
  const navigate = useNavigate()
  const [createGroup, { error, loading}] = useMutation(CREATE_GROUP);

  return (
    <Layout title="Agregar Grupo" pageDescription="Pagina de agregar grupo">
      <Formik
        initialValues={{ name: '', description: ''}}
        validationSchema={Yup.object({
          name: Yup.string().min(2, 'Debe de contener al menos 2 caracteres').required('El nombre es requerido'),
          description: Yup.string().min(2, 'Debe de contener al menos 2 caracteres').required('La descripcion es requerida'),
        })}
        onSubmit={ async(values) => {
          await createGroup({ 
            variables: { 
              groupInput: values
            },
            onCompleted: () => {
              navigate('/home');
            },
            refetchQueries: [
              ME
            ]
            
          });
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <WrapperForm action="" onSubmit={handleSubmit}>
          <Legend>Crear Grupo</Legend>
          <Label htmlFor="name">Nombre</Label>
          <Input 
            type="text"
            name='name'
            placeholder="Ingrese el nombre del grupo"
            onChange={handleChange}
          />
          <ErrorMessage name="name" component={ErrorText} />
          
          <Label htmlFor="description">Descripcion</Label>
          <Textarea 
            name='description'
            placeholder="Ingrese una descripcion del grupo"
            onChange={handleChange}
          />
          <ErrorMessage name="description" component={ErrorText} />

          <Button type="submit">
            {loading ? 'Cargando...' : 'Crear grupo'}
          </Button>
          {
            error && <p>{error.message}</p>
          }
        </WrapperForm>
        )}
      </Formik>
    </Layout>
  )
}
