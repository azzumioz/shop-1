import React from "react";

import Navigation from "../component/Navigation.jsx";
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";

const tabsMenu = [
    {name: "Описание", link: "#"},
    {name: "Характеристики", link: "#"},
    {name: "Отзывы", link: "#"}
];

export default class PanelProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            status: 'idle'
        }
    }

    renderStatus() {
        if (this.state.status == 'pending') {
            return (
                <div className="alert-danger" role="alert">
                    Ожидание
                </div>
            )
        } else
            return (
                <div className={this.state.status == 'error' ? 'alert-danger' : 'alert-primary'} role="alert">
                    {this.state.status == 'error' ? 'Ошибка' : 'Успешно'}
                </div>
            )
    }

    renderForm() {
        return (
                <form>
                    <div className="form-group row">
                        <label>Наименование</label>
                        <input
                            name="title"
                            value={this.state.product.title}
                            onChange={this.onChange.bind(this)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group row">
                        <label>Описание</label>
                        <textarea
                            name="description"
                            value={this.state.product.description}
                            rows="3"
                            onChange={this.onChange.bind(this)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group row">
                        <label>Ключ</label>
                        <input
                            name="key"
                            value={this.state.product.key}
                            onChange={this.onChange.bind(this)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group row">
                        <label>Слаг</label>
                        <input
                            name="slug"
                            value={this.state.product.slug}
                            onChange={this.onChange.bind(this)}
                            className="form-control"
                        />
                    </div>
                </form>
        )
    }

    renderProduct() {
        return (
            <React.Fragment>
                <h3>{this.state.product.title}</h3>
                <div className="row pt-4">
                    <div className="col-3">
                        <img src={`/${this.state.product.img}`}
                             className="img-fluid"/>
                    </div>
                    <div className="col-9">
                        {this.state.product.description}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header classColor="row bg-dark"/>
                {this.renderStatus()}
                <main className=" container-fluid d-flex">
                    <div className="row">
                        <div className="content p-4 bg-white col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            {this.state.status === 'ready' && this.renderProduct()}
                            <hr/>
                            {this.state.status === 'ready' && this.renderForm()}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }

    onChange(event) {
        const name = event.target.name;
        this.state.product[name] = event.target.value;
        this.forceUpdate();
    }

    componentDidMount() {
        this.setState({status: 'pending'});
        const url = `/api/product/${this.props.match.params.id}`;
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({product: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    }
}
