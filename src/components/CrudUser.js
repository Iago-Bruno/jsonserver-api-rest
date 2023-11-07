import React, { useState, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

import { httpHelper } from '../helpers/httpHelper';

// Esse componente faz a funcionalidade de carregar, criar, deletar e modificar um usuário
const CrudUser = () => {
  const [users, setUsers] = useState(null);

  // Url padrão para manipulação de dados dos usuários
  const url = 'http://localhost:5000/users';
  // Variável que guarda todos as funções/metodos do CRUD
  const api = httpHelper();

  // Inicialmente buscar todos os usuários
  useEffect(() => {
    getUsers();
  }, []);

  // Função para criar um novo usuário onde ocorre o fluxo:
  // Criar um novo usuário com o função 'post' passando uma url e um valor
  // Após o passo acima o 'then' vai buscar todos os suários
  // Como ultimo passo mostra um erro, se caso houver um erro, com o 'catch'
  const postUser = (user) => {
    api
      .post(`${url}`, { body: user })
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  // Função para modificar os dados um usuário no fluxo:
  // Atualiza o usuário com a função 'put' passando a url e o id do usuário
  // Após isso o 'then' vai buscar todos os usuários
  // Como ultimo passo mostrar um erro, se caso houver um erro, com o 'catch'
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user })
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  // Função para deletar um usuário
  // Atualiza o usuário com a função 'del' passando a url e o id do usuário
  // Após isso o 'then' vai buscar todos os usuários
  // Como ultimo passo mostrar um erro, se caso houver um erro, com o 'catch'
  const deleteUser = (id) => {
    api
      .del(`${url}/${id}`, {})
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  // Função para buscar e salvar todos os usuários em um estado do useState
  // Busca todos os usuário com a função 'get' passando a url
  // Após isso o 'then' vai capturar o objeto da response e vai salvar no estado 'users' através do 'setUsers'
  // Como ultimo passo mostrar um erro, se caso houver um erro, com o 'catch'
  const getUsers = () => {
    api
      .get(`${url}?_expand=companies`)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));
  };

  // Verifica se há dados salvar no estado 'users' para que não haja
  // erro de variávis nulas após mostrar o html
  if (!users) return null;

  // Mostra uma tela com o componente 'Form' e uma div contendo o componente 'Table'
  return (
    <>
      <h3>New user</h3>
      <Form postUser={postUser} />
      <div className="all-users">
        <h3>All users</h3>
        <Table
          users={users}
          setUsers={setUsers}
          postUser={postUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export default CrudUser;
