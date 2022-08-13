import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { ME } from '../gql';
import { Layout } from '../Layouts/Layout';
import { Card } from '../components/Card';
import { faSkull, faCrown, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { H1, H2 } from '../styles/TextStyle';
import { QueryME } from '../interfaces';
import { Spinner } from '../components/Spinner';

export const HomePage = () => {
  let navigate = useNavigate();
  const {data, error, loading} = useQuery<QueryME>(ME);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <Spinner />
      </div>
    )
  };

  return (
    <Layout 
      title="Home" 
      pageDescription="Pagina de inicio"
      style={{
        display: 'grid',
        height: '100vh',
        position: 'relative',
        margin: '0px 20px'
      }}
    >
      <div>
        <Title>Kill Counter</Title>
        <WelcomeMessage>
          <span>Bienvenido ✋</span><br/>
          {data.me.username}
        </WelcomeMessage>
        <WrapperCards 
          style={{
            marginBottom: '0px',
            alignItems: 'flex-start',
            padding: '0px'
          }}
        >
          <Card 
            title="Kills Globales" 
            subtitle={data?.me.totalKills} 
            iconTitle={faSkull} 
            style={{
              width: '200px',
              margin: '0px',
            }}
          />
        </WrapperCards>
      </div>

      <WrapperSubtitleButton>
        <Subtitle>Grupos</Subtitle>
        <Link to="/addGroup">+ Crear grupo</Link>
      </WrapperSubtitleButton>
      <div style={{
        overflowY: 'scroll',
      }}>
        <WrapperCards>
          {
            (data?.me?.groups?.length === 0) && <p>Sin grupos</p>
          }
          {            
            data?.me?.groups?.map(group => (
              <Card
                key={group.id}
                title={group.name}
                iconTitle={faGamepad}
                totalIntegrantes={group.users.length}
                totalKills={group.groupKills}
                onClick={() => navigate(`/group/${group.id}`)} 
              />
            ))
          }        
        </WrapperCards>
      </div>

      
    </Layout>
  )
}

const WrapperCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  margin-bottom: 100px;
  
`;

const WelcomeMessage = styled.p`
  font-size: 28px;
  text-align: left;
  color: ${({theme}) => theme.text};

  span {
    color: #A3A3A3;
    font-weight: bold;
  }
`;

const Title = styled(H1)`
  text-align: left;
  margin-top: 50px;
  color: ${({theme}) => theme.text}
`;

const WrapperSubtitleButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
`;

const Subtitle = styled(H2)`
  color: ${({theme}) => theme.text};
  text-align: left;
`;



