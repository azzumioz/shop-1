import React from "react";
import Navigation from "./Navigation.jsx";

const tabsMenu = [
    {name: "Каталог", link: "/"},
    {name: "Доставка", link: "#"},
    {name: "Гарантии", link: "#"},
    {name: "Контакты", link: "#"},
    {name: "Панель управления", link: "/panel/product"}
];

export default class Header extends React.Component {

    render() {
        return (
            <header className="container-fluid ">
                <div className={this.props.classColor}>
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                        <Navigation tabs={tabsMenu}
                                    clName="navbar justify-content-start font-weight-bold"/>
                    </div>
                </div>
            </header>
        )
    }
}

Header.defaultProps = {classColor: "row bg-primary"};
