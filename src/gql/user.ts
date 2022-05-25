import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation LOGIN($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export const CREATE_USER = gql`
	mutation CREATE_USER($user: CreateUserInput!) {
		createUser(user: $user) {
			token
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UPDATE_USER($user: UpdateUserInput!) {
		updateUser(user: $user) {
			id
			name
			username
			email
		}
	}
`;

export const ME = gql`
	query ME {
		me {
			id
			name
			username
			email
			groups {
				id
				name
				users {
					id
					username
				}
				groupKills
			}
			totalKills
		}
	}
`;

export const GET_USERS = gql`
	query GET_USERS {
		users {
			id
			name
			username
			email
			groups {
				name
			}
			createdAt
			updatedAt
		}
	}
`;

export const GET_USER = gql`
	query GET_USER($id: ID, $username: String) {
		user(id: $id, username: $username) {
			id
			name
			email
			username
			groups {
				name
			}
		}
	}
`;

export const SEARCH = gql`
	query SEARCH($search: String) {
		search(search: $search) {
			id
			name
			username
		}
	}
`;
