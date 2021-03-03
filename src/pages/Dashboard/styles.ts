import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface FormProps {
	hasError: boolean
}

export const Title = styled.h1`
	font-size: 48px;
	color: #3a3a3a;

	margin-top: 102px;
	max-width: 433px;
	line-height: 56.25px;
`
export const Form = styled.form<FormProps>`
	margin-top: 40px;
	max-width: 714px;
	display: flex;

	input {
		flex: 1;
		height: 72px;
		border-radius: 5px 0 0 5px;
		border: none;
		padding: 0px 25px;
		color: #3a3a3a;
		/* border: 2px solid #fff;
		border-right: 0;

		${props =>
			props.hasError &&
			css`
				border-color: #c53030;
			`} */
		&::placeholder {
			color: #a8a8b3;
		}
	}

	button {
		height: 72px;
		width: 210px;
		border-radius: 0 5px 5px 0;
		border: none;
		background: #04d361;
		color: #fff;
		font-weight: bold;
		transition: 190ms;

		&:hover {
			background-color: ${shade(0.1, '#04d361')};
		}
	}
`
export const Error = styled.span`
	display: block;
	color: #c53030;
	margin: 8px 0 0 20px;
`

export const Repositories = styled.div`
	a {
		height: 112px;
		display: flex;
		align-content: center;
		align-items: center;
		text-decoration: none;
		background: #fff;
		width: 714px;
		margin-top: 120px;
		padding: 14.1px;
		transition: transform 0.2s;

		&:hover {
			transform: translateX(10px);
		}

		& + a {
			margin-top: 16px;
		}

		img {
			height: 83.81px;
			border-radius: 50%;
			margin-right: 22.1px;
		}

		div {
			margin-right: 16px;
			flex: 1;

			strong {
				font-size: 24px;
				line-height: 28.13px;
				color: #3a3a3a;
				font-weight: bold;
			}

			p {
				font-size: 18px;
				line-height: 21.09px;
				margin-top: 4px;
				color: #a8a8b3;
			}
		}

		svg {
			margin-left: auto;
			color: #c9c9d4;
		}
	}
`
