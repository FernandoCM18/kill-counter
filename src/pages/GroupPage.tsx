import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../Layouts/Layout';
import { H1, MediumText, Caption} from '../styles/TextStyle';

import styled from 'styled-components';
import { Charts } from '../components/Chart';
import { TableCustom } from '../components/Table';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { GET_GROUP } from '../gql/group';
import { GroupResponse } from '../interfaces/group';
import { GET_KILLS, TOTAL_KILLS_PER_USER_IN_GROUP_SUBSCRIPTION, KILL_CREATED_SUBSCRIPTION } from '../gql/kill';
import { Button } from '../styles/FormStyle';
import { CardWrapper } from '../components/Card';
import { faSkull, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../hooks/useAuth';
import { useEffect, useMemo } from 'react';
import { Spinner } from '../components/Spinner';

export const GroupPage = () => {
	const { auth } = useAuth()
	const { id } = useParams();
	const navigate = useNavigate();
	const idRef = useRef(id);
	
	let userKills;

	const {data, error, loading, refetch} = useQuery<GroupResponse>(GET_GROUP, {
		variables: {
			id: id
		},
	});

	const {refetch: refetchKills} = useQuery(GET_KILLS, {
		variables: {
			idGroup: idRef.current
		}
	})

	userKills = data?.group?.usersKill;

	useSubscription(TOTAL_KILLS_PER_USER_IN_GROUP_SUBSCRIPTION, {
		onSubscriptionData: ({ subscriptionData }) => {
			if (subscriptionData) {
				refetch();
				refetchKills();
			}
		},
	});

	return (
		<Layout
			title="Nombre del grupo"
			pageDescription="Descripcion del grupo"
			style={{
				display: 'grid',
				position: 'relative'
			}}
		>
			<Title>{data?.group?.name}</Title>
			<Description>{data?.group?.description}</Description>

			<WrapperCards>
				{
					loading ? (
						<p>Cargando...</p>
					) : (
						<>
							<Card>
								<Totales>{data?.group?.groupKills}</Totales>
								<span>Bajas</span>
							</Card>
							<Card>
								<Totales>{data?.group?.users.length}</Totales>
								<span>Integrantes</span>
							</Card>
						</>
					)
				}
			</WrapperCards>

			{
				data?.group?.author?.id === auth.id && (
					<div style={{margin: '20px'}}>
						<Button
							onClick={() => navigate(`/addPersonToGroup/${id}`)}
						> 
							+ Agregar persona
						</Button>
					</div>
				)
				
			}
			{/* <Charts data={userKills} /> */}

			<TableCustom 
				isTableTop 
				dataKillsGroup={userKills} 
			/>


			<div style={{margin: '20px'}}>
				<Button
					onClick={() => navigate(`/addKillsToGroup/${id}`)}
				>
					<FontAwesomeIcon icon={faSkull} />
					<span style={{marginLeft: '10px'}}>Agregar Kill</span>
				</Button>
			</div>

			<TableCustom 
				isTableTop={false} 
				idGroup={idRef.current}
				style={{
					marginBottom: '100px'
				}}
			/>

		</Layout>
	);
};

const Title = styled(H1)`
	text-align: left;
	margin-left: 20px;
`;

const Description = styled(MediumText)`
	text-align: left;
	margin: 0px 20px;
`;

const WrapperCards = styled.div`
	display: flex;
	flex-direction: row;
	margin: 20px;
	justify-content: space-between;
`;

const Card = styled(CardWrapper)`
	text-align: center;
`;

const Totales = styled.p`
	font-size: 20px;
	font-weight: bold;
	margin: 5px;
`;

