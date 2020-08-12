import React from "react";
import {Link} from "react-router-dom";

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
                    <div className="card" key={product.key}>
                        <Link to={`/product/${product._id}`}>
                            <img className="card-img-top" src={`/public/${product.img}`}/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                            <p>Цена: <b>{product.price} руб.</b></p>
                            <a href="#" className="btn btn-primary font-weight-bold">Заказать</a>
                        </div>
                    </div>
                );
            })
        )
    }

    renderStatus() {
        if (!this.state.products[0]) {
            return false;
        }
        return (
            <div className={this.state.status === 'error' ? 'alert-danger' : 'alert-primary'} role="alert">
                {this.state.status === 'error' ? 'Ошибка' : 'Успешно'}
            </div>
        )
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <header className="container-fluid ">
                    <div className=" row bg-primary">
                        <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                            <div id="navMenu" className="navbar justify-content-start font-weight-bold">
                                <a className="nav-item nav-link active pl-0" href="#">Каталог</a>
                                <a className="nav-item nav-link pl-0" href="#">Доставка</a>
                                <a className="nav-item nav-link pl-0" href="#">Гарантии</a>
                                <a className="nav-item nav-link pl-0" href="#">Контакты</a>
                            </div>
                        </div>
                    </div>
                </header>
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
                <footer className="container-fluid bg-dark text-white py-3 pl-0">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                            <h6 className="font-weight-bold">&#169; Codery.camp, 2019</h6>
                        </div>
                    </div>
                </footer>
            </div>
        );
    };

    componentDidMount() {
        this.setState({status: 'pending'});
        fetch("/api/product")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({products: json, status: 'ready'});
            }.bind(this))
            .catch(function (err) {
                this.setState({status: 'error'});
            }.bind(this));
    }

}
