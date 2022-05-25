import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
	mutation CREATE_GROUP($groupInput: CreateGroupInput) {
		createGroup(groupInput: $groupInput) {
			name
			description
		}
	}
`;

export const GET_GROUPS = gql`
	query GET_GROUPS {
		groups {
			id
			name
			description
			author {
				id
				name
				email
				username
			}
			users {
				id
				name
			}
			groupKills
		}
	}
`;

export const GET_GROUP = gql`
	query GET_GROUP($id: ID, $name: String) {
		group(id: $id, name: $name) {
			name
			description
			author {
				id
				name
				username
			}
			users {
				name
				username
				createdAt
			}
			usersKill {
				user {
					id
					username
				}
				kills
			}
			groupKills
		}
	}
`;

const UPDATE_GROUP = gql`
	mutation UPDATE_GROUP($groupInput: UpdateGroupInput) {
		updateGroup(groupInput: $groupInput) {
			name
			description
			author {
				name
				username
			}
		}
	}
`;

export const ADD_USER_TO_GROUP = gql`
	mutation ADD_USER_TO_GROUP($addUserInput: AddUserToGroupInput!) {
		addUserToGroup(addUserInput: $addUserInput) {
			name
			description
			users {
				username
			}
		}
	}
`;

export const DELETE_USER_TO_GROUP = gql`
	mutation DELETE_USER_TO_GROUP($deleteUserInput: DeleteUserToGroupInput!) {
		deleteUserToGroup(deleteUserInput: $deleteUserInput) {
			name
			description
			users {
				username
			}
		}
	}
`;

export const DELETE_GROUP = gql`
	mutation DELETE_GROUP($idGroupInput: ID!) {
		deleteGroup(idGroupInput: $idGroupInput) {
			name
		}
	}
`;
