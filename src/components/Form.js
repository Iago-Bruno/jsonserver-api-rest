import React, { useState } from 'react';
import DropComapies from './DropCompanies';

const Form = ({ userData = {}, postUser, updateUser }) => {
  const [user, setUser] = useState({
    name: userData.name ?? '',
    username: userData.username ?? '',
    email: userData.email ?? '',
    phone: userData.phone ?? '',
    companiesId: userData.companiesId ?? '0',
  });

  // Função que é executada todo momento em que um input ou select é preenchido
  // atualizando sempre o valor do estado 'user'
  const handleValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Função para executar o envio e persistencia de uma novo usuário criado
  // É executada após botão ser clicado
  const submitUser = (e) => {
    e.preventDefault();

    if (user.companiesId === '0') return;

    if (userData.id) {
      updateUser(userData.id, user);
    } else {
      postUser(user);
    }
  };

  // Retorno que carrega um formulário para criação de um novo usuário com um select para um empresa
  return (
    <form onSubmit={submitUser} className="row">
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Name"
        onChange={(e) => handleValue(e)}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => handleValue(e)}
      />
      <input
        type="tel"
        name="phone"
        value={user.phone}
        placeholder="Phone (10)"
        pattern="[0-9]{10}"
        onChange={(e) => handleValue(e)}
      />
      <DropComapies companiesId={user.companiesId} handleValue={handleValue} />
      <input
        className="btn-submit"
        type="submit"
        value={`${!userData.id ? 'Add new user' : 'Save user'}`}
      />
    </form>
  );
};

export default Form;
