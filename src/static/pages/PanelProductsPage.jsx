import React from "react";
import Footer from "../component/Footer.jsx";
import Header from "../component/Header.jsx";
import PanelProductBox from "../component/PanelProductBox.jsx";

export default class PanelProductsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            status: 'idle'
        }
    }

    renderProducts() {
        if (!this.state.products[0]) {
            return false;
        }
        return (
            this.state.products.map(function (product) {
                return (
                    <PanelProductBox product={product}/>
                );
            })
        )
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

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header classColor="row bg-dark"/>
                <main className=" container-fluid d-flex">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            {this.renderStatus()}
                            <div className="card-deck pt-3">
                                {this.state.products && this.renderProducts()}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    };

    componentDidMount() {
        this.setState({status: 'pending'});
        fetch("/api/product")
            .then(response => response.json())
            .then(json => this.setState({products: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    };

}
