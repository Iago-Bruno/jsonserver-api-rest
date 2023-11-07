import React from "react"
import Form from "./Form"

const Table = ({ users, postUser, updateUser, deleteUser }) => {
	// Função para ativar um bloco de edição na tabela 
	// È executada após clicar no botão de 'update'
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`)
		form[0].classList.toggle("hide-form")
	}

	// Componente que recebe o usuário como parametro e retorna uma div com os dados do parametro
	const Row = ({ user }) => {
		return (
			<>
				<div className='row'>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					<div>{user.companies.name}</div>
					<div className='buttons'>
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	// Retorno de uma tabela listando todas os usuários com seus devidos dados
	return (
		<div className='table'>
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			<div className='rows'>
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}

export default Table
