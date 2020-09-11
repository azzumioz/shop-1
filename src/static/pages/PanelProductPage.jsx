import React from "react";

import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import PanelInfoProduct from "../component/PanelInfoProduct.jsx";
import PanelInfo from "../component/PanelInfo.jsx";

const slug = require('slug');
let encodedData = '';
let fileType = '';

export default class PanelProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            status: 'idle',
            isNotImageFile: false
        }
    }

    renderStatus() {
        return <PanelInfoProduct status={this.state.status}/>
    }

    renderForm() {
        return (
            <div className="card mt-4">
                <article className="card-body">
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
                            {this.state.isNotImageFile &&
                            <PanelInfo typeAlert="alert-danger" textAlert="Выберите файл c изображением"/>}
                            <input
                                name="img"
                                type="file"
                                value={this.state.product.img}
                                onChange={(e) => this.onImageChange(e)}
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
                </article>
            </div>
        )
    }

    onImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        if (!file.type.includes('image/')) {
            this.state.isNotImageFile = true;
            this.forceUpdate();
            return;
        }
        this.state.isNotImageFile = false;
        this.forceUpdate();

        let reader = new FileReader();
        reader.onload = function (event) {
            encodedData = window.btoa(event.target.result);
            fileType = file.type;
        };
        reader.onerror = function (event) {
            console.error(`Файл ${file.name} не может быть прочитан! ${event.target.error.code}`);
        };
        reader.readAsBinaryString(file);


        let fileReader = new FileReader();
        fileReader.onload = function (progressEvent) {
            let imgProduct = document.getElementById("imgProduct");
            imgProduct.src = fileReader.result;
        };
        fileReader.readAsDataURL(file);

    }

    renderProduct() {
        return (
            <div className="card">
                <article className="card-body">
                    <h3>{this.state.product.title}</h3>
                    <div className="row pt-4">
                        <div className="col-3">
                            <img src={`data: ${this.state.product.fileType} ;base64, ${this.state.product.file}`}
                                 className="img-fluid" id="imgProduct"/>
                        </div>
                        <div className="col-9">
                            {this.state.product.description}
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header classColor="row bg-dark"/>
                <main className=" container-fluid">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            <div className="pb-4">
                                {this.renderStatus()}
                            </div>
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
        const name = event.target.name;
        this.state.product[name] = event.target.value;
        this.forceUpdate();
    }

    onSave() {
        event.preventDefault();
        this.state.product.slug = slug(this.state.product.title);
        if (encodedData !== '') {
            this.state.product["file"] = encodedData;
            this.state.product["fileType"] = fileType;
        }
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
                    return response.json();
                }
            })
            .then(json => this.setState({product: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    }
}
