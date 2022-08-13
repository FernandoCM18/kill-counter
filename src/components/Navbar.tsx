import styled, { useTheme } from 'styled-components';
import { faHome, faMagnifyingGlass, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../gql/user';

export const Navbar = () => {
  const {refetch} = useQuery(ME);
  const theme = useTheme();

  return (
    <WrapperNav>
      <ul>
        <li key="home">
          <NavLink 
            to="/home"
            style={({ isActive }) => ({ color: isActive ? theme.primary : theme.text })}
            onClick={() => refetch()}
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
          </NavLink>
        </li>
        {/* <li key="buttonInNav">
          <ButtonInNav
            onClick={() => console.log('Se agrego una baja')}
          >
              <FontAwesomeIcon icon={faPlus} color="white"/>
          </ButtonInNav>
        </li> */}
        <li key="settings">
          <NavLink 
            to="/settings"
            style={({ isActive }) => ({ color: isActive ? theme.primary : theme.text })}
          >
              <FontAwesomeIcon icon={faBars} size="lg" />
          </NavLink>
        </li>
      </ul>
    </WrapperNav>
  )
};

const WrapperNav = styled.nav`
  position: fixed;
  height: 88px;
  background-color: ${({theme}) => theme.backgroundNavbar};
  width: 100%;
  backdrop-filter: blur(20px);
  border-radius: 20px 20px 0px 0px;
  z-index: 100;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ul {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    padding-left: 0;
    align-items: center;
    justify-content: center;
    
    li {
      list-style: none;

      a {
        color: ${({theme}) => theme.text};
      }
    }
  }
`;

const ButtonInNav = styled.button`
  background-color: ${({theme}) => theme.primary};
  border-radius: 100%;
  border: none;
  width: 60px;
  height: 60px;
  position: absolute;
  top: -25px;
  left: calc(50% - 30px);
`;
