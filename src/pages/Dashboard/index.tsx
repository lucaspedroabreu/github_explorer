import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api-client'
import { Title, Form, Repositories, Error, SubTitle, Users } from './styles'
import svgLogo from '../../assets/github-explorer_logo.svg'
import { IRepository, IUser } from '../../types'
import parseUser from '../../selectors/users'

const Dashboard: React.FC = () => {
	const [trackingQuery, setTrackingQuery] = useState('')
	const [inputError, setInputError] = useState('')
	const [hasError, setHasError] = useState({ repository: false, user: false })

	const [repositories, setRepositories] = useState<IRepository[]>(() => {
		const storedRepositories = localStorage.getItem(
			'@GithubExplorer:repositories'
		)

		if (storedRepositories) {
			return JSON.parse(storedRepositories)
		}

		return []
	})

	const [users, setUsers] = useState<IUser[]>(() => {
		const storedUsers = localStorage.getItem('@GithubExplorer:users')

		if (storedUsers) {
			return JSON.parse(storedUsers)
		}

		return []
	})

	useEffect(() => {
		localStorage.setItem(
			'@GithubExplorer:repositories',
			JSON.stringify(repositories)
		)
	}, [repositories])

	useEffect(() => {
		localStorage.setItem('@GithubExplorer:users', JSON.stringify(users))
	}, [users])

	async function fetchUser() {
		try {
			const { data: user } = await api.get<IUser>(`users/${trackingQuery}`)

			console.log('user ', user)

			setUsers(previousUsers => {
				const notIncludingSearchedUser = previousUsers.filter(
					aUser => aUser.login !== user.login
				)

				return [...notIncludingSearchedUser, parseUser(user)]
			})

			setHasError(prevErrors => ({ ...prevErrors, user: false }))
		} catch (e) {
			setHasError(prevErrors => ({ ...prevErrors, user: true }))
		}
	}

	async function fetchRepository() {
		try {
			const { data: repository } = await api.get<IRepository>(
				`repos/${trackingQuery}`
			)

			console.log('repository ', repository)

			setRepositories(previousRepositories => {
				const notIncludingSearchedRepo = previousRepositories.filter(
					repo => repo.id !== repository.id
				)

				return [...notIncludingSearchedRepo, repository]
			})

			setHasError(prevErrors => ({ ...prevErrors, repository: false }))
		} catch (e) {
			setHasError(prevErrors => ({ ...prevErrors, repository: true }))
		}
	}

	async function handleAddTracker(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault()

		if (!trackingQuery) {
			setInputError(
				"Digite o nome do usuário ou 'autor/nome' do repositório."
			)
			return
		}

		await Promise.all([fetchRepository(), fetchUser()])

		if (hasError.repository && hasError.user) {
			setInputError(
				"Digite o nome do usuário ou 'autor/nome' do repositório."
			)
		}
	}

	return (
		<>
			<header>
				<img src={svgLogo} alt="Github Explorer" />
			</header>
			<Title>Explore repositórios no Github.</Title>
			<Form hasError={!!inputError} onSubmit={handleAddTracker}>
				<input
					value={trackingQuery}
					onChange={e => setTrackingQuery(e.target.value)}
					placeholder="Digite aqui..."
				/>
				<button type="submit">Pesquisar</button>
			</Form>

			{inputError && <Error>{inputError}</Error>}

			<Repositories>
				{repositories.length > 0 && <SubTitle>Repositórios</SubTitle>}
				{repositories.map(repository => (
					<Link
						key={repository.id}
						to={{
							pathname: `/repository/${repository.owner.login}/${repository.name}`,
							state: repository,
						}}
					>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>

						<FiChevronRight size={17.5} />
					</Link>
				))}
			</Repositories>

			{users.length > 0 && <SubTitle>Usuários</SubTitle>}
			<Users>
				{users.map(user => (
					<Link
						key={user.id}
						to={{ pathname: `/user/${user.login}`, state: user }}
					>
						<img src={user.avatar_url} alt={user.login} />
						<div>
							<div>
								<strong>{user.name}</strong>
							</div>
							<h4>{user.login}</h4>
							<p>{user.bio}</p>
						</div>
						<FiChevronRight size={17.5} />
					</Link>
				))}
			</Users>
		</>
	)
}

export default Dashboard
