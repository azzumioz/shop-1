import React from "react";
import Footer from "../component/Footer.jsx";
import Header from "../component/Header.jsx";

export default class ContactsPage extends React.Component {

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <Header/>
                <main className=" container-fluid">
                    <div className="row">
                        <div className="content p-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                            <div className="card-deck pt-3">
                                <div className="card">
                                    <img className="card-img-top"
                                         src="https://via.placeholder.com/400x200/FFFFFF"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Контакты</h5>
                                        <p className="card-text">Наши контакты...</p>
                                        <span
                                            className="btn btn-primary font-weight-bold">Связаться с нами</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    };

}
