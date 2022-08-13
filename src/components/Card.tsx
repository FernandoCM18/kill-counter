import { useQuery } from '@apollo/client';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faUser, IconDefinition, faGamepad } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title: string;
  subtitle?: string | number;
  iconTitle: IconDefinition
  totalIntegrantes?: number;
  totalKills?: number;
  totales?: number;
  onClick?: () => void;  
  style?: React.CSSProperties;
}


export const Card = ({title, iconTitle, subtitle, totalIntegrantes, totalKills, onClick, style }: Props) => {
  const theme = useTheme()

  return (
    <CardWrapper
      onClick={onClick}
      style={style}
    >
        <CardTitle>
          <CardContainerIcon>
            <FontAwesomeIcon icon={iconTitle} color={theme.icon} size="xs" />
          </CardContainerIcon>
          {title}
        </CardTitle>
        {
          subtitle && (
            <CardSubtitle>
              {subtitle}
            </CardSubtitle>
          )
        }
        {
          totalIntegrantes && (
            <CardBody>
              <CardBodyIconText>
                <FontAwesomeIcon icon={faUser} size="2x" color={theme.text}/>
                <Text>{totalIntegrantes} Integrantes</Text>
              </CardBodyIconText>
              <CardBodyIconText>
                <FontAwesomeIcon icon={faSkull} size="2x" color={theme.text} />
                <Text>{totalKills} Kills</Text>
              </CardBodyIconText>
            </CardBody>
          )
        }
    </CardWrapper>
  )
};

export const CardWrapper = styled.div`
  border-radius: 15px;
  border: 1px solid ${({theme}) => theme.border};
  background-color: ${({theme}) => theme.backgroundCard};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: 10px;
  text-align: left;
  width: 100%;
  height: fit-content;
  margin: 10px;
  cursor: pointer;
`;

const CardTitle = styled.h2`
  align-items: center;
  color: ${({theme}) => theme.text};
  display: flex;
  font-size: 20px;
  flex-direction: row;
  margin: 0px;
`;

const CardContainerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.backgroundIcon};
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const CardSubtitle = styled.h3`
  font-size: 40px;
  margin: 10px;
  text-align: center;
  color: ${({theme}) => theme.text};
`;

const CardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
`;

const CardBodyIconText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
  margin-top: 10px;
`;