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
	created_at: Date
	name: string
	email: string
	location: string
	followers: number
	bio: string
	company: string
	blog: string
	html_url: string
	avatar_url: string
	repos_url: string
}
