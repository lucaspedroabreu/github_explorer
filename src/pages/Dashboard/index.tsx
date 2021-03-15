import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api-client'

import { Title, Form, Repositories, Error } from './styles'

import svgLogo from '../../assets/github-explorer_logo.svg'
import { IRepository, User } from '../../types'

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

	const [users, setUsers] = useState<User[]>(() => {
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

	async function setUser() {
		try {
			const { data: user } = await api.get<User>(`users/${trackingQuery}`)

			console.log('user ', user)

			setUsers(previousUsers => {
				const notIncludingSearchedUser = previousUsers.filter(
					aUser => aUser.login !== user.login
				)

				return [...notIncludingSearchedUser, user]
			})

			setHasError(prevErrors => ({ ...prevErrors, user: false }))
		} catch (e) {
			setHasError(prevErrors => ({ ...prevErrors, user: true }))
		}
	}

	async function setRepository() {
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

		await Promise.all([setRepository(), setUser()])

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
				{repositories.map(
					({
						id,
						full_name,
						owner: { login, avatar_url },
						description,
						name,
					}) => (
						<Link key={id} to={`/repository/${login}/${name}`}>
							<img src={avatar_url} alt={login} />
							<div>
								<strong>{full_name}</strong>
								<p>{description}</p>
							</div>

							<FiChevronRight size={17.5} />
						</Link>
					)
				)}
			</Repositories>
		</>
	)
}

export default Dashboard
