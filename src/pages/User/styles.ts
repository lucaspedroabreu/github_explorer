import styled from 'styled-components'

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #a8a8b3;
		transition: color 0.2s;

		&:hover {
			color: #666;
		}

		svg {
			margin-right: 4px;
		}
	}
`

export const UserInfo = styled.section`
	margin-top: 80px;

	header {
		display: flex;
		align-items: center;

		img {
			height: 120px;
			width: 120px;
			margin-top: 20px;
			border-radius: 50%;
		}

		div {
			margin: 30px 21px;

			strong {
				font-size: 36px;
				color: #3d3d4d;
				font-weight: bold;
			}

			p {
				font-size: 20px;
				color: #737380;
				margin-top: 4px;
				font-weight: normal;
			}
		}
	}

	ul {
		display: flex;
		list-style: none;
		margin-top: 40px;

		li {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;

			& + li {
				margin-left: 80px;
			}

			strong {
				display: flex;
				align-items: center;
				font-size: 36px;

				span {
					color: #3d3d4d;
					font-weight: bold;
				}

				svg {
					color: #3d3d4d;
					margin-right: 4px;
				}
			}

			span {
				display: block;
				margin-top: 4px;
				color: #6c6c80;
				font-weight: bold;
			}
		}
	}
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
