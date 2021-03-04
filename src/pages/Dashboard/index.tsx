import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api-client'

import { Title, Form, Repositories, Error } from './styles'

import svgLogo from '../../assets/github-explorer_logo.svg'
import { IRepository } from '../../types'

const Dashboard: React.FC = () => {
	const [repoQuery, setQuery] = useState('')
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

	useEffect(() => {
		localStorage.setItem(
			'@GithubExplorer:repositories',
			JSON.stringify(repositories)
		)
	}, [repositories])

	async function handleAddRepository(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault()

		if (!repoQuery) {
			setInputError("Digite o 'autor/nome' do repositório.")
			return
		}

		try {
			const githubResponse = await api.get<IRepository>(`repos/${repoQuery}`)

			const repository = githubResponse.data

			setRepositories(previousRepositories => {
				const notIncludingSearchedRepo = previousRepositories.filter(
					repo => repo.id !== repository.id
				)

				return [...notIncludingSearchedRepo, repository]
			})
			setQuery('')
			setInputError('')
		} catch (err) {
			setInputError(
				"Repositório não encontrado. Digite no formato 'autor/nome'."
			)
		}
	}

	return (
		<>
			<header>
				<img src={svgLogo} alt="Github Explorer" />
			</header>
			<Title>Explore repositórios no Github.</Title>
			<Form hasError={!!inputError} onSubmit={handleAddRepository}>
				<input
					value={repoQuery}
					onChange={e => setQuery(e.target.value)}
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
