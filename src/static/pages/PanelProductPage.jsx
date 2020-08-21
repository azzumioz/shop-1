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

    renderProduct() {
        return (
            <React.Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Каталог</a></li>
                    <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                    <li className="breadcrumb-item"><a href="#">ПВУ</a></li>
                </ol>
                <h3>{this.state.product.title}</h3>
                <ul className="nav nav-tabs">
                    <Navigation tabs={tabsMenu} clName="nav nav-tabs"/>
                </ul>
                <div className="row pt-4">
                    <div className="col-3">
                        <img src={`/${this.state.product.img}`}
                             className="img-fluid"/>
                    </div>
                    <div className="col-9">
                        {this.state.product.description}
                        <hr/>
                        <button type="button" className="btn btn-primary font-weight-bold">Редактировать
                        </button>
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
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
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
