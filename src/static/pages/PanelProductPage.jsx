import React from "react";

import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import PanelInfoProduct from "../component/PanelInfoProduct.jsx";

export default class PanelProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            status: 'idle'
        }
    }

    renderStatus() {
        return <PanelInfoProduct status={this.state.status}/>
    }

    renderForm() {
        return (
            <form>
                <h4 className="text-center">Редактирование товара</h4>
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
                    <label>Цена</label>
                    <input
                        name="price"
                        value={this.state.product.price}
                        onChange={this.onChange.bind(this)}
                        className="form-control"
                    />
                </div>
                <div className="form-group row">
                    <label>Имя файла с изображением товара</label>
                    <input
                        name="img"
                        value={this.state.product.img}
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
                <div className="btn-group">
                    <button type="button"
                            className="m-2 btn btn-success font-weight-bold"
                            onClick={this.onSave.bind(this)}
                    >
                        Сохранить
                    </button>
                    <button type="button"
                            className="m-2 btn btn-danger font-weight-bold"
                            onClick={this.onDelProduct.bind(this)}
                    >
                        Удалить
                    </button>
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
                            {this.state.status === 'ready' && this.renderForm()}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }

    onChange(event) {
        console.log('onChange');
        const name = event.target.name;
        this.state.product[name] = event.target.value;
        this.forceUpdate();
    }

    onSave() {
        event.preventDefault();
        fetch(`/api/product/${this.props.match.params.id}`, {
            method: "PUT",
            body: JSON.stringify(this.state.product),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status == '401' || response.status == '403') {
                    window.location = "/api/login";
                } else {
                    return response.json()
                }
            })
            .then(json => {
                this.setState({product: json, status: 'ready'});
                window.location = "/panel/product";
            })
            .catch(() => this.setState({status: 'error'}));
    }

    onDelProduct() {
        event.preventDefault();
        console.log('delete');
        fetch(`/api/product/${this.props.match.params.id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.status == '401' || response.status == '403') {
                    window.location = "/api/login";
                } else {
                    return response.json()
                }
            })
            .then(json => {
                this.setState({product: json, status: 'ready'});
                window.location = "/panel/product";
            })
            .catch(() => this.setState({status: 'error'}));
    }

    componentDidMount() {
        this.setState({status: 'pending'});
        const url = `/api/product/${this.props.match.params.id}`;
        fetch(url)
            .then(response => {
                if (response.status == '401' || response.status == '403') {
                    window.location = "/api/login";
                } else {
                    return response.json()
                }
            })
            .then(json => this.setState({product: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    }
}
