import React from 'react'
import { Layout } from '../Layouts/Layout';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, ErrorText, Input, Label, Legend, WrapperForm } from '../styles/FormStyle';
import { useMutation, useSubscription, gql} from '@apollo/client';
import { CREATE_KILL, GET_KILLS, TOTAL_KILLS_PER_USER_IN_GROUP_SUBSCRIPTION, KILL_CREATED_SUBSCRIPTION } from '../gql/kill';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_GROUP } from '../gql/group';
import { KillsData } from '../interfaces/kill';

export const AddKillsToGroup = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [createKill, {loading, error}] = useMutation(CREATE_KILL);
  
  return (
    <Layout title="Agregar Kill" pageDescription="Pagina para agegar kills a grupo">
      <Formik
        initialValues={{low: 0, idGroup: id}}
        validationSchema={Yup.object({
          low: Yup.number().required().min(1, 'Debe de ser mayor a 0'),
          idGroup: Yup.string().required('El id del grupo es requerido'),
        })}
        onSubmit={async(values) => {
            await createKill({
              variables: {
                killInput: values
              },
              update(cache, {data: {createKill}}) {
                const newKillRef = createKill;
                const data = cache.readQuery<KillsData>({
                  query: GET_KILLS,
                  variables: {
                    idGroup: newKillRef.idGroup.id
                  }
                });
                cache.writeQuery({
                  query: GET_KILLS,
                  variables: {
                    idGroup: newKillRef.idGroup.id
                  },
                  data: {
                    kills: [newKillRef, ...data.kills]
                  }
                });
              },
              refetchQueries: [{
                query: GET_GROUP,
                variables: {
                  id: id
                }
              }],
              onCompleted: async() => {
                navigate(-1);
              },
              onError: (error) => {
                console.log(error);
              }
            });
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, values }) => (
          <WrapperForm action="" onSubmit={handleSubmit}>
          <Legend>Agregar kills</Legend>
          <Label htmlFor="low">Bajas</Label>
          <Input 
            type="number"
            name='low'
            placeholder="¿Cuantas bajas hicistes?"
            onChange={handleChange}
          />
          <ErrorMessage name="low" component={ErrorText} />

          <Button type="submit">
            {loading ? 'Agregando kills...' : 'Agregar kills'}
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
