import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'


const repository = {
    name: 'unform',
    description: 'Forms in React',
    link: 'https://github.com/unform/unform'
}

export function RepositoryList () {

    //como esse é um estado para uma [lista] de repositorios, ele começa como um array vazio []
    const [repositories, setRepositories] = useState([]);

    //o useEffect recebe dois parâmetros: {qual função} quero executar e [quando executar] ela (ex.: qd uma variável mudar)
    //aqui vamos usar o useEffect para que toda vez que a aplicação for renderizada ir lá na API do github 
    //buscar os dados de repositorio da rocketseat
    useEffect(() => {
        //o fetch busca a API e retorna o conteúdo dela. o .then pega esse retorno e transforma em .json
        //depois de terminada a conversão p .json, salvamos esses dados no estado repositories
        fetch('https://api.github.com/orgs/rocketseat/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
    }, [] )

    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                {/* o .map funciona pra arrays e nesse caso ele vai passar por cada um dos itens do array de 
                repositorios, que ta recebendo os dados da API do github, e pra cada item do array, ou seja, 
                pra cada repositorio ele retorna o componente RepositoryItem. Por sua vez, o RepositoryItem 
                recebe a variável repository que vai retornar o html_url, description e name, informações que
                o array do github oferece sobre cada repositorio. */}
                {repositories.map(repository => {
                    return <RepositoryItem key={repository.name} repository={repository}/>
                })}
                {/* toda vez que usamos o map dentro do html, temos que informar para o react através de uma 
                propriedade interna dele próprio chamada key qual é a informação única entre cada repositorio. No caso usamos 
                o nome de cada um.  */}
                
            </ul>
        </section>
    )
}