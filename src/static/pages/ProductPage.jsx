import React from "react";

const queryString = require('query-string');
import Navigation from "../component/Navigation.jsx";
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import PanelInfoProduct from "../component/PanelInfoProduct.jsx";
import NavMenuBread from "../component/NavMenuBread.jsx";

const tabsMenu = [
    {name: "Описание", link: "#"},
    {name: "Характеристики", link: "#"},
    {name: "Отзывы", link: "#"}
];

const breadMenu = [
    {name: "Каталог", link: "#"},
    {name: "Вентиляция", link: "#"},
    {name: "ПВУ", link: "#"}
];

export default class ProductPage extends React.Component {

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

    renderProduct() {
        return (
            <React.Fragment>
                <NavMenuBread tabs={breadMenu}/>
                <h3>{this.state.product.title}</h3>
                <Navigation tabs={tabsMenu} clName="nav nav-tabs"/>
                <div className="row pt-4">
                    <div className="col-3">
                        <img src={`data: ${this.state.product.fileType} ;base64, ${this.state.product.file}`}
                             className="img-fluid"/>
                    </div>
                    <div className="col-9">
                        <p>{this.state.product.description}</p>
                        <p>{this.state.product.price} руб.</p>
                        <hr/>
                        <button type="button" className="btn btn-primary font-weight-bold">Заказать</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header/>
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
        const [key, ...slugArray] = this.props.match.params.product.split('-');
        const slug = slugArray ? slugArray.join('-') : '';
        const params = queryString.stringify({key, slug});
        const url = `/api/product?${params}`;
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({product: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    }
}
