import styled, {ThemeContext} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../Layouts/Layout';
import { H1, H3 } from '../styles/TextStyle';
import { Button } from '../styles/FormStyle';
import { useQuery, gql } from '@apollo/client';
import { Spinner } from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToggleSwitch } from '../components/ToggleSwitch';

const ME = gql`
 query {
   me {
    id
    name
    username
    email
    password
   }
 }
`;

export const UserPage = () => {
  const {logout} = useAuth();
  let navigate = useNavigate();
  const {data, error, loading} = useQuery(ME);

  return (
    <Layout 
      title="Nombre del usuario" 
      pageDescription="Pagiandel usuario"
      style={{
				display: 'grid',
        gridAutoRows: 'min-content',
			}}>
        <Title>Ajustes</Title>
        <WrapperData>
          {
            loading && <Spinner />
          }
          <Label onClick={() => navigate('/editProfile', {
            state: {
              title: 'Actualizar nombre',
              label: 'Nombre',
              placeholder: 'Ingresa tu nuevo nombre',
              type: 'text',
              name: 'name'
            }
          })}>
            <span><b>Nombre:</b> {data?.me.name}</span><FontAwesomeIcon icon={faChevronRight} />
          </Label>
          <Label onClick={() => navigate('/editProfile', {
            state: {
              title: 'Actualizar Username',
              label: 'Username',
              placeholder: 'Ingresa tu nuevo username',
              type: 'text',
              name: 'username'
            }
          })}>
            <span><b>Username:</b> {data?.me.username}</span><FontAwesomeIcon icon={faChevronRight} />
          </Label>
          <Label onClick={() => navigate('/editProfile', {
            state: {
              title: 'Actualizar Email',
              label: 'Email',
              placeholder: 'Ingresa tu nuevo email',
              type: 'email',
              name: 'email'
            }
          })}>
            <span><b>Email:</b> {data?.me.email}</span><FontAwesomeIcon icon={faChevronRight} />
          </Label>
          <Label onClick={() => navigate('/editProfile', {
            state: {
              title: 'Actualizar Contraseña',
              label: 'Contraseña',
              placeholder: 'Ingresa tu contraseña actual',
              type: 'password',
              name: 'password'
            }
          })}>
            <span><b>Contraseña:</b> ******</span><FontAwesomeIcon icon={faChevronRight} />
          </Label>
          <Label>
              <span><b>Tema:</b></span><ToggleSwitch />
          </Label>
          <Button 
            type="button"
            style={{backgroundColor: 'red'}}
            onClick={() => {
              logout();
              navigate('/auth/login');
            }}
          >
              Cerrar sesion
          </Button>     
        </WrapperData>   
      </Layout>
  )
};

const Title = styled(H1)`
  text-align: left;
  margin-left: 20px;
  color: ${({theme}) => theme.text}
`

const WrapperData = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px;
`;

const Label = styled.div`
  font-size: 20px;
  background-color: ${({theme}) => theme.backgroundCard};
  color: ${({theme}) => theme.text};
  min-height: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 10px;

   span {
    max-width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @media (min-width: 450px) {
      width: 100%;
    }
   }
`;
