import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { VscIssues } from 'react-icons/vsc'
import { RiUserFollowLine } from 'react-icons/ri'
import { MdLocationOn, MdBusinessCenter } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'
import { GoRepo } from 'react-icons/go'
import { IoIosGlobe } from 'react-icons/io'

import api from '../../services/api-client'
import { Header, UserInfo } from './styles'

import logoImg from '../../assets/github-explorer_logo.svg'
import { IUser, IRepository } from '../../types'
import { Repositories } from './styles'

interface UserParams {
	user: string
}

const User: React.FC = () => {
	const [user, setUser] = useState<IUser | null>(null)
	const [repositories, setRepositories] = useState<IRepository[]>([])

	const { params } = useRouteMatch<UserParams>()

	useEffect(() => {
		api.get(`users/${params.user}`).then(response => {
			setUser(response.data)
		})

		api.get(`users/${params.user}/repos`).then(response => {
			setRepositories(response.data)
			console.log(repositories)
		})
	}, [params.user])

	const created_at = String(user?.created_at).substring(0, 10)

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
						<img src={user.avatar_url} alt={user.name} />
						<div>
							<strong>{user.name}</strong>
							<p>{user.bio}</p>
						</div>
					</header>
					<ul>
						<li>
							<strong>
								<MdLocationOn size={32} />
								<span>{user.location}</span>
							</strong>
							<span>Location</span>
						</li>
						<li>
							<strong>
								<MdBusinessCenter size={32} />
								<span>{user.company}</span>
							</strong>
							<span>Company</span>
						</li>

						<li>
							<strong>
								<AiOutlineCalendar size={32} />
								<span>{created_at}</span>
							</strong>
							<span>User since</span>
						</li>
						<li>
							<strong>
								<RiUserFollowLine size={32} />
								<span>{user.followers}</span>
							</strong>
							<span>Followers</span>
						</li>
						<li>
							<strong>
								<IoIosGlobe size={32} />
								<span>Personal Site</span>
							</strong>
							<span>
								<a className="website" href={user.blog}>
									{user.blog}
								</a>
							</span>
						</li>

						<li>
							<strong>
								<VscIssues size={32} />
								<span>Email</span>
							</strong>
							<span>{user.email || 'No email'}</span>
						</li>
					</ul>
				</UserInfo>
			)}

			{/* {repositories.map(repository => (
				<a key={repository.id}>
					<div>
						<strong>{repository.name}</strong>
						<p>{repository.description}</p>
					</div>

					<FiChevronRight size={17.5} />
				</a> */}

			<Repositories>
				{repositories.map(
					(
						{ id, full_name, owner: { login }, description, name },
						index
					) => (
						<Link key={id} to={`/repository/${login}/${name}`}>
							<span>
								<GoRepo size="32" />
								<strong> {index + 1}.</strong>
							</span>
							{/* <img src={avatar_url} alt={login} /> */}
							<div>
								<strong>{full_name}</strong>
								<p>{description}</p>
							</div>

							<FiChevronRight size={17.5} />
						</Link>
					)
				)}
			</Repositories>
			{/* ))} */}
		</>
	)
}

export default User
