import React from "react";
import ReactDOM from "react-dom";

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            activeIndex: 0
        };
    }

    onClick(e) {
        this.setState({activeIndex: parseInt(e.currentTarget.getAttribute("data-index"))});
    }

    render() {
        const {onClick} = this;
        const {activeIndex} = this.state;
        return (
            <div className={this.props.clName}>
                {this.props.tabs.map(function (item, index) {
                    var isActive = index === activeIndex
                    return (
                        <a key={item} className={isActive ? "active nav-link nav-item" : "nav-link nav-item"}
                           onClick={onClick} data-index={index} href="#">{item}</a>
                    )
                })}
            </div>
        )
    }
}

const All = () => {
    return (
        <body className="d-flex flex-column h-100">

        <header className="container-fluid ">
            <div className=" row bg-primary">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <Nav tabs={["Каталог", "Доставка", "Гарантии", "Контакты"]}
                         clName="navbar justify-content-start font-weight-bold"/>
                </div>
            </div>
        </header>

        <main className=" container-fluid d-flex">
            <div className="row">
                <div className="content p-4 bg-white col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Каталог</a></li>
                        <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                        <li className="breadcrumb-item"><a href="#">ПВУ</a></li>
                    </ol>
                    <h3>ПВУ Turkov ZENIT 350 HECO</h3>
                    <ul className="nav nav-tabs">
                        <Nav tabs={["Описание", "Характеристики", "Отзывы"]} clName="nav nav-tabs"/>
                    </ul>
                    <div className="row pt-4">
                        <div className="col-3">
                            <img src="https://www.codery.school/content/course/lesson3-task-img.png"
                                 className="img-fluid"/>
                        </div>
                        <div className="col-9">
                            Вентиляционная установка с рекуперацией тепла и влаги в легком и универсальном корпусе из
                            вспененного полипропилена предназначена для поддержания климата в жилых помещениях или
                            небольших офисах, магазинах.
                            <hr/>
                            <button type="button" className="btn btn-primary font-weight-bold">Заказать</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer className="container-fluid bg-dark text-white py-3 pl-0">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <h7 className="font-weight-bold">&#169; Codery.camp, 2019</h7>
                </div>
            </div>
        </footer>

        </body>
    )
}

ReactDOM.render(<All/>, document.querySelector("#root"))
