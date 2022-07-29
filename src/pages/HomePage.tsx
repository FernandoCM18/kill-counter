import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { ME } from '../gql';
import { Layout } from '../Layouts/Layout';
import { Card } from '../components/Card';
import { faSkull, faCrown, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { H1, H2 } from '../styles/TextStyle';
import { QueryME } from '../interfaces';
import { Spinner } from '../components/Spinner';

interface Props {
  direction: string;
}

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
        position: 'relative'
      }}
    >
      <div>
        <Title>Kill Counter</Title>
        <WrapperCards direction='row'>
          <Card title="Kills Globales" subtitle={data?.me.totalKills} iconTitle={faSkull} />
          {/* <Card title="Global Wins" subtitle="344" iconTitle={faCrown} /> */}
        </WrapperCards>
      </div>

      <WrapperSubtitleButton>
        <Subtitle>Grupos</Subtitle>
        <Button onClick={() => navigate('/addGroup')}>Agregar grupo</Button>
        {/* <Link to="/addGroup">+ Agregar grupo</Link> */}
      </WrapperSubtitleButton>
      <div style={{
        overflowY: 'scroll',
      }}>
        <WrapperCards direction='column'>
          {/* {
            loading && <p>Cargando...</p>
          } */}
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

const WrapperCards = styled.div<Props>`
  display: flex;
  flex-direction: ${({direction}) => (direction === 'row' ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  margin: ${({direction}) => (direction === 'row' ? '0px' : '20px')};
  margin-bottom: ${({direction}) => (direction === 'column' ? '100px' : '0px')};
`;

const Title = styled(H1)`
  text-align: left;
  margin-left: 20px;
`;

const WrapperSubtitleButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 20px;
`;

const Subtitle = styled(H2)`
  text-align: left;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${({theme}) => theme.dark.primary};
  color: ${({theme}) => theme.dark.text1};
  font-size: 18px;
  padding: 10px;
  height: 40px;
  cursor: pointer;
`;




