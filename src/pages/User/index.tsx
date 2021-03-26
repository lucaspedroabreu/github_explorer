import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api-client'
import {
	Header,
	UserInfo,
	Repositories,
	RepoNameWrapper,
	RepoInfoWrapper,
	BookIcon,
} from './styles'
import logoImg from '../../assets/github-explorer_logo.svg'
import { IRepository, IUser } from '../../types'
import parseUser from '../../selectors/users'

interface UserParams {
	user: string
}

const User: React.FC = () => {
	const [repositoriesList, setRepositoriesList] = useState<IRepository[]>([])

	const { state } = useLocation<IUser | undefined>()
	const [user, setUser] = useState<IUser | undefined>(state)
	const params = useParams<UserParams>()

	useEffect(() => {
		if (!user) {
			api.get(`users/${params.user}`).then(response => {
				setUser(parseUser(response.data))
			})
		}
	}, [params.user, user])

	useEffect(() => {
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
						{user.company && (
							<li>
								<strong>
									{/* <RiStarSFill size={32} /> */}
									<span>Empresa:</span>
								</strong>
								<span>{user.company}</span>
							</li>
						)}
						{user.email && (
							<li>
								<strong>
									{/* <CgGitFork size={32} /> */}
									<span>Email:</span>
								</strong>
								<span>{user.email}</span>
							</li>
						)}

						{user.created_at && (
							<li>
								<strong>
									{/* <CgGitFork size={32} /> */}
									<span>Desde:</span>
								</strong>
								<span>{user.created_at}</span>
							</li>
						)}

						{user.location && (
							<li>
								<strong>
									{/* <VscIssues size={32} /> */}
									<span>Localidade:</span>
								</strong>
								<span>{user.location}</span>
							</li>
						)}
					</ul>
				</UserInfo>
			)}

			<Repositories>
				{repositoriesList.map(repository => (
					<Link
						key={repository.id}
						to={`/repository/${repository.owner.login}/${repository.name}`}
					>
						<RepoInfoWrapper>
							<RepoNameWrapper>
								<BookIcon size={20} color="#3a3a3a" />
								<strong>{repository.name}</strong>
							</RepoNameWrapper>
							<p>{repository.description}</p>
						</RepoInfoWrapper>

						<FiChevronRight size={17.5} />
					</Link>
				))}
			</Repositories>
		</>
	)
}

export default User
