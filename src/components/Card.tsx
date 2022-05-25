import { useQuery } from '@apollo/client';
import styled from 'styled-components';
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


export const Card = ({title, iconTitle, subtitle, totalIntegrantes, totalKills, onClick, totales, style }: Props) => {
  return (
    <CardWrapper
      onClick={onClick}
    >
        <CardTitle>
          <CardContainerIcon>
            <FontAwesomeIcon icon={iconTitle} color={'#26ce60'} size="xs" />
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
          totales && <Text style={style}>{totales}</Text>
        }
        {
          totalIntegrantes && (
            <CardBody>
              <CardBodyIconText>
                <FontAwesomeIcon icon={faUser} size="2x"/>
                <Text>{totalIntegrantes} Integrantes</Text>
              </CardBodyIconText>
              <CardBodyIconText>
                <FontAwesomeIcon icon={faSkull} size="2x" />
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
  border: 1px solid ${({theme}) => theme.dark.border};
  background-color: ${({theme}) => theme.dark.card.backgroundColor};
  padding: 10px;
  text-align: left;
  width: 100%;
  height: fit-content;
  margin: 10px;
  cursor: pointer;
`;

const CardTitle = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px;
  font-size: 20px;
`;

const CardContainerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.dark.icon.backgroundColor};
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const CardSubtitle = styled.h3`
  font-size: 40px;
  margin: 10px;
  text-align: center;
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
  color: ${({theme}) => theme.dark.input.LabelColor};
  margin-top: 10px;
`;