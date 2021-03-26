import { IUser } from '../types'

const parseUser = (user: IUser): IUser => {
	return {
		...user,
		created_at: new Date(user.created_at).toLocaleDateString('pt-BR'),
	}
}

export default parseUser
