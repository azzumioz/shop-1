import React from "react";
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import PanelInfoLogin from "../component/PanelInfoLogin.jsx";

const Cookie = require('cookie');
const jwt = require('jsonwebtoken');

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
        return <PanelInfoLogin status={this.state.status}/>
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

    renderLogout() {
        return (
            <button type="button"
                    className="btn btn-primary font-weight-bold"
                    onClick={this.onLogout.bind(this)}
            >
                Выйти
            </button>
        )
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header/>
                <main className=" container-fluid ">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            <div className="pb-4">
                                {this.renderStatus()}
                            </div>
                            {this.state.status !== "logged" && this.renderForm()}
                            {this.state.status == "logged" && this.renderLogout()}
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
        fetch(`/panel/login`, {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify(this.state.credentials),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.status == 'logged') {
                    this.setState({status: 'logged'});
                }
                this.setState({status: json.status})
            })
            .catch(() => this.setState({status: 'error'}));
    }

    onLogout() {
        document.cookie = 'token=; Path=/; Max-Age=0;';
        this.state.status = "idle";
        this.forceUpdate();
        window.location = "/panel/login";
    }

    componentDidMount() {
        try {
            let cookies = Cookie.parse(document.cookie);
            let payload = jwt.decode(cookies.token);
            let timestampInMilliseconds = new Date().getTime();
            if (timestampInMilliseconds / 1000 < payload.exp) {
                this.state.status = "logged";
                this.forceUpdate();
            }
        } catch (e) {
            this.setState({status: 'idle'});
        }
    }

}
