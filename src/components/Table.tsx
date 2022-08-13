import { useEffect, useMemo } from 'react';
import { useMutation, useQuery, NetworkStatus, useSubscription } from '@apollo/client';
import styled from 'styled-components';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import useAuth from '../hooks/useAuth';
import { DELETE_KILL, GET_KILLS, TOTAL_KILLS_PER_USER_IN_GROUP_SUBSCRIPTION } from '../gql/kill';
import { Spinner } from './Spinner';
import { KillsData, UsersKill, User } from '../interfaces';
import throttle from 'lodash/throttle'
import { GET_GROUP } from '../gql/group';



interface Props {
	isTableTop: boolean;
	dataKillsGroup?: UsersKill[];
	style?: React.CSSProperties;
	groupId?: string;
	onLoadMore?: any;
	idGroup?: string;
}

export const TableCustom = ({ isTableTop, dataKillsGroup, style, idGroup}: Props) => {
	const { auth } = useAuth();

	const { data, fetchMore, networkStatus } = useQuery<KillsData>(GET_KILLS, {
		variables: {
			idGroup: idGroup,
			skip: 0,
			limit: 10,
		},
	});

	const kills = (data && data.kills) || [];

	const [deleteKill] = useMutation(DELETE_KILL);

	const onScroll = throttle(() => {
    if (networkStatus !== NetworkStatus.fetchMore) {
      const currentScrollHeight = window.scrollY + window.innerHeight
      const pixelsFromBottom =
        document.documentElement.scrollHeight - currentScrollHeight
      const closeToBottom = window.scrollY > 0 && pixelsFromBottom < 50

      if (closeToBottom && kills.length > 0) {
        fetchMore({ variables: { skip: kills.length } })
      }
    }
  }, 100);

	useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

	return (
		<>
			<TableWrapper style={style}>
				{
					isTableTop ? (
						<TableTop>
						<caption>Top Kill</caption>
						<TableHead>
							<TableTitles>
								<th>#</th>
								<th>Username</th>
								<th>Bajas</th>
							</TableTitles>
						</TableHead>
						<TableBody>
							{
								dataKillsGroup?.map((userKill, index) => (
									<tr key={userKill.user.id}>
										<th>{index + 1}</th>
										<th>{userKill.user.username}</th>
										<th>{userKill.kills}</th>
									</tr>
								))
							}
						</TableBody>
					</TableTop>
					) : (
						<TableHistory>
							<caption>Historial de bajas</caption>
							<TableHead>
							<TableTitles>
								<th>#</th>
								<th>Username</th>
								<th>Fecha</th>
								<th>Bajas</th>
								<th style={{textAlign: 'center'}}>Acciones</th>
							</TableTitles>
						</TableHead>
						<TableBody>
							{ kills.map((kill, index) => {
								const fecha = moment(kill.createdAt).format('DD/MM/YYYY');
								return (
									<tr key={kill.id}>
										<th>{index + 1}</th>
										<th>{kill.idUser.username}</th>
										<th>{fecha}</th>
										<th>{kill.low}</th>
										{
											kill?.idUser?.id === auth.id && kill?.low !== 0 && (
												<th style={{textAlign: 'center'}}>
													<ButtonTash
														onClick={async() => {
															await deleteKill({
																variables: {
																	killInput: {
																		id: kill.id,
																		idGroup: idGroup
																	}
																},
																refetchQueries: [
																	GET_KILLS,
																	GET_GROUP
																]
															})
														}}
													>
														<FontAwesomeIcon icon={faTrash} color="white" />
													</ButtonTash>
												</th>
											)
										}
									</tr>
								)
								}
							)}
						</TableBody>
						</TableHistory>
					)
				}
			</TableWrapper>
		</>
	);
};

const TableWrapper = styled.div`
	width: 100%;
	text-align: left;
`;

const TableTop = styled.table`
	width: calc(100% - 40px);
	border-collapse: collapse;
	margin: 0px auto;

	th {
		padding: 5px;
	}

	tr {
		border-bottom: 1px solid ${({theme}) => theme.border};
	}
`;

const TableHistory = styled(TableTop)``;

const TableTitles = styled.tr``;

const TableHead = styled.thead`
	color: ${({theme}) => theme.label};
	padding: 10px;

	tr {
		position: sticky;
		top: -1px;
		height: 50px;
		background-color: ${({theme}) => theme.background};
	}
`;

const TableBody = styled.tbody`
	tr {
		&:nth-child(odd) {
			background: #24272d;
		}
	}
`;

const TableFoot = styled.tfoot`
	height: 50px;

	tr {
		position: sticky;
		bottom: -1px;
		background-color: ${({theme}) => theme.background};
	}
`;

const ButtonTash = styled.button`
	border: none;
	border-radius: 5px;
	padding: 5px;
	background-color: red;
`;
