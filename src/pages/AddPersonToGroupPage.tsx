import React from 'react'
import { Layout } from '../Layouts/Layout';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { SEARCH } from '../gql/user';
import { Button, ErrorText, Input, Label, Legend, WrapperForm } from '../styles/FormStyle';
import { QuerySearch, User } from '../interfaces/user';
import { useState } from 'react';
import styled from 'styled-components';
import { ADD_USER_TO_GROUP, GET_GROUP } from '../gql/group';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_KILLS } from '../gql/kill';

export const AddPersonToGroupPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [userSelected, setUserSelected] = useState('');
  const [selected, setSelected] = useState(false);
  const [search, {data, error, loading}] = useLazyQuery<QuerySearch>(SEARCH);
  const [addUserToGroup, {data: dataAddUser, loading: loadingAddUser, error: errorAddUser}] = useMutation(ADD_USER_TO_GROUP);

  const handleSearch = async(username: string) => {
    await search({
      variables: {
        search: username
      }
    });
  }

  return (
    <Layout title="Agregar personas a grupo" pageDescription="Pagina para agregar personas a un grupo">
      <Formik
        initialValues={{ username: ''}}
        validationSchema={Yup.object({
          username: Yup.string().min(2, 'Debe de contener al menos 2 caracteres').required('El nombre es requerido'),
        })}
        onSubmit={ async(values, { setSubmitting }) => {
          await addUserToGroup({
            variables: {
              addUserInput: {
                idUser: userSelected,
                idGroup: id
              }
            },
            onCompleted: () => {
              navigate(-1);
            },
            refetchQueries: [
              {
                query: GET_GROUP,
                variables: {id}
              },
              {
                query: GET_KILLS,
                variables: {idGroup: id}
              }
            ],
            onError: (error) => {
              console.log(error);
            }
          });
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, values }) => (
          <WrapperForm action="" onSubmit={handleSubmit}>
          <Legend>Agregar persona</Legend>
          <Label htmlFor="name">Username</Label>
          <Input 
            type="search"
            name='username'
            placeholder="Buscar usuario"
            onChange={handleChange}
          />
          <ErrorMessage name="username" component={ErrorText} />

          <Button
            type="button" 
            onClick={() => handleSearch(values.username)}
            disabled={ values.username.length < 2 }
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
          <WrapperUsers>
            <p>Selecciona a la persona que desas agregar</p>
            <ul>
              { 
                 data?.search?.map( user => ( 
                  <li 
                    className={selected && user.id === userSelected ? 'selected' : ''}
                    key={user.id}
                    onClick={() => {
                      setUserSelected(user.id);
                      setSelected(true);
                    }}
                  >
                    {user.username}
                  </li>
                ))
              }
            </ul>
            {
              data?.search?.length > 0 && (
                <Button type="submit">
                  {loadingAddUser ? 'Agregando...' : 'Agregar'}
                </Button>
              )
            }
          </WrapperUsers>
          {
            error && <p>{error.message}</p>
          }
          {
            // errorAddUser && <p>{errorAddUser.message}</p>
          }
        </WrapperForm>
        )}
      </Formik>
    </Layout>
  )
}

const WrapperUsers = styled.div`
  text-align: left;
  .selected {
    background-color: rgba(0,0,0,0.2);
  }

  ul {
    list-style: none;
    padding: 0px;

    li {
      cursor: pointer;
      padding: 10px;

      &:hover {
        background-color: rgba(0,0,0,0.2);
      }

    }
  }
`;