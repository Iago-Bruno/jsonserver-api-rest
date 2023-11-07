// Função que serve para guardar todas as requisições e valores para um CRUD
export const httpHelper = () => {
	const customFetch = async (url, options = {}) => {
		// Definindo um metodo padrão para previnir
		const defaultMethod = "GET"
		// Definindo o header padrão para previnir
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
		// Variavel que permite cancelar solicitações pelo DOM da aplicação
		// Permite cancelar qualquer requisição
		const controller = new AbortController()
		// Define o "AbortSignal" ou sinal/indicador da 'promise' para o construtor 'AbortController'
		options.signal = controller.signal

		// Verifica se há um metodo CRUD definido
		// Se caso não houver, define o metodo do 'defaultMethod'
		options.method = options.method || defaultMethod
		// Verifica se há um header definido
		// Se caso não houver, define o header do 'defaultHeaders'
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

			// Converte o 'body' da promise para 'json' ou define como 'false'
		options.body = JSON.stringify(options.body) || false
		// Verifica se o 'body' da promise não existe, se caso não existe deleta o mesmo
		if (!options.body) delete options.body

		// Contador para cancelar a promise se caso demore mais de 3 segundos ou 3000 milisegundos
		setTimeout(() => {
			controller.abort()
		}, 3000)

		// Inicia uma requisição com o 'fetch' passando a url e valores da mesma com o options
		// Se caso a requisição não der erro, retorna o valor da response
		// Se caso houver erro, retorna somente o erro 
		try {
			const response = await fetch(url, options)
			return await response.json()
		} catch (err) {
			return err
		}
	}

	// Função 'get' para buscar todos os usuários passando a url e options
	const get = (url, options = {}) => customFetch(url, options)

		// Função 'post' para criar e persistir todos os usuários passando a url e options
	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}

		// Função 'put' para atualizar um respectivo usuário identificado pelo id
	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}
		// Função 'del' para deletar um respectivo usuário identificado pelo id
	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}

	// Retorno para que possa ser lido todas as funções do CRUD
	return {
		get,
		post,
		put,
		del,
	}
}
