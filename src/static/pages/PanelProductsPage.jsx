import React from "react";
import Footer from "../component/Footer.jsx";
import Header from "../component/Header.jsx";
import ProductBox from "../component/ProductBox.jsx";
import PanelInfoProduct from "../component/PanelInfoProduct.jsx";
import PanelInfo from "../component/PanelInfo.jsx";

const slug = require('slug');
let encodedData = '';

export default class PanelProductsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            status: 'idle',
            newProduct: {},
            isNotImageFile: false
        }
    }

    renderProducts() {
        if (!this.state.products[0]) {
            return false;
        }
        return (
            this.state.products.map(function (product) {
                return (
                    <ProductBox product={product}
                                linkProduct={`/panel/product/${product._id}`}
                                textButton='Перейти к товару'
                    />
                );
            })
        )
    }

    renderForm() {
        return (
            <div className="card">
                <article className="card-body">
                    <form>
                        <h4 className="card-title text-center">Добавление нового товара</h4>
                        <div className="form-group">
                            <label>Наименование</label>
                            <input
                                name="title"
                                value={this.state.newProduct.title}
                                onChange={this.onChange.bind(this)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Описание</label>
                            <textarea
                                name="description"
                                value={this.state.newProduct.description}
                                rows="3"
                                onChange={this.onChange.bind(this)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Цена</label>
                            <input
                                name="price"
                                value={this.state.newProduct.price}
                                onChange={this.onChange.bind(this)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Имя файла с изображением товара</label>
                            {this.state.isNotImageFile &&
                            <PanelInfo typeAlert="alert-danger" textAlert="Выберите файл c изображением"/>}
                            <input
                                name="img"
                                type="file"
                                value={this.state.newProduct.img}
                                onChange={(e) => this.onImageChange(e)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Ключ</label>
                            <input
                                name="key"
                                type="number"
                                value={this.state.newProduct.key}
                                onChange={this.onChange.bind(this)}
                                className="form-control"
                                placeholder="Обязательно к заполнению"
                            />
                        </div>
                        <div className="form-group">
                            <button type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={this.onSave.bind(this)}
                                    disabled={
                                        (this.state.newProduct.key == null || this.state.newProduct.key == '') || (this.state.newProduct.title == null || this.state.newProduct.title == '')
                                    }
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        )
    }

    renderStatus() {
        return <PanelInfoProduct status={this.state.status}/>
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header classColor="row bg-dark"/>
                <main className=" container-fluid d-flex">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            <div className="pb-4">
                                {this.renderStatus()}
                            </div>
                            {this.renderForm()}
                            <div className="card-deck pt-3">
                                <div className="card-columns">
                                    {this.state.products && this.renderProducts()}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    };

    onChange(event) {
        const name = event.target.name;
        this.state.newProduct[name] = event.target.value;
        this.forceUpdate();
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
        };
        reader.onerror = function (event) {
            console.error(`Файл ${file.name} не может быть прочитан! ${event.target.error.code}`);
        };
        reader.readAsBinaryString(file);
    }

    onSave() {
        event.preventDefault();
        this.state.newProduct.slug = slug(this.state.newProduct.title);
        if (encodedData !== '') {
            this.state.newProduct["file"] = encodedData;
        }
        fetch(`/api/product`, {
            method: "POST",
            body: JSON.stringify(this.state.newProduct),
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
                this.setState({newProduct: json});
                this.state.products.push(this.state.newProduct);
                this.setState({
                    newProduct: {
                        title: '',
                        description: '',
                        price: '',
                        img: '',
                        key: '',
                        slug: '',
                        file: ''
                    }
                });
                this.forceUpdate();
            });
    }

    componentDidMount() {
        this.setState({status: 'pending'});
        fetch("/api/product")
            .then(response => response.json())
            .then(json => this.setState({products: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    };

}
