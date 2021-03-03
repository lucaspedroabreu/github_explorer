import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api-client'

import { Title, Form, Repositories, Error } from './styles'

import svgLogo from '../../assets/github-explorer_logo.svg'

interface Repository {
	name: string
	full_name: string
	description: string
	owner: {
		login: string
		avatar_url: string
	}
}

const Dashboard: React.FC = () => {
	const [repoQuery, setQuery] = useState('')
	const [inputError, setInputError] = useState('')

	const [repositories, setRepositories] = useState<Repository[]>(() => {
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
			const githubResponse = await api.get<Repository>(`repos/${repoQuery}`)

			const repository = githubResponse.data

			setRepositories([...repositories, repository])
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
				{repositories.map(repository => (
					<Link
						key={repository.full_name}
						to={`/repository/${repository.owner.login}/${repository.name}`}
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
		</>
	)
}

export default Dashboard
