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

		try {
			const githubResponseOne = await api.get<IRepository>(
				`repos/${trackingQuery}`
			)
			const githubResponseTwo = await api.get<User>(`users/${trackingQuery}`)

			const repository = githubResponseOne.data
			const user = githubResponseTwo.data

			setRepositories(previousRepositories => {
				const notIncludingSearchedRepo = previousRepositories.filter(
					repo => repo.id !== repository.id
				)

				return [...notIncludingSearchedRepo, repository]
			})

			setUsers(previousUsers => {
				const notIncludingSearchedUser = previousUsers.filter(
					aUser => aUser.login !== user.login
				)

				return [...notIncludingSearchedUser, user]
			})

			setTrackingQuery('')
			setInputError('')
		} catch (err) {
			setInputError(
				"Repositório ou Usuário não encontrado. Digite no formato 'Usuário' ou 'autor/nome'."
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
