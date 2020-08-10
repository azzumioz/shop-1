import React from "react";
import { Link } from "react-router-dom";

export default class IndexPage extends React.Component {
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

                            <div className="card-deck pt-3">
                                <div className="card">
                                    <Link to="/products/product">
                                        <img className="card-img-top" src="/public/tovar1.jpg"/>
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">ПВУ Turkov ZENIT 350 HECO</h5>
                                        <p className="card-text">Вентиляционная установка с рекуперацией тепла и
                                            влаги</p>
                                        <p>Цена: <b>150000 руб.</b></p>
                                        <a href="#" className="btn btn-primary font-weight-bold">Заказать</a>
                                    </div>
                                </div>
                                <div className="card">
                                    <Link to="/products/product">
                                        <img className="card-img-top" src="/public/tovar2.jpg"/>
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">ПВУ Turkov ZENIT 450 HECO</h5>
                                        <p className="card-text">Вентиляционная установка с рекуперацией тепла и
                                            влаги</p>
                                        <p>Цена: <b>160000 руб.</b></p>
                                        <a href="#" className="btn btn-primary font-weight-bold">Заказать</a>
                                    </div>
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
}
