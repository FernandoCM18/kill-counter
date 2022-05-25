import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import {
	ErrorText,
	Input,
	Label,
	Legend,
	WrapperForm,
	Button,
} from '../components/styles/FormStyle';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../gql/user';
import { Layout } from '../Layouts/Layout';

interface LocationState {
	title: string;
	label: string;
	placeholder: string;
	type: string;
	name: string;
}



export const EditProfilePage = () => {
	let navigate = useNavigate();
	const location = useLocation();
	const state = location.state as LocationState;

	const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

	return (
		<Layout title={state.title} pageDescription="Página para actualizar datos">
			<Formik
				initialValues={{}}
				validationSchema={Yup.object({
					name: Yup.string().min(2, 'Debe de contener al menos 2 caracteres'),
					username: Yup.string().min(2, 'Debe de contener al menos 2 caracteres'),
					email: Yup.string().email('Revisa tu Email parece que no es valido'),
					password: Yup.string().min(6, 'Debe de contener al menos 6 caracteres'),
					newPassword: Yup.string().min(6, 'Debe de contener al menos 6 caracteres'),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					const newUser = values;
					await updateUser({
						variables: {
							user: newUser,
						},
						onCompleted: ({ updateUser }) => {
							navigate(-1);
						},
					});
				}}
			>
				{({ isSubmitting, handleSubmit, handleChange, values }) => (
					<WrapperForm action="" onSubmit={handleSubmit}>
						<Legend>{state.title}</Legend>
						<Label htmlFor="name">{state.label}</Label>
						<Input
							type={state.type}
							name={state.name}
							placeholder={state.placeholder}
							onChange={handleChange}
              style={{
                marginBottom: '1rem',
              }}
						/>
						<ErrorMessage name={state.name} component={ErrorText} />
						{state.name === 'password' && (
							<>
								<Input
									type="password"
									name="newPassword"
									placeholder="Ingresa la nueva contraseña"
									onChange={handleChange}
								/>
								<ErrorMessage name="newPassword" component={ErrorText} />
							</>
						)}
						<Button type="submit">{loading ? 'Actualizando...' : 'Actualizar'}</Button>
						{error && <p>{error.message}</p>}
					</WrapperForm>
				)}
			</Formik>
		</Layout>
	);
};
