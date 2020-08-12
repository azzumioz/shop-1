import React from "react";
import Navigation from "../component/Navigation.jsx";

export default class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <header className="container-fluid ">
                    <div className=" row bg-primary">
                        <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                            <Navigation tabs={["Каталог", "Доставка", "Гарантии", "Контакты"]}
                                        clName="navbar justify-content-start font-weight-bold"/>
                        </div>
                    </div>
                </header>

                <main className=" container-fluid d-flex">
                    <div className="row">
                        <div className="content p-4 bg-white col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Каталог</a></li>
                                <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                                <li className="breadcrumb-item"><a href="#">ПВУ</a></li>
                            </ol>
                            <h3>{this.state.product.title}</h3>
                            <ul className="nav nav-tabs">
                                <Navigation tabs={["Описание", "Характеристики", "Отзывы"]} clName="nav nav-tabs"/>
                            </ul>
                            <div className="row pt-4">
                                <div className="col-3">
                                    <img src="https://www.codery.school/content/course/lesson3-task-img.png"
                                         className="img-fluid"/>
                                </div>
                                <div className="col-9">
                                    {this.state.product.description}
                                    <hr/>
                                    <button type="button" className="btn btn-primary font-weight-bold">Заказать
                                    </button>
                                </div>
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
    }

    componentDidMount() {
        const id = this.props.match.params.product;
        const url = `/api/product/${id}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({product: json});
            }.bind(this))
    }
}
