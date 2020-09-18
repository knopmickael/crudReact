import React, { Component } from 'react'
import Main from '../../template/Main'
import axios from 'axios'
import './UserCrud.css'

const headerProps = {
    title: 'Usuários',
    subtitle: 'Seção de cadastro de usuários'
}

const baseUrl = 'http://localhost:3001/users'

const initialState = {
    user: {name: 'asd', email: ''},
    list: []
}

export default class UserCrud extends Component {

    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'                            // se usuário a ser salvo tiver ID (method=put) else =post
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)                                           // aplica a função de acesso ao webserver
            .then(resp => {
                const list = this.getUpdatedList(resp.data)                
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add=true) {
        const list = this.state.list.filter(x => x.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group" >
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name}
                                onChange={e => this.updateField(e)} placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email}
                                onChange={e => this.updateField(e)} placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success mr-2" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary" onClick={e => this.clear(e)}>
                            Limpar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({user})
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key="user.id">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="edit btn btn-primary mr-2"
                        onClick={() => this.load(user)}>
                            Editar
                        </button>
                        <button className="remove btn btn-danger"
                        onClick={() => this.remove(user)}>
                            Remover
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}