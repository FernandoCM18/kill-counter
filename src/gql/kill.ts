import { gql } from '@apollo/client';

export const CREATE_KILL = gql`
	mutation CREATE_KILL($killInput: CreateKillInput!) {
		createKill(killInput: $killInput) {
			id
			low
			createdAt
			idGroup {
				id
				name
			}
			idUser {
				id
				username
			}
		}
	}
`;

export const GET_KILLS = gql`
	query GET_KILLS($idGroup: ID, $skip: Int, $limit: Int) {
		kills(idGroup: $idGroup, skip: $skip, limit: $limit) {
			id
			low
			createdAt
			idUser {
				id
				username
			}
		}
	}
`;

export const GET_KILL = gql`
	query GET_KILL($id: ID!) {
		kill(id: $id) {
			id
			low
			idUser {
				id
				username
			}
		}
	}
`;

export const UPDATE_KILL = gql`
	mutation UPDATE_KILL($killInput: UpdateKillInput!) {
		updateKill(killInput: $killInput) {
			id
			low
			idUser {
				username
			}
		}
	}
`;

export const DELETE_KILL = gql`
	mutation DELETE_KILL($killInput: DeleteKillInput) {
		deleteKill(killInput: $killInput) {
			id
			low
		}
	}
`;

export const GET_TOTAL_KILLS_IN_GROUP = gql`
	query GET_TOTAL_KILLS_IN_GROUP($idGroup: ID) {
		totalKillsInGroup(idGroup: $idGroup)
	}
`;

export const GET_TOTAL_KILLS_PER_USER = gql`
	query GET_TOTAL_KILLS_PER_USER($idUser: ID) {
		totalKillsPerUser(idUser: $idUser)
	}
`;

export const GET_KILLS_PER_USER_IN_GROUP = gql`
	query GET_KILLS_PER_USER_IN_GROUP($idUser: ID, $idGroup: ID) {
		totalKillsPerUserInGroup(idUser: $idUser, idGroup: $idGroup) {
			user {
				id
				username
			}
			kills
		}
	}
`;

export const KILL_CREATED_SUBSCRIPTION = gql`
	subscription {
		killCreated {
			id
			low
			idGroup {
				name
			}
			idUser {
				username
			}
		}
	}
`;

export const Kill_UPDATED_SUBSCRIPTION = gql`
	subscription {
		killUpdated {
			idGroup {
				name
			}
			idUser {
				username
			}
			low
		}
	}
`;

export const KILL_DELETED_SUBSCRIPTION = gql`
	subscription {
		KillDeleted {
			idUser {
				username
			}
			idGroup {
				name
			}
			low
		}
	}
`;

export const TOTAL_KILLS_IN_GROUP_SUBSCRIPTION = gql`
	subscription {
		totalKillsInGroup
	}
`;

export const TOTAL_KILLS_PER_USER_IN_GROUP_SUBSCRIPTION = gql`
	subscription {
		totalKillsPerUserInGroup {
			user {
				id
				username
			}
			kills
		}
	}
`;
