import React, { useState, useEffect } from 'react';
import { httpHelper } from '../helpers/httpHelper';

const DropCompanies = ({ companiesId, handleValue }) => {
  const [companies, setCompanies] = useState(null);
  const [company, setCompany] = useState(companiesId);

  // Url padrão para manipulação de dados das empresas
  const url = 'http://localhost:5000/companies';
  // Variável que guarda todos as funções/metodos do CRUD
  const api = httpHelper();

  // Usado para buscar todas as empresas registradas
  // Busca todas as empresas com a função 'get' passando a url
  // Após isso, o 'then' captura os dados e salva no estado 'companies'
  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        setCompanies([{ id: 0, name: 'Select Company' }, ...res]);
      })
      .catch((err) => console.log(err));
  }, []);

  // Retorna 'null' se caso não houver valores registrados no estado 'companies'
  if (!companies) return null;

  // Componente que carrega um select com todas as empresas registradas
  // Também salvar o valor selecionado do select no estado 'company'
  // Executa uma função passada por parametro chamado 'handleValue'
  return (
    <select
      name="companiesId"
      value={company}
      onChange={(e) => {
        setCompany(e.target.value);
        handleValue(e);
      }}
    >
      {companies.map((c) => (
        <option value={c.id} key={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default DropCompanies;
