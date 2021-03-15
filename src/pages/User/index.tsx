import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
// import { VscIssues } from 'react-icons/vsc'
// import { CgGitFork } from 'react-icons/cg'
// import { RiStarSFill } from 'react-icons/ri'

import api from '../../services/api-client'
import { Header, UserInfo, Repositories } from './styles'

import logoImg from '../../assets/github-explorer_logo.svg'

interface UserParams {
	user: string
}

interface User {
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

interface Repositories {
	id: number
	name: string
	url: string
	description: string
	owner: {
		login: string
	}
}

const User: React.FC = () => {
	const [user, setUser] = useState<User | null>(null)
	const [repositoriesList, setRepositoriesList] = useState<Repositories[]>([])

	const { params } = useRouteMatch<UserParams>()

	useEffect(() => {
		api.get(`users/${params.user}`).then(response => {
			setUser(response.data)
		})

		api.get(`users/${params.user}/repos`).then(response => {
			setRepositoriesList(response.data)
		})
	}, [params.user])

	return (
		<>
			<Header>
				<img src={logoImg} alt="Github Explorer" />
				<Link to="/">
					<FiChevronLeft size={16} />
					Voltar
				</Link>
			</Header>

			{user && (
				<UserInfo>
					<header>
						<img src={user.avatar_url} alt={user.login} />
						<div>
							<strong>{user.name}</strong>
							<p>{user.bio}</p>
						</div>
					</header>
					<ul>
						<li>
							<strong>
								{/* <RiStarSFill size={32} /> */}
								<span>Company</span>
							</strong>
							<span>{user.company}</span>
						</li>
						{user.email && (
							<li>
								<strong>
									{/* <CgGitFork size={32} /> */}
									<span>Email</span>
								</strong>
								<span>{user.email}</span>
							</li>
						)}
						<li>
							<strong>
								{/* <CgGitFork size={32} /> */}
								<span>Since</span>
							</strong>
							<span>{user.created_at}</span>
						</li>
						<li>
							<strong>
								{/* <VscIssues size={32} /> */}
								<span>Location:</span>
							</strong>
							<span>{user.location}</span>
						</li>
					</ul>
				</UserInfo>
			)}

			<Repositories>
				{repositoriesList.map(repository => (
					<Link
						key={repository.id}
						to={`/repository/${repository.owner.login}/${repository.name}`}
					>
						<div>
							<strong>{repository.name}</strong>
							<p>{repository.description}</p>
						</div>

						<FiChevronRight size={17.5} />
					</Link>
				))}
			</Repositories>
		</>
	)
}

export default User
