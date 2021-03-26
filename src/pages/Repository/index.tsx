import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { VscIssues } from 'react-icons/vsc'
import { CgGitFork } from 'react-icons/cg'
import { RiStarSFill } from 'react-icons/ri'
import api from '../../services/api-client'
import { Header, RepositoryInfo, Issues } from './styles'

import logoImg from '../../assets/github-explorer_logo.svg'
import { IRepository } from '../../types'

interface RepositoryParams {
	user: string
	repository: string
}

interface Issue {
	id: number
	title: string
	html_url: string
	user: {
		login: string
	}
}

const Repository: React.FC = () => {
	const { state } = useLocation<IRepository | undefined>()
	const [repository, setRepository] = useState<IRepository | undefined>(state)
	const [issues, setIssues] = useState<Issue[]>([])
	const params = useParams<RepositoryParams>()

	console.log('params ', params)

	console.log('repository ', repository)

	useEffect(() => {
		if (!repository) {
			api.get(`repos/${params.user}/${params.repository}`).then(response => {
				setRepository(response.data)
			})
		}
	}, [params.user, params.repository])

	useEffect(() => {
		api.get(`repos/${params.user}/${params.repository}/issues`).then(
			response => {
				setIssues(response.data)
			}
		)
	}, [params.user, params.repository])

	return (
		<>
			<Header>
				<img src={logoImg} alt="Github Explorer" />
				<Link to="/">
					<FiChevronLeft size={16} />
					Voltar
				</Link>
			</Header>

			{repository && (
				<RepositoryInfo>
					<header>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
					</header>
					<ul>
						<li>
							<strong>
								<RiStarSFill size={32} />
								<span>{repository.stargazers_count}</span>
							</strong>
							<span>Stars</span>
						</li>
						<li>
							<strong>
								<CgGitFork size={32} />
								<span>{repository.forks_count}</span>
							</strong>
							<span>Forks</span>
						</li>

						<li>
							<strong>
								<VscIssues size={32} />
								<span>{repository.open_issues_count}</span>
							</strong>
							<span>Issues abertas</span>
						</li>
					</ul>
				</RepositoryInfo>
			)}

			<Issues>
				{issues.map(issue => (
					<a
						key={issue.id}
						href={issue.html_url}
						rel="noreferrer"
						target="_blank"
					>
						<div>
							<strong>{issue.title}</strong>
							<p>{issue.user.login}</p>
						</div>

						<FiChevronRight size={17.5} />
					</a>
				))}
			</Issues>
		</>
	)
}

export default Repository
