import React from 'react'
import Main from '../../template/Main'
import './Home.css'

export default props =>
    <Main title="Início" subtitle="Projeto CRUD com framework React.">
        <div className="display-4">Bem vindo!</div>
        <hr />
        <p className="mb-0">Sistema para exemplificar a construção de um cadastro de usuários desenvolvido em React!</p>
    </Main>