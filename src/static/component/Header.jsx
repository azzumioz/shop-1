import React from "react";
import Navigation from "./Navigation.jsx";
export default class Header extends React.Component {
    render() {
        return (
            <header className="container-fluid ">
                <div className=" row bg-primary">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                        <Navigation tabs={["Каталог", "Доставка", "Гарантии", "Контакты"]}
                                    clName="navbar justify-content-start font-weight-bold"/>
                    </div>
                </div>
            </header>
        )
    }
}
