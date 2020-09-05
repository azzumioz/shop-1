import React from "react";
import Footer from "../component/Footer.jsx";
import Header from "../component/Header.jsx";
import ProductBox from "../component/ProductBox.jsx";
import PanelInfoProduct from "../component/PanelInfoProduct.jsx";

export default class IndexPage extends React.Component {

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
                    <ProductBox product={product}/>
                );
            })
        )
    }

    renderStatus() {
        return <PanelInfoProduct status={this.state.status}/>
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header/>
                <main className=" container-fluid">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            {this.renderStatus()}
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

    componentDidMount() {
        this.setState({status: 'pending'});
        fetch("/api/product")
            .then(response => response.json())
            .then(json => this.setState({products: json, status: 'ready'}))
            .catch(() => this.setState({status: 'error'}));
    }

}
