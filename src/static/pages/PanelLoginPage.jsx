import React from "react";
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";

export default class PanelLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "idle",
            credentials: {
                login: "",
                password: ""
            }
        }
    }

    renderStatus() {
        switch (this.state.status) {
            case 'pending':
                return (
                    <div className="alert-warning" role="alert">
                        Проверка авторизации
                    </div>
                );
                break;
            case 'idle':
                return (
                    <div className="alert-primary" role="alert">
                        Ожидание регистрации
                    </div>
                );
                break;
            case 'logged':
                return (
                    <div className="alert-success" role="alert">
                        Регистрация выполнена успешна
                    </div>
                );
                break;
            default:
                return (
                    <div className="alert-danger" role="alert">
                        Ошибка авторизации
                    </div>
                );
        }
    }

    renderForm() {
        return (
            <div className="card">
                <article className="card-body">
                    <form>
                        <h4 className="card-title text-center">Авторизируйтесь</h4>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="login"
                                value={this.state.credentials.login}
                                onChange={this.onChange.bind(this)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                value={this.state.credentials.password}
                                onChange={this.onChange.bind(this)}
                                type="password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <button type="button"
                                    className="btn btn-primary font-weight-bold"
                                    onClick={this.onSave.bind(this)}
                                    disabled={
                                        (this.state.credentials.login == null || this.state.credentials.login == '') || (this.state.credentials.password == null || this.state.credentials.password == '')
                                    }
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        )
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header/>
                <main className=" container-fluid ">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            {this.renderStatus()}
                            {this.state.status !== "logged" && this.renderForm()}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }

    onChange(event) {
        const name = event.target.name;
        this.state.credentials[name] = event.target.value;
        this.forceUpdate();
    }

    onSave() {
        event.preventDefault();
        this.setState({status: 'pending'});
        fetch(`/api/login`, {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify(this.state.credentials),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json.status);
                if (json.status == 'logged') {
                    this.setState({status: 'logged'});

                }
                this.setState({status: json.status})
            })
            .catch(() => this.setState({status: 'error'}));
    }

    componentDidMount() {

    }
}
