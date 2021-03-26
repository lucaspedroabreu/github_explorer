export interface IRepository {
	id: number
	name: string
	full_name: string
	description: string
	stargazers_count: number
	forks_count: number
	open_issues_count: number
	owner: {
		login: string
		avatar_url: string
	}
}

export interface IUser {
	id: number
	login: string
	avatar_url: string
	name: string
	company: string
	blog: string
	location: string
	email: string
	bio: string
	created_at: string
}
